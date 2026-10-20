import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { expect } from "@playwright/test";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { Click } from "../interactions/Click";
import { SwagCartElements } from "../elements/SwagCartElements";
import { SwagConstants } from "../constants/SwagConstants";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * High-level Task: navigate to the shopping cart.
 * Clicks the cart icon and waits for the "Your Cart" title to appear.
 *
 * Usage:
 *   await actor.attemptsTo(GoToCart.now())
 */
export class GoToCart implements Performable {
    private constructor() {}

    public static now(): GoToCart {
        return new GoToCart();
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("GoToCart");

        await actor.attemptsTo(Click.on(SwagCartElements.iconCart, "Cart [Icon]"));

        // `.title` is also visible on the inventory page, so wait for its cart
        // text rather than visibility alone (which could pass before navigation).
        const page = BrowseTheWeb.as(actor).page;
        await expect(page.locator(SwagCartElements.pageTitle)).toHaveText(
            SwagConstants.expectedCartTitle,
            { timeout: 3_000 }
        );

        ScreenplayLogger.taskEnd("GoToCart");
    }
}
