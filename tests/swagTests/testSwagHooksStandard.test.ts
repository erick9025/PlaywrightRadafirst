import { test } from '../testHooks/baseTestSauceLabs';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { SwagLoginPage } from '../../pom/web/pages/pagesByFeature/swagLoginPage';
import { TestUtilities } from '../../utils/testUtilities';

test.describe('Tests for Swag pages REGULAR/MULTI THREAD', () => {
    test.use({ createContextBeforeEachTest: true }); // DEFAULT VALUE

    test("Swag Add products and go to cart with hooks 2", async ({ PagesSauceLabs }) => {  
        
        await PagesSauceLabs.SwagLoginPage.login();
        await PagesSauceLabs.SwagLoginPage.takeScreenshotWithTimestamp("Erick_1");
        await PagesSauceLabs.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSauceLabs.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSauceLabs.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSauceLabs.SwagLoginPage.takeScreenshotWithTimestamp("Erick_2");
        await PagesSauceLabs.SwagProductsPage.printTotalAddedSoFar();
        await PagesSauceLabs.SwagCartPage.goToCart();        
        await PagesSauceLabs.SwagCartPage.verifyCartTotalIsCorrect();
        await PagesSauceLabs.SwagLoginPage.takeScreenshotWithTimestamp("Erick_3");
    });

    test("Swag Add products and go to cart with hooks 3", async ({ PagesSauceLabs, page }) => {  
        
        await PagesSauceLabs.SwagLoginPage.login();
        await PagesSauceLabs.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await PagesSauceLabs.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        await PagesSauceLabs.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await PagesSauceLabs.SwagProductsPage.printTotalAddedSoFar();
        await PagesSauceLabs.SwagCartPage.goToCart();        
        await PagesSauceLabs.SwagCartPage.verifyCartTotalIsCorrect();

        await PagesSauceLabs.initSecondaryPageBasedOnPage(page, SwagLoginPage)
        await PagesSauceLabs.SwagLoginPage2.login();

        await PagesSauceLabs.SwagCartPage.verifyCartTotalIsCorrect();
        await PagesSauceLabs.SwagCartPage.verifyCartTotalIsCorrect();
        await PagesSauceLabs.SwagCartPage.verifyCartTotalIsCorrect();
        await PagesSauceLabs.SwagCartPage.verifyCartTotalIsCorrect();
    });

    //............................... DDT EXCEL ...............................

    const testData = TestUtilities.getTestData("tests/testData/excelSwag.xlsx");

    testData.forEach((data: any) => {
        test(`Swag Login multiple users ${data.username}`, async ({ PagesSauceLabs }) => {
            await PagesSauceLabs.SwagLoginPage.login(data.username, data.password);
        });
    });
});
