import { test, chromium } from '@playwright/test';

let browser;
let context;
let page;

////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
test.beforeAll(async () => {
    // Launch browser 
    browser = await chromium.launch({ headless: false});  // ❌❌❌❌❌❌❌ DO NOT do this, this a terrible practice ❌❌❌❌❌❌❌

    /*
    This is why this pattern is ❌ wrong
        - Problems with manual chromium.launch():
        - Breaks Playwright’s project model
        - Confusing browser reporting
        - No real cross-browser validation
        - Not parallel-safe
        - Not CI-friendly
        - Interview red flag 🚩

    This is not actually gonna run in Chromium (ONLY) if the playwright config has projects defined
    Only when playwright.config DOES NOT declare any projects/browsers, this file will run in Chromium
    */
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
test.skip("My very first test with Facebook", async () => {
    // Navigate to Facebook
    await page.goto("https://www.facebook.com");

    // Go to form, then enter person name information
    await page.locator("[data-testid='open-registration-form-button']").click();
    
    // Enter name 
    await page.locator("[name='firstname']").fill("Erick");

    // Enter last name
    let locatorLastName = page.locator("[name='lastname']");
    await locatorLastName.fill("Jiménez");

    console.log('Test completed by ERICK JIMENEZ');  
});