import { test } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

test.describe('Testing Network API REST interception', () => {

    //'C:\Users\erick.jimenez\Documents\responses\html\expandtesting.html'

    /*
    🧠 Mental model
        route.fulfill() → you replace the response completely
        route.continue() → let it go to the real server
        route.fetch() → get real response, then modify it
    */

    test("Fullfill", async ({page}) => {

        const htmlPath = path.join(process.cwd(), './responses/html/expandtesting.html');
        const htmlContent = await fs.readFile(htmlPath, 'utf-8');

        console.log("HTML: " + htmlContent);
        console.log("...................................");
        
        await page.route('https://practice.expandtesting.com/login', async (route) => {
        await route.fulfill({
            status: 505,
            contentType: 'text/html',
            body: htmlContent,
            });
        });

        await page.goto("https://practice.expandtesting.com/login");
        await page.fill("#username", "practice");
        await page.fill("#password", "hg<asedewsahwaerhwahwh"); //SuperSecretPassword!
        await page.click("#submit-login");

        const text: string = await page.locator("#flash").first().innerText();

        console.log("Erick: " + text);

        //await page.waitForTimeout(5000);
    });    

    test("(Captura y deja seguir) continue", async ({page}) => {
        await page.route('https://practice.expandtesting.com/login', async (route) => {
            await route.continue();
        });

        await page.goto("https://practice.expandtesting.com/login");
        await page.fill("#username", "practice");
        await page.fill("#password", "hg<asedewsahwaerhwahwh"); //SuperSecretPassword!
        await page.click("#submit-login");

        const text: string = await page.locator("#flash").first().innerText();

        console.log("Erick: " + text);
    });

    test("(Captura y deja seguir) continue - fail if not called", async ({ page }) => {
        await page.route('https://practice.expandtesting.com/loaaagin', async (route) => {
            await route.continue();
        });

        // 👇 Start waiting BEFORE triggering the action
        const loginRequestPromise = page.waitForRequest('https://practice.expandtesting.com/laaaogin', { timeout: 5000 });

        await page.goto("https://practice.expandtesting.com/login");

        await page.fill("#username", "practice");
        await page.fill("#password", "hg<asedewsahwaerhwahwh");
        await page.click("#submit-login");

        // 👇 This will throw if the request never happens
        const request = await loginRequestPromise;

        console.log("Request captured:", request.url());

        const text: string = await page.locator("#flash").first().innerText();
        console.log("Erick: " + text);
    });

    test("(Captura y Reemplaza) Fetch - replace response completely", async ({ page }) => {

        const htmlPath = path.join(process.cwd(), './responses/html/expandtesting.html');
        const htmlContent = await fs.readFile(htmlPath, 'utf-8');

        await page.route('**/login', async (route) => {
            const originalResponse = await route.fetch(); // still hits real server

            await route.fulfill({
                status: 505, // override status
                contentType: 'text/html',
                body: htmlContent, // completely replaced
            });
        });

        await page.goto("https://practice.expandtesting.com/login");

        await page.fill("#username", "practice");
        await page.fill("#password", "hg<asedewsahwaerhwahwh");
        await page.click("#submit-login");

        const text: string = await page.locator("#flash").first().innerText();
        console.log("Erick: " + text);
    });

    test("Chingon (Captura/Obten/Modifica) Fetch - modify original HTML response", async ({ page }) => {

        await page.route('https://practice.expandtesting.com/login', async (route) => {
            const originalResponse = await route.fetch();
            const originalBody = await originalResponse.text();

            let modifiedBody = originalBody.replaceAll(
            'Your password is invalid!',
            'Que onda culeros'
            );

            modifiedBody = modifiedBody.replaceAll(
            'practice',
            'erick.unosquare'
            );

            modifiedBody = modifiedBody.replaceAll(
            'SuperSecretPassword',
            'qwertyuiopasdfghjklzxcvbnm'
            );

            await route.fulfill({
            response: originalResponse, // keeps headers, cookies, etc.
            body: modifiedBody,
            });
        });

        await page.goto("https://practice.expandtesting.com/login");

        await page.fill("#username", "practice");
        await page.fill("#password", "hg<asedewsahwaerhwahwh");
        await page.click("#submit-login");

        const text: string = await page.locator("#flash").first().innerText();
        console.log("Erick: " + text);
    });
});