import { test, Browser, BrowserContext, Page, Locator, expect } from '@playwright/test';

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
test.skip("My very first test with Facebook and TypeScript", async () => {
    //await page.waitForTimeout(4500);

    // Navigate to Facebook
    await page.goto("https://www.facebook.com/");

    // Open registration form
    await page.locator("[data-testid='open-registration-form-button']").hover();

    const button = page.locator("[data-testid='open-registration-form-button']");

    await button.waitFor({ state: 'visible' });
    await expect(button).toBeEnabled();
    await button.click();

    //await page.locator("[data-testid='open-registration-form-button']").waitFor({ state: 'visible' }); // Optional but recommended
    //await page.locator("[data-testid='open-registration-form-button']").click();

    // Enter name
    await page.locator("[name='firstname']").fill("Mauricio");

    // Enter last name
    const locatorLastName: Locator = page.locator("[name='lastname']");
    await locatorLastName.fill("Aliendre");

    // Select birthday
    await page.selectOption('#month', 'Jan');
    await page.selectOption('#day', '5');
    await page.selectOption('#year', '1997');

    // Select Gender
    //await page.getByRole('radio', { name: 'Male', exact: true }).check();
    //await page.locator("#sex[value='2']").click(); // works also but NOT recommended
    await page.locator("#sex[value='2']").check(); // best practice

    // Enter Mobile Number
    await page.locator("[aria-label='Mobile number or email']").fill("1234567890"); // css
    //await page.locator("//*[@aria-label='Mobile number or email']").fill("1234567890"); // xpath

    // Enter Password
    await page.locator("[aria-label='New password']").fill("MySecurePassword123");

    console.log('Test completed by MAURICIO ALIENDRE');
    // await page.waitForTimeout(2500);
});
