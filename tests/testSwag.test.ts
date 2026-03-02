import { test, Browser, BrowserContext, Page, Locator, expect } from '@playwright/test';
import { ProductSortingOptions } from '../utils/productSortingOptions';
import { ExecutionParameters } from '../utils/executionParameters';
import { SwagLoginPage } from '../pom/pages/pagesByFeature/swagLoginPage';
import { SwagProductsPage } from '../pom/pages/pagesByFeature/swagProductsPage';
import { SwagCartPage } from '../pom/pages/pagesByFeature/swagCartPage';

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

    test.skip("Swag Add products only", async () => {
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await swagProductsPage.printTotalAddedSoFar();
    });

    test.skip("Swag Add products and go to cart", async () => {        
        await swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await swagProductsPage.printTotalAddedSoFar();
        await swagCartPage.goToCart();        
        await swagCartPage.verifyCartTotalIsCorrect();
    });
});