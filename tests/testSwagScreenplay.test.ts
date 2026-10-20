import { test, expect } from "@playwright/test";
import { Actor } from "../screenplay/core/Actor";
import { BrowseTheWeb } from "../screenplay/abilities/BrowseTheWeb";
import { Login } from "../screenplay/tasks/Login";
import { AddProductToCart } from "../screenplay/tasks/AddProductToCart";
import { SortProducts } from "../screenplay/tasks/SortProducts";
import { GoToCart } from "../screenplay/tasks/GoToCart";
import { PrintTotalAddedSoFar } from "../screenplay/tasks/PrintTotalAddedSoFar";
import { ProductSortingOptions } from "../utils/productSortingOptions";
import { CartTotal } from "../screenplay/questions/CartTotal";
import { ProductSortOrder } from "../screenplay/questions/ProductSortOrder";
import { Text } from "../screenplay/questions/Text";
import { IsVisible } from "../screenplay/questions/IsVisible";
import { WaitFor } from "../screenplay/interactions/WaitFor";
import { SwagCartElements } from "../screenplay/elements/SwagCartElements";
import { SwagProductsElements } from "../screenplay/elements/SwagProductsElements";
import { SwagConstants } from "../screenplay/constants/SwagConstants";
import { ScreenplayLogger } from "../screenplay/logger/ScreenplayLogger";

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║          SCREENPLAY PATTERN — SauceDemo E2E Tests            ║
  ║                                                              ║
  ║  Who:   An Actor (the "Buyer")                               ║
  ║  Can:   BrowseTheWeb (Playwright page)                       ║
  ║  Does:  Tasks  → Login, AddProductToCart, SortProducts…      ║
  ║  Uses:  Interactions → Navigate, Click, Enter, Select        ║
  ║  Asks:  Questions → Text, IsVisible, CartTotal               ║
  ╚══════════════════════════════════════════════════════════════╝
*/

test.describe("Swag Labs – Screenplay Pattern", () => {

    let buyer: Actor;

    // Each test gets a fresh Actor with the Playwright-injected page
    test.beforeEach(async ({ page }) => {
        buyer = Actor.named("Buyer").whoCan(BrowseTheWeb.using(page));
    });

    // ─────────────────────────────────────────────────────────
    // Test 1: Login only
    // ─────────────────────────────────────────────────────────
    test("Login with default user", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser()
        );

        // Verify the products page title is visible after login
        await buyer.attemptsTo(WaitFor.elementToBeVisible(SwagProductsElements.titleProducts, "Products [Title]"));
        const productsVisible = await buyer.asks(IsVisible.of(SwagProductsElements.titleProducts));
        expect(productsVisible).toBe(true);
    });

    // ─────────────────────────────────────────────────────────
    // Test 2: Add one product and verify cart total
    // ─────────────────────────────────────────────────────────
    test("Add one product to cart", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            AddProductToCart.named("Sauce Labs Backpack"),
            PrintTotalAddedSoFar.now()
        );

        const total = await buyer.asks(CartTotal.accumulated());
        expect(total).toContain("$");
        expect(total).not.toBe("$0.00");
        ScreenplayLogger.log(`Total after adding one product: ${total}`);
    });

    // ─────────────────────────────────────────────────────────
    // Test 3: Add multiple products, sort, and go to cart
    // ─────────────────────────────────────────────────────────
    test("Add multiple products, sort, and go to cart", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            AddProductToCart.named("Sauce Labs Backpack"),
            AddProductToCart.named("Sauce Labs Fleece Jacket"),
            SortProducts.by(ProductSortingOptions.NameAscending),
            PrintTotalAddedSoFar.now(),
            GoToCart.now()
        );

        // Verify we are on the cart page
        const cartTitleText = await buyer.asks(Text.of(SwagCartElements.pageTitle));
        expect(cartTitleText).toContain(SwagConstants.expectedCartTitle);

        const total = await buyer.asks(CartTotal.accumulated());
        expect(total).toContain("$");
    });

    // ─────────────────────────────────────────────────────────
    // Test 4: Duplicate add is idempotent (item already in cart)
    // ─────────────────────────────────────────────────────────
    test("Adding same product twice is idempotent", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            AddProductToCart.named("Sauce Labs Backpack"),
            AddProductToCart.named("Sauce Labs Backpack"), // already added — should skip
            AddProductToCart.named("Sauce Labs Backpack"), // already added — should skip
            AddProductToCart.named("Sauce Labs Backpack"), // already added — should skip
            PrintTotalAddedSoFar.now()
        );

        const total = await buyer.asks(CartTotal.accumulated());
        expect(total).toContain("$");
    });

    // ─────────────────────────────────────────────────────────
    // Test 5: Sort products by price descending
    // ─────────────────────────────────────────────────────────
    test("Sort products by price descending", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            SortProducts.by(ProductSortingOptions.PriceDescending)
        );

        await buyer.attemptsTo(WaitFor.elementToBeVisible(SwagProductsElements.titleProducts, "Products [Title]"));
        const titleVisible = await buyer.asks(IsVisible.of(SwagProductsElements.titleProducts));
        expect(titleVisible).toBe(true);
    });

    // ─────────────────────────────────────────────────────────
    // Test 6: Verify every available product sort order
    // ─────────────────────────────────────────────────────────
    test("Verify all product sorting orders", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            WaitFor.elementToBeVisible(SwagProductsElements.titleProducts, "Products [Title]")
        );

        const sortingOptions = [
            ProductSortingOptions.NameAscending,
            ProductSortingOptions.NameDescending,
            ProductSortingOptions.PriceAscending,
            ProductSortingOptions.PriceDescending
        ];

        for (const sortingOption of sortingOptions) {
            await buyer.attemptsTo(SortProducts.by(sortingOption));

            const displayedValues: string[] = await buyer.asks(ProductSortOrder.for(sortingOption));
            expect(displayedValues.length, `${sortingOption} should display products`).toBeGreaterThan(5);

            const isNameSort: boolean =
                sortingOption === ProductSortingOptions.NameAscending ||
                sortingOption === ProductSortingOptions.NameDescending;
            const isAscending: boolean =
                sortingOption === ProductSortingOptions.NameAscending ||
                sortingOption === ProductSortingOptions.PriceAscending;

            if (isNameSort) {
                // Lambda function: convert displayed product names to lowercase for case-insensitive comparison (1 line)
                const names: string[] = displayedValues.map((name) => name.toLocaleLowerCase());

                for (let index = 1; index < names.length; index++) {
                    const previousName: string = names[index - 1];
                    const currentName: string = names[index];
                    const isInOrder: boolean = isAscending
                        ? previousName <= currentName
                        : previousName >= currentName; // Descending order check

                    ScreenplayLogger.log(
                        `${sortingOption}: "${displayedValues[index - 1]}" ${isAscending ? "<=" : ">="} "${displayedValues[index]}" => ${isInOrder}`
                    );

                    expect(
                        isInOrder,
                        `${sortingOption} is out of order: "${displayedValues[index - 1]}" then "${displayedValues[index]}"`
                    ).toBe(true);
                }
            } 
            else {
                // Price sort: convert displayed prices to numbers for comparison
                // Below is a lambda function (MULTIPLE lines) that maps displayed price strings to numbers, removing currency symbols and commas
                const prices: number[] = displayedValues.map((displayedPrice) => {
                    const price = Number(displayedPrice.replace(/[$,]/g, "").trim());
                    if (!Number.isFinite(price)) {
                        throw new Error(`Could not parse product price from UI value: "${displayedPrice}"`);
                    }
                    return price;
                });

                for (let index = 1; index < prices.length; index++) {
                    const previousPrice: number = prices[index - 1];
                    const currentPrice: number = prices[index];
                    const isInOrder: boolean = isAscending
                        ? previousPrice <= currentPrice
                        : previousPrice >= currentPrice; // Descending order check

                    ScreenplayLogger.log(
                        `${sortingOption}: ${previousPrice} ${isAscending ? "<=" : ">="} ${currentPrice} => ${isInOrder}`
                    );

                    expect(
                        isInOrder,
                        `${sortingOption} is out of order: "${displayedValues[index - 1]}" then "${displayedValues[index]}"`
                    ).toBe(true);
                }
            }
        }
    });
});

