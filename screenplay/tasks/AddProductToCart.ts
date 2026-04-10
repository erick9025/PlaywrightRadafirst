import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { SwagProductsElements } from "../elements/SwagProductsElements";
import { SwagConstants } from "../constants/SwagConstants";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";
import { Page } from "@playwright/test";
//import type Page  from "@playwright/test";
import * as utils from "../utils/utils";

/**
 * High-level Task: add a product to the cart by its display name.
 *
 * Tracks the accumulated cart total in the actor's memory under
 * SwagConstants.memoryKeys.cartTotal. Skips silently if the item
 * was already added (button already shows "Remove").
 *
 * Usage:
 *   await actor.attemptsTo(AddProductToCart.named("Sauce Labs Backpack"))
 */
export class AddProductToCart implements Performable {
    private constructor(private readonly productName: string) {}

    public static named(productName: string): AddProductToCart {
        return new AddProductToCart(productName);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("AddProductToCart", this.productName);

        const page: Page = BrowseTheWeb.as(actor).page;

        ScreenplayLogger.log("Current existing products for sale:");
        SwagConstants.existingProducts.forEach(p => ScreenplayLogger.log("..." + p));
        ScreenplayLogger.log("Adding to the cart the product: " + this.productName);

        const labelLocator: string  = utils.resolveLocator(SwagProductsElements.itemFromCatalogDescriptionCssPW, this.productName);
        const buttonLocator: string = utils.resolveLocator(SwagProductsElements.buttonAddToCartItemFromCatalog, this.productName);

        // Verify the product label is visible
        await page.locator(labelLocator).waitFor({ state: "visible" });

        // Check current button state
        const btnText: string = await page.locator(buttonLocator).innerText();

        if (btnText.trim() === "Remove") {
            ScreenplayLogger.log(`Item was already added: ${this.productName} — skipping`);
            ScreenplayLogger.taskEnd("AddProductToCart", this.productName + " (already added)");
            return;
        }

        // Click "Add to cart"
        await page.locator(buttonLocator).click();
        ScreenplayLogger.log(`Clicked 'Add to cart' for: ${this.productName}`);

        // Read product price and accumulate in actor memory
        const priceLocator: string = utils.resolveLocator(SwagProductsElements.itemPriceLocator, this.productName);
        const priceText: string    = await page.locator(priceLocator).innerText();
        const price: number        = utils.getNumericValue(
            utils.getTextAfter(priceText, "$")
        );

        ScreenplayLogger.logBold(`'${this.productName}' price: $${price}`);

        const currentTotal = actor.recallOrDefault<number>(SwagConstants.memoryKeys.cartTotal, 0); // tengo 20 pesos
        actor.remember(SwagConstants.memoryKeys.cartTotal, currentTotal + price); // agrego los 5 pesos que me encontré a is 20 pesos, y termino teniendo 25

        // Verify button changed to "Remove"
        const btnTextAfter = await page.locator(buttonLocator).innerText();
        if (btnTextAfter.trim() !== "Remove") {
            ScreenplayLogger.logWarning(`Expected button to show 'Remove' after adding '${this.productName}', but got: '${btnTextAfter}'`);
        }

        ScreenplayLogger.taskEnd("AddProductToCart", this.productName);
    }
}
