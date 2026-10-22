import { test, expect, Page } from '@playwright/test';
import { SwagProductsPage } from '../../pom/web/pages/pagesByFeature/swagProductsPage';
import * as path from 'node:path';
import os from 'os';
import testData from '../testData/herokuCombinations.json';

test.describe('Dummy test suite', () => {

    const WAIT_TIME = 3_000; // 3 seconds, just to see the page before it closes, not recommended for real tests

    // ......................... TESTING ALERTS .........................

    test('LEFT-A 1 handle alert - SINGLE BUTTON', async ({ page }) => {

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
             // Just to see the dialog before it closes, not recommended for real tests
            await dialog.accept();
        });

        await page.goto('https://practice.expandtesting.com/js-dialogs');
        await page.click('#js-alert'); // Trigger the alert
    });

    test('text is ingored but you can pass an accept message', async ({ page }) => {

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
             // Just to see the dialog before it closes, not recommended for real tests
            await dialog.accept("This is a message that will make the test fail because the alert does not have an input field to accept a message.");
        });

        await page.goto('https://practice.expandtesting.com/js-dialogs');
        await page.click('#js-alert'); // Trigger the alert
    });

    test('CENTER-A 2 handle alert - 2 BUTTONS: Click OK', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
             // Just to see the dialog before it closes, not recommended for real tests
            console.log(dialog.type());
            await dialog.accept();
        });

        await page.click('#js-confirm');
    });

    test('CENTER-B 3 handle alert - 2 BUTTONS: Click CANCEL', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
             // Just to see the dialog before it closes, not recommended for real tests
            console.log(dialog.type());
            await dialog.dismiss();
        });

        await page.click('#js-confirm');
    });

    test('RIGHT-A 4 handle alert - 2 BUTTONS with INPUT: Click OK with message and then expect page displays message', async ({ page } ) => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        const inputText = 'October 22 Playwright is awesome!';

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            
            await dialog.accept(inputText);
            
        });

        await page.click('#js-prompt');

        // Assertion
        const resultText = await page.locator('#dialog-response').textContent();
        expect(resultText).toContain(inputText);
    });

    test('RIGHT-B 4 handle alert - 2 BUTTONS with INPUT: Click OK without any message', async ({ page } ) => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());            
            await dialog.accept();            
        });

        await page.click('#js-prompt');

        // Assertion
        const resultText = await page.locator('#dialog-response').textContent();
        console.log(resultText);
    });

    test('RIGHT-C 5 handle alert - 2 BUTTONS with INPUT: Click CANCEL', async ({ page }) => {
        await page.goto('https://practice.expandtesting.com/js-dialogs');

        // Listen for the dialog event and handle it (BEFORE the action that triggers the dialog)
        page.once('dialog', async dialog => {
            console.log(dialog.message());
            
            await dialog.dismiss();
        });

        await page.click('#js-prompt');
    });

    // ......................... TESTING IFRAMES .........................

    test('DEAD PAGE TESTING IFRAMES - fail', async ({ page }) => {
        await page.goto('https://elementdir.com/iframes?utm_source=chatgpt.com');

        await page.click("a[href*='wiki/HTML']");
    });

    test('DEAD PAGE TESTING IFRAMES - pass', async ({ page }) => {
        await page.goto('https://elementdir.com/iframes?utm_source=chatgpt.com');

        await page.frameLocator("iframe[title='Wikipedia Demo']").locator("a[href*='wiki/HTML']").click();
    });

    test('TESTING IFRAMES - fail because trying to enter text directly', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/iframe?utm_source=chatgpt.com');

        await page.fill("#tinymce", "This is a test to fill the iframe with some text.");
    });
    

    test('TESTING IFRAMES - correct approach', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/iframe?utm_source=chatgpt.com');

        await page.frameLocator("#mce_0_ifr").locator("#tinymce").fill("This is a test to fill the iframe with some text.");
    });    

    // ......................... TESTING FILE UPLOAD & DOWNLOAD .........................

    test('upload jpg from Downloads folder', async ({ page }) => {

        // Build path to Downloads folder (cross-platform)
        const downloadsPath = path.join(os.homedir(), 'Downloads', 'testUPLOAD.png');

        await page.goto('https://the-internet.herokuapp.com/upload');
         // Just to see the page before it interacts, not recommended for real tests

        // Upload file
        await page.setInputFiles('input[type="file"]', downloadsPath);

        // Submit
        await page.click('#file-submit');

        // Assertion
        await expect(page.locator('#uploaded-files')).toHaveText('testUPLOAD.png');
    });

    test('download a file single', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/download');

        await page.locator("a[href$='Resume.docx']").first().click() // clicks first file
         // Just to see the page before it closes, not recommended for real tests

    })

    // DDT with JSON to run N times with different data sets
    for (const dataSet of testData) {
        test(`${dataSet.tcName}`, async ({ page }) => {
            const myPage: SwagProductsPage = new SwagProductsPage(page);

            await page.goto('https://the-internet.herokuapp.com/download');

            //await page.locator("a[href$='Resume.docx']").first().click() // Native click
            await myPage.clickAndWaitSuccessfulApi("a[href$='testing.pdf']", "Resume [Link]", dataSet.endpoint, dataSet.expectedStatusCode); // Our custom click coming from BasePage.ts (POM)

             // Just to see the page before it closes, not recommended for real tests
        });
    }

    const testData2: Record<string, number> = {
        "Test case 1": 200,
        "Test case 2": 304
    };

    for (const [key, value] of Object.entries(testData2)) {
        test(`${key}`, async ({ page }) => {
            const myPage: SwagProductsPage = new SwagProductsPage(page);

            await page.goto('https://the-internet.herokuapp.com/download');

            //await page.locator("a[href$='Resume.docx']").first().click() // Native click
            await myPage.clickAndWaitSuccessfulApi("a[href$='testing.pdf']", "Resume [Link]", "/download", value); // Our custom click coming from BasePage.ts (POM)

             // Just to see the page before it closes, not recommended for real tests
        });
    }

    test('download a file with promise', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/download');
         // Just to see the page before it interacts, not recommended for real tests

        await page.screenshot({ path: 'screenshot1Erick.png' });

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

        await page.screenshot({ path: 'screenshot2Erick.png' });
    });
});

