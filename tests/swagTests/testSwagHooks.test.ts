import { Browser, BrowserContext, Page } from '@playwright/test';
import { test } from '../testHooks/swagParentTest';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { SwagPages } from '../../pom/web/pages/swagPages';

test.describe('Tests for Swag pages', () => {
    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let PagesSwag: SwagPages;

    /*
    test.beforeAll(     globalSetup --> si se puede
    test.beforeEach(    globalSetupEach
    test.afterEach(     globalTeardownEach
    test.afterAll(      globalTeardown  --> si se puede
    */


    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test("Swag Add products and go to cart with hooks", async ({ playwright }, testInfo) => {  

        // Resolve browser from playwright.config.ts project
        const browserName = testInfo.project.use.browserName!;
        const browserType = playwright[browserName];

        browser = await browserType.launch({
            headless: false,
        });

        PagesSwag = new SwagPages();

        // Create a BrowserContext (isolated session)
        context = await browser.newContext();

        // Create a Page inside the context
        page = await context.newPage();

        PagesSwag.instancePages(page);

        await PagesSwag.swagLoginPage.login();

        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag.swagCartPage.goToCart();        
        await PagesSwag.swagCartPage.verifyCartTotalIsCorrect();

        await context.close();
        ExecutionParameters.expectedTotal = 0; // Reset

        await browser.close();
    });
});