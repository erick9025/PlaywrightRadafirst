import { test, expect, Page } from '@playwright/test';
import { SwagProductsPage } from '../../pom/web/pages/pagesByFeature/swagProductsPage';
import * as path from 'node:path';
import os from 'os';
import jsonTestData from '../testData/herokuCombinations.json';

test.describe('Dummy test suite', () => {

    const locatorAnyFileToDownload: string = "(//a[starts-with(@href,'download')])[1]";

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

        await page.locator(locatorAnyFileToDownload).first().click() // clicks first file
         // Just to see the page before it closes, not recommended for real tests

    })

    // DDT with JSON to run N times with different data sets
    for (const dataSet of jsonTestData) {
        test(`${dataSet.tcName}`, async ({ page }) => {
            const myPage: SwagProductsPage = new SwagProductsPage(page);

            await page.goto('https://the-internet.herokuapp.com/download');

            //await page.locator(locatorAnyFileToDownload).first().click() // Native click
            await myPage.clickAndWaitCustomApi("GET", locatorAnyFileToDownload, "Resume [Link]", dataSet.endpoint, 5000, 5000, dataSet.expectedStatusCode); // Our custom click coming from BasePage.ts (POM)
        });
    }

    const localTestData2: Record<string, number> = {
        "Test case 1 correct status code": 200,
        "Test case 2 wrong status code SHOULD FAIL": 304
    };

    for (const [key, value] of Object.entries(localTestData2)) {
        test(`Good practice ${key}`, async ({ page }) => {
            const myPage: SwagProductsPage = new SwagProductsPage(page);

            await page.goto('https://the-internet.herokuapp.com/download');

            await myPage.clickAndWaitCustomApi("GET", locatorAnyFileToDownload, "Resume [Link]", "/download", 5_000, 1_500, value);
        });
    }

    for (const [key, value] of Object.entries(localTestData2)) {
        test(`Bad practice ${key}`, async ({ page }) => {
            await page.goto('https://the-internet.herokuapp.com/download');
            await page.locator(locatorAnyFileToDownload).click() // Native click
        });
    }

    test('download a file with promise', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/download');
         // Just to see the page before it interacts, not recommended for real tests

        await page.screenshot({ path: 'screenshot1Erick.png' });

        // Wait for download + trigger click
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator(locatorAnyFileToDownload).first().click() // clicks first file
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

