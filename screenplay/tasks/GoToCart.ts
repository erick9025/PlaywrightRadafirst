import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { Click } from "../interactions/Click";
import { WaitFor } from "../interactions/WaitFor";
import { SwagCartElements } from "../elements/SwagCartElements";
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

        await actor.attemptsTo(
            Click.on(SwagCartElements.iconCart, "Cart [Icon]"),
            WaitFor.elementToBeVisible(SwagCartElements.pageTitle, "Your Cart [Title]", 3_000)
        );

        ScreenplayLogger.taskEnd("GoToCart");
    }
}
