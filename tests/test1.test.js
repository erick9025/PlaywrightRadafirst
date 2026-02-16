import { test, chromium } from '@playwright/test';

let browser;
let context;
let page;

// Basically we have 4 test annotation
// ... beforeAll()
// ... beforeEach()
// ... afterEach()
// ... afterAll()

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
    await page.waitForTimeout(3_000); // 5 seconds to allow me move windows from not shown screen to shared screen
});

/*test.afterEach(async () => {    
    await context.close();
});

test.beforeAll(async () => {
    await browser.close();
});*/

/////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

test("My very first test", async () => {
    // Navigate to Google
    await page.goto("https://www.facebook.com");

    // Enter something
    await page.locator("[data-testid='open-registration-form-button']").click();
    await page.locator("[name='firstname']").fill("Erick");

    console.log('Test completed');  
    
    await context.close();
    await browser.close();
});