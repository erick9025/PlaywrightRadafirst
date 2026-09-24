import { test, expect, chromium, firefox } from '@playwright/test';
import { join } from 'node:path';

const profileRoot = join(process.cwd(), 'test-results', 'loaded-profiles');

test('Dummy test case CHROME', async () => {
    const contextChrome = await chromium.launchPersistentContext(
        join(profileRoot, 'chrome'),
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

test('Dummy test case FIREFOX', async () => {
    const contextFirefox = await firefox.launchPersistentContext(
        join(profileRoot, 'firefox'),
        {
            headless: false,
            channel: undefined,
            executablePath: 'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
        }
    );

    try {
        const page = await contextFirefox.newPage();
        await page.goto('https://facebook.com');
    } finally {
        await contextFirefox.close();
    }
});
