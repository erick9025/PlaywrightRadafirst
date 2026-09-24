import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { PagesSauceLabs } from '../../pom/web/pages/pagesSauceLabs';
import { TestUtilities } from '../../utils/testUtilities';
import { configParameters } from '../../configs/loadedConfig';

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

        TestUtilities.logToConsole("baseURL: " + configParameters.baseURL);
        TestUtilities.logToConsole("erickVar: " + configParameters.erickVar);
        TestUtilities.logToConsole("erickVarString: " + configParameters.erickVarString);
        TestUtilities.logToConsole("erickVarInt: " + configParameters.erickVarInt);
        TestUtilities.logToConsole("erickVarFloat: " + configParameters.erickVarFloat);
        TestUtilities.logToConsole("erickVarBoolean: " + configParameters.erickVarBoolean);
        TestUtilities.logToConsole("...............................");
        TestUtilities.logToConsole("credentials.myUsername: " + configParameters.credentials.myUsername);
        TestUtilities.logToConsole("credentials.myPassword: " + configParameters.credentials.myPassword);

        configParameters.browsers.forEach(browser => {
            TestUtilities.logToConsole("....name: " + browser.name);
            TestUtilities.logToConsole("....description: " + browser.description);
        });

        await PagesSwag.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSwag.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSwag.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag.SwagProductsPage.printTotalAddedSoFar();
        await PagesSwag.SwagCartPage.goToCart();        
        await PagesSwag.SwagCartPage.verifyCartTotalIsCorrect();
    });
});
