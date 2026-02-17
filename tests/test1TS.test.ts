import { test, Browser, BrowserContext, Page, Locator } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
test.beforeAll(async ({ playwright }, testInfo) => {
    // Resolve browser from playwright.config.ts project
    const browserName = testInfo.project.use.browserName!;
    const browserType = playwright[browserName];

    browser = await browserType.launch({
        headless: false,
    });
});

test.beforeEach(async () => {
    // Create a BrowserContext (isolated session)
    context = await browser.newContext();

    // Create a Page inside the context
    page = await context.newPage();
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async () => {
    await browser.close();
});

/////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////
test("My very first test with Facebook and TypeScript", async () => {
    //await page.waitForTimeout(4500);

    // Navigate to Facebook
    await page.goto("https://www.facebook.com");

    // Open registration form
    await page.locator("[data-testid='open-registration-form-button']").click();

    // Enter name
    await page.locator("[name='firstname']").fill("Erick");

    // Enter last name
    const locatorLastName: Locator = page.locator("[name='lastname']");
    await locatorLastName.fill("Jiménez");

    // Select day from DDL (dropdown list)
    await page.selectOption('#day', '25');

    //await page.locator("#day").click(); // Expand DAY dropdown
    //await page.locator("#day option[value='25']").click({ force: true }); // Once expanded select the specific day (1...31)
    //await page.locator("//option[@value='25']").click({ force: true }); // Once expanded select the specific day (1...31)

    console.log('Test completed by ERICK JIMENEZ');
    //await page.waitForTimeout(2500);
});
