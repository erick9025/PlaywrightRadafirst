import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { SwagPages } from '../../pom/web/pages/swagPages';
import { TestUtilities } from '../../utils/testUtilities';
import { configParameters } from '../../configs/loadedConfig';

test.describe('Tests for Swag pages', () => {
    test.describe.configure({ mode: 'serial' });

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

        
    });

    test.beforeEach(async () => {
        // Create a BrowserContext (isolated session)
        context = await browser.newContext();

        // Create a Page inside the context
        page = await context.newPage();

        PagesSwag = new SwagPages(page);

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

    test("Testing playwright special locators", async () => {     
        await PagesSwag.swagProductsPage.clickOnButton(".inventory_list .inventory_item:has-text('Fleece') button");
    });

    test.skip("Swag Add products and go to cart", async () => {  

        TestUtilities.logMessage("baseURL: " + configParameters.baseURL);
        TestUtilities.logMessage("erickVar: " + configParameters.erickVar);
        TestUtilities.logMessage("erickVarString: " + configParameters.erickVarString);
        TestUtilities.logMessage("erickVarInt: " + configParameters.erickVarInt);
        TestUtilities.logMessage("erickVarFloat: " + configParameters.erickVarFloat);
        TestUtilities.logMessage("erickVarBoolean: " + configParameters.erickVarBoolean);
        TestUtilities.logMessage("...............................");
        TestUtilities.logMessage("credentials.myUsername: " + configParameters.credentials.myUsername);
        TestUtilities.logMessage("credentials.myPassword: " + configParameters.credentials.myPassword);

        configParameters.browsers.forEach( browser => {
            TestUtilities.logMessage("....name: " + browser.name);
            TestUtilities.logMessage("....description: " + browser.description);
        });

        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.swagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag.swagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag.swagProductsPage.printTotalAddedSoFar();
        await PagesSwag.swagCartPage.goToCart();        
        await PagesSwag.swagCartPage.verifyCartTotalIsCorrect();
    });
});