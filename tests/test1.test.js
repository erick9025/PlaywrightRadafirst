import { test, chromium } from '@playwright/test';

// Basically we have 4 test annotation
// ... beforeAll()
// ... beforeEach()
// ... afterEach()
// ... afterAll()

let context;
let page;
let browser;

test.beforeAll(async ({browser}) => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext(); // Create multiple contexts when dealing with different web portals
    page = await context.newPage(); // Create multiple pages when dealing with different tabs    
});

test.beforeEach(async () => {
    // Launch browser
    //const browser = await chromium.launch({ headless: false });

    // 👉 Create a BrowserContext (isolated session)
    context = await browser.newContext();

    // 👉 Create a Page inside the context
    page = await context.newPage();

    // Navigate to Google
    await page.waitForTimeout(3_000); // 5 seconds to allow me move windows from not shown screen to shared screen
});

test('My very first test', async ({ page }) => {
    await page.goto('https://www.google.com');

    // Accept cookies if the dialog appears (EU / some regions)
    const acceptButton = page.locator('button:has-text("Accept all")');
    if (await acceptButton.isVisible()) {
        await acceptButton.click();
    }

    // Perform search
    await page.locator('textarea[name="q"]').fill('Playwright BrowserContext');
    await page.keyboard.press('Enter');

    // Wait for results
    await page.waitForSelector('#search');

    console.log('Search completed');

    // Close everything
    await context.close();
    await browser.close();
});