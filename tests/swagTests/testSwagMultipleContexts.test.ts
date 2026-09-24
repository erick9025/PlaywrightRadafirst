import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { ExecutionParameters } from '../../utils/executionParameters';
import { PagesSauceLabs } from '../../pom/web/pages/pagesSauceLabs';

test.describe('Tests for Swag pages', () => {
    let browser: Browser;
    let context1: BrowserContext;
    let page1: Page;
    let context2: BrowserContext;
    let page2: Page;
    let PagesSwag1: PagesSauceLabs;
    let PagesSwag2: PagesSauceLabs;

    test.beforeAll(async ({ playwright }, testInfo) => {
        const browserName = testInfo.project.use.browserName!;
        browser = await playwright[browserName].launch({ headless: false });
    });

    test.beforeEach(async () => {
        context1 = await browser.newContext();
        context2 = await browser.newContext();
        page1 = await context1.newPage();
        page2 = await context2.newPage();
        PagesSwag1 = new PagesSauceLabs(page1);
        PagesSwag2 = new PagesSauceLabs(page2);

        await PagesSwag1.SwagLoginPage.waitNSeconds(3);
        await PagesSwag2.SwagLoginPage.waitNSeconds(3);
    });

    test.afterEach(async () => {
        await context1.close();
        await context2.close();
        ExecutionParameters.expectedTotal = 0;
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('MC Swag Add products and go to cart ONE AFTER ANOTHER', async () => {
        await PagesSwag1.SwagLoginPage.login();
        await PagesSwag1.SwagProductsPage.addProductToCart('Sauce Labs Backpack');
        await PagesSwag1.SwagProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
        await PagesSwag1.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag1.SwagProductsPage.printTotalAddedSoFar();
        await PagesSwag1.SwagCartPage.goToCart();
        await PagesSwag1.SwagCartPage.verifyCartTotalIsCorrect();

        await PagesSwag2.SwagLoginPage.login();
        await PagesSwag2.SwagProductsPage.addProductToCart('Sauce Labs Backpack');
        await PagesSwag2.SwagProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
        await PagesSwag2.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2.SwagProductsPage.printTotalAddedSoFar();
        await PagesSwag2.SwagCartPage.goToCart();
        await PagesSwag2.SwagCartPage.verifyCartTotalIsCorrect();
    });

    test('MC Swag Add products and go to cart interspersed', async () => {
        await PagesSwag1.SwagLoginPage.login();
        await PagesSwag2.SwagLoginPage.login();
        await PagesSwag1.SwagProductsPage.addProductToCart('Sauce Labs Backpack');
        await PagesSwag1.SwagProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
        await PagesSwag2.SwagProductsPage.addProductToCart('Sauce Labs Backpack');
        await PagesSwag2.SwagProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
        await PagesSwag1.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag2.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSwag1.SwagProductsPage.printTotalAddedSoFar();
        await PagesSwag2.SwagProductsPage.printTotalAddedSoFar();
        await PagesSwag1.SwagCartPage.goToCart();
        await PagesSwag2.SwagCartPage.goToCart();
        await PagesSwag1.SwagCartPage.verifyCartTotalIsCorrect();
        await PagesSwag2.SwagCartPage.verifyCartTotalIsCorrect();
    });

    test.skip('MC Swag Add products and go to cart PARALLEL', async () => {
        await Promise.all([
            (async () => {
                await PagesSwag1.SwagLoginPage.login();
                await PagesSwag1.SwagProductsPage.addProductToCart('Sauce Labs Backpack');
                await PagesSwag1.SwagProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
                await PagesSwag1.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
                await PagesSwag1.SwagProductsPage.printTotalAddedSoFar();
                await PagesSwag1.SwagCartPage.goToCart();
                await PagesSwag1.SwagCartPage.verifyCartTotalIsCorrect();
            })(),
            (async () => {
                await PagesSwag2.SwagLoginPage.login();
                await PagesSwag2.SwagProductsPage.addProductToCart('Sauce Labs Backpack');
                await PagesSwag2.SwagProductsPage.addProductToCart('Sauce Labs Fleece Jacket');
                await PagesSwag2.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
                await PagesSwag2.SwagProductsPage.printTotalAddedSoFar();
                await PagesSwag2.SwagCartPage.goToCart();
                await PagesSwag2.SwagCartPage.verifyCartTotalIsCorrect();
            })()
        ]);
    });
});
