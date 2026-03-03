import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Low-level Interaction: wait for an element to become visible.
 *
 * Usage:
 *   await actor.attemptsTo(WaitFor.elementToBeVisible(SwagCartElements.pageTitle, "Cart Title"))
 */
export class WaitFor implements Performable {
    private constructor(
        private readonly locator: string,
        private readonly description: string,
        private readonly timeoutMs: number
    ) {}

    public static elementToBeVisible(locator: string, description?: string, timeoutMs = 5_000): WaitFor {
        return new WaitFor(locator, description ?? locator, timeoutMs);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.interactionStart("WaitFor", this.description);
        const page = BrowseTheWeb.as(actor).page;
        await page.locator(this.locator).waitFor({ state: "visible", timeout: this.timeoutMs });
        ScreenplayLogger.log(`Element is visible: ${this.description}`);
        ScreenplayLogger.interactionEnd("WaitFor", this.description);
    }
}
