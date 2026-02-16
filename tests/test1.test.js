import { test, chromium } from '@playwright/test';

let browser;
let context;
let page;

////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
test.beforeAll(async () => {
    // Launch browser
    browser = await chromium.launch({ headless: false });  
});

test.beforeEach(async () => {
    // Create a BrowserContext (isolated session)
    context = await browser.newContext();

    // Create a Page inside the context
    page = await context.newPage();    
    //await page.waitForTimeout(3_000); // 5 seconds to allow me move windows from not shown screen to shared screen
});

test.afterEach(async () => {    
    await context.close();
});

test.afterAll(async () => {
    await browser.close();
});

/////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////
test("My very first test with Facebook", async () => {
    // Navigate to Facebook
    await page.goto("https://www.facebook.com");

    // Go to form, then enter person name information
    await page.locator("[data-testid='open-registration-form-button']").click();
    await page.locator("[name='firstname']").fill("Erick");
    await page.locator("[name='lastname']").fill("Jiménez");

    console.log('Test completed by ERICK JIMENEZ');  
});