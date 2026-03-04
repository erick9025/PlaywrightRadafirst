import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../src/utils/productSortingOptions';
import { ExecutionParameters } from '../../src/utils/executionParameters';

// Proxymise requires DEFAULT imports
import SwagLoginPage from '../../src/pom/pages/pagesByFeature/swagLoginPage';
import SwagProductsPage from '../../src/pom/pages/pagesByFeature/swagProductsPage';
import SwagCartPage from '../../src/pom/pages/pagesByFeature/swagCartPage';

test.describe('Tests for Swag pages WITH PROXYMISE', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    var swagLoginPage: any;
    var swagProductsPage: any;
    var swagCartPage: any;

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

        // Static constructors
        swagLoginPage = SwagLoginPage.initPage(page);
        swagProductsPage = SwagProductsPage.initPage(page);
        swagCartPage = SwagCartPage.initPage(page);

        await swagLoginPage.login();
    });

    test.afterEach(async () => {
        await context.close();
        ExecutionParameters.expectedTotal = 0; // Reset
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test("PROXYMISE Swag Add products only", async () => {
        await swagProductsPage  .addProductToCart("Sauce Labs Backpack")
                                .addProductToCart("Sauce Labs Backpack")
                                .addProductToCart("Sauce Labs Backpack")
                                .addProductToCart("Sauce Labs Backpack")
                                .addProductToCart("Sauce Labs Backpack")
                                .addProductToCart("Sauce Labs Fleece Jacket")
                                .sortProducts(ProductSortingOptions.NameAscending)
                                .printTotalAddedSoFar();
    });

    test("PROXYMISE Swag Add products and go to cart", async () => {        
        await swagProductsPage  .addProductToCart("Sauce Labs Backpack")
                                .addProductToCart("Sauce Labs Fleece Jacket")
                                .sortProducts(ProductSortingOptions.NameAscending)
                                .printTotalAddedSoFar();
        await swagCartPage      .goToCart()
                                .verifyCartTotalIsCorrect();
    });
});