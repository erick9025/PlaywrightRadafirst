import { test } from '../testHooks/swagParentTest';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { Asserts } from '../../utils/asserts';
import { SwagLoginPage } from '../../pom/web/pages/pagesByFeature/swagLoginPage';
import { TestUtilities } from '../../utils/testUtilities';

test.describe.serial('Tests for Swag pages SEQUENTIAL/SERIAL', () => {
    test.use({ createContextBeforeEach: false }); // Set to false to create a single context for all tests (faster but less isolated)

    /* Test Case 1001: Login to page
    Test Case 1002: Add products to cart
    Test Case 1003: Sort products and print total added so far
    Test Case 1004: Go to cart and verify total is correct */

    test("[1001] Pt: 1 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {         
        await AllPages.SwagLoginPage.login();
    });

    test("[1002] Pt: 2 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {  
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
    });

    test("[1003] Pt: 3 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {         
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagProductsPage.printTotalAddedSoFar();
    });

    test("[1004] Pt: 4 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {  
        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
    });
});

/*
test.describe('Tests for Swag pages REGULAR/MULTI THREAD', () => {

    test("Swag Add products and go to cart with hooks 2", async ({ AllPages, browser }) => {  
        
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

    test("Swag Add products and go to cart with hooks 3", async ({ AllPages, page }) => {  
        
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
*/