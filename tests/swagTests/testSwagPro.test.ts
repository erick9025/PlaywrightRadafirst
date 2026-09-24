import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { PagesSauceLabs } from '../../pom/web/pages/pagesSauceLabs';

test.describe('Tests for Swag pages', () => {
    test.describe.configure({ mode: 'serial' });

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let PagesSwag: PagesSauceLabs;

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

        PagesSwag = new PagesSauceLabs(page);

        await PagesSwag.SwagLoginPage.login();
    });

    test.afterEach(async () => {
        await context.close();
        ExecutionParameters.expectedTotal = 0; // Reset
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test("Testing playwright special locators", async () => {     
        await PagesSwag.SwagProductsPage.clickOnButton(".inventory_list .inventory_item:has-text('Fleece') button");
    });

    test.skip("Swag Add products and go to cart", async () => {  

        await PagesSwag.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag.SwagProductsPage.printTotalAddedSoFar();
        await PagesSwag.SwagCartPage.goToCart();        
        await PagesSwag.SwagCartPage.verifyCartTotalIsCorrect();
    });
});
