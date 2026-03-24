import { test, Page } from '@playwright/test';

test.describe('Dummy test suite', () => {

    test.skip('Dummy test case', async ({ page }) => {
        await page.goto('https://google.com');
        await page.waitForTimeout(5_000); // Just to see the page before it closes, not recommended for real tests
    });

    const WAIT_TIME = 3_000; // 3 seconds, just to see the page before it closes, not recommended for real tests
    let page: Page;

    test.beforeEach(async ({ browser }) => {
        console.log('This runs before each test in this describe block');
        const context = await browser.newContext();
        page = await context.newPage();
         
        // Scren resolution FHD
        await page.setViewportSize({ width: 1920, height: 1080 });
    });

    test.afterEach(async () => {
        await page.waitForTimeout(WAIT_TIME);
        await page.close();
        await page.context().close();
    });

    test('1 handle alert - SINGLE BUTTON', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME); // Just to see the dialog before it closes, not recommended for real tests
            await dialog.accept();
        });

        await page.click('#js-alert');
    });

    test('2 handle alert - 2 BUTTONS: Click OK', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME); // Just to see the dialog before it closes, not recommended for real tests
            await dialog.accept();
        });

        await page.click('#js-confirm');
    });

    test('3 handle alert - 2 BUTTONS: Click CANCEL', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME); // Just to see the dialog before it closes, not recommended for real tests
            await dialog.dismiss();
        });

        await page.click('#js-confirm');
    });

    test('4 handle alert - 2 BUTTONS with INPUT: Click OK', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME);
            await dialog.accept('Playwright is awesome!');
        });

        await page.click('#js-prompt');
    });

    test('5 handle alert - 2 BUTTONS with INPUT: Click CANCEL', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME);
            await dialog.dismiss();
        });

        await page.click('#js-prompt');
    });
});

