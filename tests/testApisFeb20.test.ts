import { test, Browser, BrowserContext, Page, Locator, expect } from '@playwright/test';
import { TestUtilities } from '../utils/testUtilities';
import { Asserts } from '../utils/asserts';

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
test("Testing Wikipedia with search endpoint", async () => {
    await page.goto("https://wikipedia.com");

    await page.fill("#searchInput", "Fifa world cup 2026");

    // Instead of doing just the click, do the click and immediately (paralell) wait for the api to happen
    //await page.click("i.svg-search-icon");
    await TestUtilities.clickAndWaitSuccessfulApi(page, "i.svg-search-icon", "Search [Input]", "/search-redirect.php", 302); //302, not 200

    const isVisible: boolean = await page.locator("#vector-page-tools-dropdown-checkbox").isVisible();
    Asserts.assertTrue(isVisible, "Tools dropdown should be visible");
});

