import { test, chromium, firefox } from '@playwright/test';

/*test.skip('Dummy test case CHROME', async () => {
    const contextChrome = await chromium.launchPersistentContext(
        'C:\\Users\\erick.jimenez\\AppData\\Local\\Google\\Chrome\\User Data',
        {
            channel: 'chrome',
            headless: false,
        }
    );

    const page = await contextChrome.newPage();

    await page.goto('https://facebook.com');
    await page.waitForTimeout(5_000);
    await contextChrome.close();
});*/

test('Dummy test case FIREFOX', async () => {
    const contextFirefox = await firefox.launchPersistentContext(
        'C:\\Users\\erick.jimenez\\AppData\\Roaming\\Mozilla\\Firefox\\Profiles\\3hz1td2k.default-release',
        {
            headless: false,
        }
    );

    const page = await contextFirefox.newPage();

    await page.goto('https://facebook.com');
    await page.waitForTimeout(5_000);
    await contextFirefox.close();
});