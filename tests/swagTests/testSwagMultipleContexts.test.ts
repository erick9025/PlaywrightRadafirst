import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { SwagPages } from '../../pom/web/pages/swagPages';

test.describe('Tests for Swag pages', () => {

    let browser: Browser;
    let context1: BrowserContext;
    let page1: Page;
    let context2: BrowserContext;
    let page2a: Page;
    let page2b: Page;
    let PagesSwag1: SwagPages;
    let PagesSwag2a: SwagPages;
    let PagesSwag2b: SwagPages;


    ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
    test.beforeAll(async ({ playwright }, testInfo) => {
        // Resolve browser from playwright.config.ts project
        const browserName = testInfo.project.use.browserName!;
        const browserType = playwright[browserName];

        browser = await browserType.launch({
            headless: false,
        });

        PagesSwag1 = new SwagPages();
        PagesSwag2a = new SwagPages();
        PagesSwag2b = new SwagPages();
    });

    test.beforeEach(async () => {
        // Create a BrowserContext (isolated session)
        context1 = await browser.newContext();
        context2 = await browser.newContext();

        // Create a Page inside the context
        page1 = await context1.newPage();
        page2a = await context2.newPage();
        page2b = await context2.newPage();

        PagesSwag1.instancePages(page1);
        PagesSwag2a.instancePages(page2a);
        PagesSwag2b.instancePages(page2b);

        // Wait 5 seconds before login to ensure the app is fully loaded (adjust as needed)
        await PagesSwag1.swagLoginPage.waitNSeconds(4);
        await PagesSwag2a.swagLoginPage.waitNSeconds(4);   
        await PagesSwag2b.swagLoginPage.waitNSeconds(4);             
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

    test.skip("MC Swag Add products and go to cart ONE AFTER ANOTHER", async () => {    

        // Contex 1
        await PagesSwag1.swagLoginPage.login();
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag1.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag1.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag1.swagCartPage.goToCart();        
        await PagesSwag1.swagCartPage.verifyCartTotalIsCorrect();

        // Context 2 page 1/a
        await PagesSwag2a.swagLoginPage.login();
        await PagesSwag2a.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag2a.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag2a.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2a.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag2a.swagCartPage.goToCart();        
        await PagesSwag2a.swagCartPage.verifyCartTotalIsCorrect();

        // Context 2 page 2/b
        await PagesSwag2b.swagLoginPage.login();
        await PagesSwag2b.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag2b.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag2b.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2b.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag2b.swagCartPage.goToCart();        
        await PagesSwag2b.swagCartPage.verifyCartTotalIsCorrect();
    });

    test.skip("MC Swag Add products and go to cart interspersed", async () => {

        await PagesSwag1.swagLoginPage.login();
        await PagesSwag2a.swagLoginPage.login();
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag2a.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag2a.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag1.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2a.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag1.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag2a.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag1.swagCartPage.goToCart();  
        await PagesSwag2a.swagCartPage.goToCart();          
        await PagesSwag1.swagCartPage.verifyCartTotalIsCorrect();            
        await PagesSwag2a.swagCartPage.verifyCartTotalIsCorrect();
     });

    test.skip("MC Swag Add products and go to cart PARALLEL", async () => {
        await Promise.all([
            (async () => {
                await PagesSwag1.swagLoginPage.login();
                await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Backpack");
                await PagesSwag1.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
                await PagesSwag1.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
                await PagesSwag1.swagProductsPage.printTotalAddedSoFar();
                await PagesSwag1.swagCartPage.goToCart();
                await PagesSwag1.swagCartPage.verifyCartTotalIsCorrect();
            })(),
            (async () => {
                await PagesSwag2a.swagLoginPage.login();
                await PagesSwag2a.swagProductsPage.addProductToCart("Sauce Labs Backpack");
                await PagesSwag2a.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
                await PagesSwag2a.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
                await PagesSwag2a.swagProductsPage.printTotalAddedSoFar();
                await PagesSwag2a.swagCartPage.goToCart();
                await PagesSwag2a.swagCartPage.verifyCartTotalIsCorrect();
            })()
        ]);
    });
});