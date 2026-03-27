import { test } from '../testHooks/swagParentTest';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { SwagLoginPage } from '../../pom/web/pages/pagesByFeature/swagLoginPage';
import { TestUtilities } from '../../utils/testUtilities';

test.describe('Tests for Swag pages', () => {
    test.beforeEach(async () => {
        console.log("ERICK FIRST beforeEach block inside testSwagPro.test.ts");
    });

    test.skip("Swag Add products and go to cart with hooks", async ({ AllPages }) => {  
        
        await AllPages.SwagLoginPage.login();
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagProductsPage.printTotalAddedSoFar();
        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
    });


    test.skip("Swag Add products and go to cart with hooks 2", async ({ AllPages, browser }) => {  
        
        await AllPages.SwagLoginPage.login();
        await AllPages.SwagLoginPage.takeScreenshotWithTimestamp("Erick_1");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagLoginPage.takeScreenshotWithTimestamp("Erick_2");
        await AllPages.SwagProductsPage.printTotalAddedSoFar();
        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
        await AllPages.SwagLoginPage.takeScreenshotWithTimestamp("Erick_3");

        // Clean
        await AllPages.resetAllPagesWithFreshContext(browser);

        await AllPages.SwagLoginPage.login();
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagProductsPage.printTotalAddedSoFar();
        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
    });

    test.skip("Swag Add products and go to cart with hooks 3", async ({ AllPages, page }) => {  
        
        await AllPages.SwagLoginPage.login();
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagProductsPage.printTotalAddedSoFar();
        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();

        await AllPages.initSecondaryPageBasedOnPage(page, SwagLoginPage)
        await AllPages.SwagLoginPage2.login();

        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
    });

    //............................... DDT EXCEL ...............................

    const testData = TestUtilities.getTestData("tests/testData/excelSwag.xlsx");

    //C:\Users\erick.jimenez\Documents\GitHub\PlaywrightRadafirst\tests\testData\excelSwag.xlsx
    //C:\Users\erick.jimenez\Documents\GitHub\testData\excelSwag.xlsx

    testData.forEach((data: any) => {
        test(`Swag Login multiple users ${data.username}`, async ({ AllPages }) => {
            await AllPages.SwagLoginPage.login(data.username, data.password);
        });
    });
});