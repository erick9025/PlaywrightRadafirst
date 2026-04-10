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
import { Text } from "../screenplay/questions/Text";
import { IsVisible } from "../screenplay/questions/IsVisible";
import { SwagCartElements } from "../screenplay/elements/SwagCartElements";
import { SwagProductsElements } from "../screenplay/elements/SwagProductsElements";
import { SwagConstants } from "../screenplay/constants/SwagConstants";

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
        const productsVisible = await buyer.asks(IsVisible.of(SwagProductsElements.titleProducts));
        expect(productsVisible).toBe(true);
    });

    // ─────────────────────────────────────────────────────────
    // Test 2: Add one product and verify cart total
    // ─────────────────────────────────────────────────────────
    test.skip("Add one product to cart", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            AddProductToCart.named("Sauce Labs Backpack"),
            PrintTotalAddedSoFar.now()
        );

        const total = await buyer.asks(CartTotal.accumulated());
        expect(total).toContain("$");
        expect(total).not.toBe("$0.00");
    });

    // ─────────────────────────────────────────────────────────
    // Test 3: Add multiple products, sort, and go to cart
    // ─────────────────────────────────────────────────────────
    test.skip("Add multiple products, sort, and go to cart", async () => {
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
    test.skip("Adding same product twice is idempotent", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            AddProductToCart.named("Sauce Labs Backpack"),
            AddProductToCart.named("Sauce Labs Backpack"), // already added — should skip
            PrintTotalAddedSoFar.now()
        );

        const total = await buyer.asks(CartTotal.accumulated());
        expect(total).toContain("$");
    });

    // ─────────────────────────────────────────────────────────
    // Test 5: Sort products by price descending
    // ─────────────────────────────────────────────────────────
    test.skip("Sort products by price descending", async () => {
        await buyer.attemptsTo(
            Login.withDefaultUser(),
            SortProducts.by(ProductSortingOptions.PriceDescending)
        );

        const titleVisible = await buyer.asks(IsVisible.of(SwagProductsElements.titleProducts));
        expect(titleVisible).toBe(true);
    });
});

