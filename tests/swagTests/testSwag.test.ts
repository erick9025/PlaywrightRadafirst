import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../src/utils/productSortingOptions';
import { ExecutionParameters } from '../../src/utils/executionParameters';
import { SwagLoginPage } from '../../src/pom/pages/pagesByFeature/swagLoginPage';
import { SwagProductsPage } from '../../src/pom/pages/pagesByFeature/swagProductsPage';
import { SwagCartPage } from '../../src/pom/pages/pagesByFeature/swagCartPage';

test.describe('Tests for Swag pages', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let swagLoginPage: SwagLoginPage;
    let swagProductsPage: SwagProductsPage;
    let swagCartPage: SwagCartPage;

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

        swagLoginPage = new SwagLoginPage(page);
        swagProductsPage = new SwagProductsPage(page);
        swagCartPage = new SwagCartPage(page);

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

    test("Swag Add products only", async () => {
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await swagProductsPage.printTotalAddedSoFar();
    });

    test("Swag Add products and go to cart", async () => {        
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await swagProductsPage.printTotalAddedSoFar();
        await swagCartPage.goToCart();        
        await swagCartPage.verifyCartTotalIsCorrect();
    });
});