import { test, firefox } from '@playwright/test';

test.describe('Testing injection', () => {

    test('EASY: Injecting PAGE', async ({ page }) => {
        await page.goto("https://facebook.com");
        await page.locator("a[href*='entry_point=login'][role='link']").click();
    });

    test('INTERMEDIATE: Injecting CONTEXT', async ({ context }) => {        
        const page = await context.newPage();
        
        await page.goto("https://facebook.com");
        await page.locator("a[href*='entry_point=login'][role='link']").click();
    });

    test('HARD: Injecting BROWSER', async ({ browser }) => {
        const context = await browser.newContext({
            viewport: { width: 3840, height: 2160 }
        });
        const page = await context.newPage();
        
        await page.goto("https://facebook.com");
        await page.locator("a[href*='entry_point=login'][role='link']").click();
    });

    test('PRO: Injecting NOTHING', async () => {
        const browser = await firefox.launch();
        const context = await browser.newContext({
            viewport: { width: 7680, height: 4320 }
        });
        const page = await context.newPage();
        
        await page.goto("https://facebook.com");
        await page.locator("a[href*='entry_point=login'][role='link']").click();
    });

});
