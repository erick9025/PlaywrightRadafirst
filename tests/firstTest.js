
(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });

  // 👉 Create a BrowserContext (isolated session)
  const context = await browser.newContext();

  // 👉 Create a Page inside the context
  const page = await context.newPage();

  // Navigate to Google
  await page.waitForTimeout(3_000); // 5 seconds to allow me move windows from not shown screen to shared screen
  await page.goto('https://www.google.com');

  // Accept cookies if the dialog appears (EU / some regions)
  const acceptButton = page.locator('button:has-text("Accept all")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Perform search
  await page.locator('textarea[name="q"]').fill('Playwright BrowserContext');
  await page.keyboard.press('Enter');

  // Wait for results
  await page.waitForSelector('#search');

  console.log('Search completed');

  // Close everything
  await context.close();
  await browser.close();
})();