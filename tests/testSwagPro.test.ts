import { test, Browser, BrowserContext, Page, Locator, expect } from '@playwright/test';
import { ProductSortingOptions } from '../utils/productSortingOptions';
import { ExecutionParameters } from '../utils/executionParameters';
import { SwagPages } from '../pom/pages/swagPages';

test.describe('Tests for Swag pages', () => {

    let browser: Browser;
        let context: BrowserContext;
        let page: Page;
        let PagesSwag: SwagPages;

    ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
    test.beforeAll(async ({ playwright }, testInfo) => {
        // Resolve browser from playwright.config.ts project
        const browserName = testInfo.project.use.browserName!;
        const browserType = playwright[browserName];

        browser = await browserType.launch({
            headless: false,
        });

        PagesSwag = new SwagPages();
    });

    test.beforeEach(async () => {
        // Create a BrowserContext (isolated session)
        context = await browser.newContext();

        // Create a Page inside the context
        page = await context.newPage();

        PagesSwag.instancePages(page);

        await PagesSwag.swagLoginPage.login();
    });

    test.afterEach(async () => {
        await context.close();
        ExecutionParameters.expectedTotal = 0; // Reset
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test.skip("Swag Add products only", async () => {
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag.swagProductsPage.printTotalAddedSoFar();
    });

    test.skip("Swag Add products and go to cart", async () => {        
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag.swagCartPage.goToCart();        
        await PagesSwag.swagCartPage.verifyCartTotalIsCorrect();
    });
});