import { test, expect, Page } from '@playwright/test';
import { SwagProductsPage } from '../../pom/web/pages/pagesByFeature/swagProductsPage';
import path from 'path';
import os from 'os';

test.describe('Dummy test suite', () => {

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

    // .......................... TESTIN INJECTION .........................

    test.skip('Dummy test case', async ({ page }) => {
        await page.goto('https://google.com');
        await page.waitForTimeout(5_000); // Just to see the page before it closes, not recommended for real tests
    });

    const WAIT_TIME = 3_000; // 3 seconds, just to see the page before it closes, not recommended for real tests
    let page: Page;

    // ......................... TESTIN ALERTS .........................

    test.skip('1 handle alert - SINGLE BUTTON', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME); // Just to see the dialog before it closes, not recommended for real tests
            await dialog.accept();
        });

        await page.click('#js-alert');
    });

    test.skip('2 handle alert - 2 BUTTONS: Click OK', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME); // Just to see the dialog before it closes, not recommended for real tests
            console.log(dialog.type());
            await dialog.accept();
        });

        await page.click('#js-confirm');
    });

    test.skip('3 handle alert - 2 BUTTONS: Click CANCEL', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME); // Just to see the dialog before it closes, not recommended for real tests
            await dialog.dismiss();
        });

        await page.click('#js-confirm');
    });

    test.skip('4 handle alert - 2 BUTTONS with INPUT: Click OK', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME);
            await dialog.accept('Playwright is awesome!');
        });

        await page.click('#js-prompt');
    });

    test.skip('5 handle alert - 2 BUTTONS with INPUT: Click CANCEL', async () => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            await page.waitForTimeout(WAIT_TIME);
            await dialog.dismiss();
        });

        await page.click('#js-prompt');
    });

    // ......................... TESTIN IFRAMES .........................

    test.skip('TESTING IFRAMES - fail', async ({ page }) => {
        await page.goto('https://elementdir.com/iframes?utm_source=chatgpt.com');

        await page.click("a[href*='wiki/HTML']");
    });

    test.skip('TESTING IFRAMES - pass', async ({ page }) => {
        await page.goto('https://elementdir.com/iframes?utm_source=chatgpt.com');

        await page.frameLocator("iframe[title='Wikipedia Demo']").locator("a[href*='wiki/HTML']").click();
    });

    // ......................... TESTIN FILE UPLOAD & DOWNLOAD .........................

    test.skip('upload jpg from Downloads folder', async ({ page }) => {

        // Build path to Downloads folder (cross-platform)
        const downloadsPath = path.join(os.homedir(), 'Downloads', 'testUPLOAD.png');

        await page.goto('https://the-internet.herokuapp.com/upload');
        await page.waitForTimeout(WAIT_TIME); // Just to see the page before it interacts, not recommended for real tests

        // Upload file
        await page.setInputFiles('input[type="file"]', downloadsPath);

        // Submit
        await page.click('#file-submit');

        // Assertion
        await expect(page.locator('#uploaded-files')).toHaveText('testUPLOAD.png');
    });

    test.skip('download a file single', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/download');

        await page.locator("a[href$='Resume.docx']").first().click() // clicks first file
        await page.waitForTimeout(WAIT_TIME); // Just to see the page before it closes, not recommended for real tests

    })

    test('download a with pro click from POM', async ({ page }) => {

        const myPage: SwagProductsPage = new SwagProductsPage(page);

        await page.goto('https://the-internet.herokuapp.com/download');

        //await page.locator("a[href$='Resume.docx']").first().click() // Native click
        await myPage.clickAndWaitSuccessfulApi("a[href$='Resume.docx']", "Resume [Link]", "herokuapp.com/download/", 304); // Our custom click coming from BasePage.ts (POM)

        await page.waitForTimeout(WAIT_TIME); // Just to see the page before it closes, not recommended for real tests
    })

    test.skip('download a file with promise', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/download');
        await page.waitForTimeout(WAIT_TIME); // Just to see the page before it interacts, not recommended for real tests

        // Wait for download + trigger click
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator("a[href$='Resume.docx']").first().click() // clicks first file
        ]);

        // Get suggested filename
        const fileName = download.suggestedFilename();

        // Save to a local path
        const filePath = path.join('downloads', fileName);
        await download.saveAs(filePath);

        console.log(`Downloaded file saved at: ${filePath}`);

        // Basic assertion
        expect(fileName).toBeTruthy();
    });
});

