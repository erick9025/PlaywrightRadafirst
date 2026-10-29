import { expect, test } from '@playwright/test';

const appUrl = 'https://interception.test/app';
const apiUrl = 'https://interception.test/api/profile';

// 
const appHtml = `<!doctype html>
<html lang="en">
  <body>
    <output id="result">Loading</output>
    <script>
      fetch('/api/profile')
        .then(async (response) => {
          if (!response.ok) {
            document.querySelector('#result').textContent = 'Request failed: ' + response.status;
            return;
          }

          const profile = await response.json();
          document.querySelector('#result').textContent = profile.name + ' (' + profile.role + ')';
        })
        .catch(() => {
          document.querySelector('#result').textContent = 'Request failed: network error';
        });
    </script>
  </body>
</html>`;

test.describe('API response interception', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(appUrl, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: appHtml
      })
    );
  });

  test('uses an intercepted success response with a modified payload', async ({ page }) => {
    let interceptedRequests = 0;
    await page.route(apiUrl, async (route) => {
      interceptedRequests += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ name: 'Mocked user', role: 'quality engineer' })
      });
    });

    await page.goto(appUrl);

    await expect(page.locator('#result')).toHaveText('Mocked user (quality engineer)');
    expect(interceptedRequests).toBe(1);
  });

  for (const status of [400, 404, 500, 503]) {
    test(`shows a useful error when the intercepted API returns ${status}`, async ({ page }) => {
      let interceptedRequests = 0;
      await page.route(apiUrl, async (route) => {
        interceptedRequests += 1;
        await route.fulfill({
          status,
          contentType: 'application/json',
          body: JSON.stringify({ error: `Simulated ${status} response` })
        });
      });

      await page.goto(appUrl);

      await expect(page.locator('#result')).toHaveText(`Request failed: ${status}`);
      expect(interceptedRequests).toBe(1);
    });
  }

  test('handles an invalid success payload without exposing stale data', async ({ page }) => {
    await page.route(apiUrl, (route) =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{invalid json'
      })
    );

    await page.goto(appUrl);

    await expect(page.locator('#result')).toHaveText('Request failed: network error');
  });
});
