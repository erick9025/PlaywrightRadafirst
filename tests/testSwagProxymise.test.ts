import { test, Browser, BrowserContext, Page, Locator, expect } from '@playwright/test';
import { ProductSortingOptions } from '../utils/productSortingOptions';
import { ExecutionParameters } from '../utils/executionParameters';

// Proxymise requires DEFAULT imports
import SwagLoginPage from '../pom/swagLoginPage';
import SwagProductsPage from '../pom/swagProductsPage';
import SwagCartPage from '../pom/swagCartPage';

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
                                .printUserInfo(ExecutionParameters.userObject)
                                .verifyCartTotalIsCorrect();
    });

    test("PROXYMISE Chaining calls SYNC", async () => {        
        swagProductsPage    .step1()
                            .step2()
                            .step3()
                            .step4();
    });

    test("PROXYMISE Not Chaining calls SYNC", async () => {        
        swagProductsPage.step1();
        swagProductsPage.step2();
        swagProductsPage.step3();
        swagProductsPage.step4();
    });
});