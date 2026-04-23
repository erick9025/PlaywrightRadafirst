import { test } from '../testHooks/swagParentTest';
import { ProductSortingOptions } from '../../utils/productSortingOptions';
import { Asserts } from '../../utils/asserts';

test.describe('Tests for Swag pages SEQUENTIAL/SERIAL (Simulated with 1 thread)', () => {
    test.use({ createContextBeforeEach: false, browserName: 'webkit' }); // Set to false to create a single context for all tests (faster but less isolated)

    /* Test Case 1001: Login to page
    Test Case 1002: Add products to cart
    Test Case 1003: Sort products and print total added so far
    Test Case 1004: Go to cart and verify total is correct */

    let didPart1Pass: boolean = false; // Flag to track if part 1 passed
    let didPart2Pass: boolean = false; // Flag to track if part 2 passed
    let didPart3Pass: boolean = false; // Flag to track if part 3 passed
    const considerAsFailedIfPreviousPartDidNotPass: boolean = true; // Set to true to consider the test as failed if the previous part did not pass, set to false to consider the test as passed even if the previous part did not pass (but it will be skipped)

    test("[1001] Pt: 1 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {         
        await AllPages.SwagLoginPage.login();
        didPart1Pass = true;
    });

    test("[1002] Pt: 2 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {  

        if(!didPart1Pass) {
            console.log("Part 1 did not pass, skipping Part 2");
            !considerAsFailedIfPreviousPartDidNotPass ? test.skip(true, "Skipping Part 2 because Part 1 did not pass") : Asserts.assertFail("Part 1 did not pass so Part 2 did not run");
        }

        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");
        
        // Force a failure with asser equals
        Asserts.assertEquals(1, 1, "This is a forced failure to test the retry mechanism in the config file");
        didPart2Pass = true;

    });

    test("[1003] Pt: 3 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {       
        if(!didPart2Pass) {
            console.log("Part 2 did not pass, skipping Part 3");
            !considerAsFailedIfPreviousPartDidNotPass ? test.skip(true, "Skipping Part 3 because Part 2 did not pass") : Asserts.assertFail("Part 2 did not pass so Part 3 did not run");
        }
        
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagProductsPage.printTotalAddedSoFar();
        didPart3Pass = true;
    });

    test("[1004] Pt: 4 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {  
        if(!didPart3Pass) {
            console.log("Part 3 did not pass, skipping Part 4");
            !considerAsFailedIfPreviousPartDidNotPass ? test.skip(true, "Skipping Part 4 because Part 3 did not pass") : Asserts.assertFail("Part 3 did not pass so Part 4 did not run");
        }

        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
    });
});

test.describe.serial('Tests for Swag pages SEQUENTIAL/SERIAL (Real sequential)', () => {
    test.use({ createContextBeforeEach: false }); // Set to false to create a single context for all tests (faster but less isolated)

    /* Test Case 1001: Login to page
    Test Case 1002: Add products to cart
    Test Case 1003: Sort products and print total added so far
    Test Case 1004: Go to cart and verify total is correct */

    test("[1001] bPt: 1 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {         
        await AllPages.SwagLoginPage.login();
    });

    test("[1002] bPt: 2 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {  
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Backpack");
        await AllPages.SwagProductsPage.addProductToCart("Sauce Labs Fleece Jacket");                
    });

    test("[1003] bPt: 3 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {       
        await AllPages.SwagProductsPage.sortProducts(ProductSortingOptions.NameAscending);
        await AllPages.SwagProductsPage.printTotalAddedSoFar();

        // Force a failure with assert equals
        Asserts.assertEquals(1, 2, "This is a forced failure to test the retry mechanism in the config file");
    });

    test("[1004] bPt: 4 - Swag Add products and go to cart with hooks", async ({ AllPages }) => {  
        await AllPages.SwagCartPage.goToCart();        
        await AllPages.SwagCartPage.verifyCartTotalIsCorrect();
    });
});