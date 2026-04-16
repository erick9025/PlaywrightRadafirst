import { test, expect } from "@playwright/test";
import { Actor } from "../screenplay/core/Actor";
import { BrowseTheWeb } from "../screenplay/abilities/BrowseTheWeb";
import { Login } from "../screenplay/tasks/Login";
import { AddProductToCart } from "../screenplay/tasks/AddProductToCart";
import { SortProducts } from "../screenplay/tasks/SortProducts";
import { IsListSortedCorrectly } from "../screenplay/questions/IsListSortedCorrectly";
import { GoToCart } from "../screenplay/tasks/GoToCart";
import { PrintTotalAddedSoFar } from "../screenplay/tasks/PrintTotalAddedSoFar";
import { ProductSortingOptions } from "../enums/productSortingOptions";
import { CartTotal } from "../screenplay/questions/CartTotal";
import { Text } from "../screenplay/questions/Text";
import { IsVisible } from "../screenplay/questions/IsVisible";
import { SwagCartElements } from "../screenplay/elements/SwagCartElements";
import { SwagProductsElements } from "../screenplay/elements/SwagProductsElements";
import { SwagConstants } from "../screenplay/constants/SwagConstants";
import { ScreenplayLogger } from "../screenplay/logger/ScreenplayLogger";

const ddtScenarios : Map<boolean, string> = new Map([
    [true, "List is sorted correctly"],
    [false, "List is NOT sorted correctly because of a TRICKED item in the list MANUALLY set to '29.98' instead of '49.99'"]
]);

const ddtScenariosAllEnums : Map<ProductSortingOptions, string> = new Map([
    [ProductSortingOptions.NameAscending, "Name Ascending"],
    [ProductSortingOptions.NameDescending, "Name Descending"],
    [ProductSortingOptions.PriceAscending, "Price Ascending"],
    [ProductSortingOptions.PriceDescending, "Price Descending"]
]);

/*
  ╔═══════════════════════════════════════════════════════════════════════╗
  ║          SCREENPLAY PATTERN — SauceDemo E2E Tests                     ║
  ║                                                                       ║
  ║  Who:   An Actor (the "Buyer")                                        ║
  ║  Can:   BrowseTheWeb (Playwright page)                                ║
  ║  Does:  Tasks  → Login, AddProductToCart, SortProducts…               ║
  ║  Uses:  Interactions → Navigate, Click, Enter, Select                 ║
  ║  Asks:  Questions → Text, IsVisible, CartTotal, IsListSortedCorrectly ║
  ╚═══════════════════════════════════════════════════════════════════════╝
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
        console.log(`Total after adding one product: ${total}`);
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

    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // Test 5: Sort products by price descending with DDT to verify the IsListSortedCorrectly question with a TRICKED item in the list
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

    for (const [isCorrectlySorted, scenarioDescription] of ddtScenarios) {
        test(`Sort products by price descending - ${scenarioDescription}`, async () => {
            await buyer.attemptsTo(
                Login.withDefaultUser(),
                SortProducts.by(ProductSortingOptions.PriceDescending)
            );

            const titleVisible = await buyer.asks(IsVisible.of(SwagProductsElements.titleProducts));
            expect(titleVisible).toBe(true);

            let allTextsMemory: string[] = [];

            if (isCorrectlySorted) {
                allTextsMemory = buyer.recallOrDefault<string[]>(SwagConstants.memoryKeys.allTextsMemory, []);
            }
            else {
                allTextsMemory = buyer.recallOrDefault<string[]>(SwagConstants.memoryKeys.allTextsMemory, [])
                    .map(text => text === "$49.99" ? "$29.98" : text); // e.g. 29.98, 29.99, 19.99
            }

            // Before asking the question print the list TRICKED MANUALLY
            ScreenplayLogger.log(`Items in the list ${isCorrectlySorted ? ':' : '(tricked):'}`);
            allTextsMemory.forEach((text, index) => {
                ScreenplayLogger.log(`${index + 1}. ${text}`);
            });

            const isListSortedCorrectly = await buyer.asks(IsListSortedCorrectly.by(ProductSortingOptions.PriceDescending, allTextsMemory));

            ScreenplayLogger.log(`Is the products list sorted correctly by price descending? ${isListSortedCorrectly}`);
            expect(isListSortedCorrectly).toBe(true);
        });
    }

    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
    // Test 6: Sort products by price descending with DDT with all possible sorting options to verify the IsListSortedCorrectly question
    // ─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────

    for (const [sortingScenario, scenarioDescription] of ddtScenariosAllEnums) {
        test(`Sort products by ${scenarioDescription}`, async () => {
            await buyer.attemptsTo(
                Login.withDefaultUser(),
                SortProducts.by(sortingScenario)
            );

            const titleVisible = await buyer.asks(IsVisible.of(SwagProductsElements.titleProducts));
            expect(titleVisible).toBe(true);

            const allTextsMemory: string[] = buyer.recallOrDefault<string[]>(SwagConstants.memoryKeys.allTextsMemory, []);

            // Before asking the question print the list TRICKED MANUALLY
            ScreenplayLogger.log(`Items in the list:`);
            allTextsMemory.forEach((text, index) => {
                ScreenplayLogger.log(`${index + 1}. ${text}`);
            });

            const isListSortedCorrectly = await buyer.asks(IsListSortedCorrectly.by(sortingScenario, allTextsMemory));

            ScreenplayLogger.log(`Is the products list sorted correctly by ${scenarioDescription}? ${isListSortedCorrectly}`);
            expect(isListSortedCorrectly).toBe(true);
        });
    }
});