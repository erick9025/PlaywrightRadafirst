import { test, expect, chromium, firefox } from '@playwright/test';
import path from 'node:path';

const profileRoot = path.join(process.cwd(), 'test-results', 'loaded-profiles');

test('Dummy test case CHROME', async () => {
    const contextChrome = await chromium.launchPersistentContext(
        path.join(profileRoot, 'chrome'),
        {
            channel: 'chrome',
            headless: false,
        }
    );

    try {
        const page = await contextChrome.newPage();
        await page.goto('https://facebook.com');
        await page.waitForTimeout(5_000);
    } finally {
        await contextChrome.close();
    }
});

test.skip('Dummy test case FIREFOX', async () => {
    const contextFirefox = await firefox.launchPersistentContext(
        path.join(profileRoot, 'firefox'),
        {
            headless: false,
            channel: undefined,
            executablePath: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
        }
    );

    try {
        const page = await contextFirefox.newPage();
        await page.goto('data:text/html,<title>Firefox profile smoke test</title>');
        await expect(page).toHaveTitle('Firefox profile smoke test');
    } finally {
        await contextFirefox.close();
    }
});
