import { test, Browser, BrowserContext, Page, chromium } from '@playwright/test';

test.describe('Persistent Chrome profile test', () => {

    test('persistent profile test', async ({}, testInfo) => {
        if (testInfo.project.name !== 'persistent-chrome') {
            test.skip();
        }

        try {
            const context = await chromium.launchPersistentContext(
                'C:/Users/erick.jimenez/AppData/Local/Google/Chrome/User Data',
                {
                channel: 'chrome',
                args: ['--profile-directory=Default'],
                headless: false,
                }
            );

            const page = await context.newPage();
            await page.goto('https://facebook.com');
            await page.waitForTimeout(5000); // Wait for 5 seconds to see the page
        }
        catch (error) {
            console.error('Error launching persistent Chrome context:', error);
        }        
    });
});