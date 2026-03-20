import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { SwagPages } from '../../pom/web/pages/swagPages';
import { TestUtilities } from '../../utils/testUtilities';
import { configParameters } from '../../configs/loadedConfig';

test.describe('Tests for Swag pages', () => {

    let browser: Browser;
    let context1: BrowserContext;
    let page1: Page;
    let context2: BrowserContext;
    let page2: Page;
    let PagesSwag1: SwagPages;
    let PagesSwag2: SwagPages;

    ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
    test.beforeAll(async ({ playwright }, testInfo) => {
        // Resolve browser from playwright.config.ts project
        const browserName = testInfo.project.use.browserName!;
        const browserType = playwright[browserName];

        browser = await browserType.launch({
            headless: false,
        });

        PagesSwag1 = new SwagPages();
        PagesSwag2 = new SwagPages();
    });

    test.beforeEach(async () => {
        // Create a BrowserContext (isolated session)
        context1 = await browser.newContext();
        context2 = await browser.newContext();

        // Create a Page inside the context
        page1 = await context1.newPage();
        page2 = await context2.newPage();    

        PagesSwag1.instancePages(page1);
        PagesSwag2.instancePages(page2);

        // Wait 5 seconds before login to ensure the app is fully loaded (adjust as needed)
        await PagesSwag1.swagLoginPage.waitNSeconds(3);
        await PagesSwag2.swagLoginPage.waitNSeconds(3);                
    });

    test.afterEach(async () => {
        await context1.close();
        await context2.close();
        ExecutionParameters.expectedTotal = 0; // Reset
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test("MC Swag Add products and go to cart ONE AFTER ANOTHER", async () => {    

        await PagesSwag1.swagLoginPage.login();
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag1.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag1.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag1.swagCartPage.goToCart();        
        await PagesSwag1.swagCartPage.verifyCartTotalIsCorrect();

        await PagesSwag2.swagLoginPage.login();
        await PagesSwag2.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag2.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag2.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag2.swagCartPage.goToCart();        
        await PagesSwag2.swagCartPage.verifyCartTotalIsCorrect();
    });

    test("MC Swag Add products and go to cart interspersed", async () => {

        await PagesSwag1.swagLoginPage.login();
        await PagesSwag2.swagLoginPage.login();
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag2.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag2.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag1.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag1.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag2.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag1.swagCartPage.goToCart();  
        await PagesSwag2.swagCartPage.goToCart();          
        await PagesSwag1.swagCartPage.verifyCartTotalIsCorrect();            
        await PagesSwag2.swagCartPage.verifyCartTotalIsCorrect();
     });

    test.skip("MC Swag Add products and go to cart PARALLEL", async () => {
        await Promise.all([
            (async () => {
                PagesSwag1.swagLoginPage.login();
                PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Backpack");
                PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
                PagesSwag1.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
                PagesSwag1.swagProductsPage.printTotalAddedSoFar();
                PagesSwag1.swagCartPage.goToCart();
                PagesSwag1.swagCartPage.verifyCartTotalIsCorrect();
            }),
            (async () => {
                PagesSwag2.swagLoginPage.login();
                PagesSwag2.swagProductsPage.addProductToCart("Sauce Labs Backpack");
                PagesSwag2.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
                PagesSwag2.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
                PagesSwag2.swagProductsPage.printTotalAddedSoFar();
                PagesSwag2.swagCartPage.goToCart();
                PagesSwag2.swagCartPage.verifyCartTotalIsCorrect();
            })
        ]);
    });
});