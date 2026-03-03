import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Low-level Interaction: click on an element identified by a CSS/XPath locator.
 *
 * Usage:
 *   await actor.attemptsTo(Click.on(SwagLoginElements.buttonLogin, "Login [Button]"))
 */
export class Click implements Performable {
    private constructor(
        private readonly locator: string,
        private readonly description: string
    ) {}

    public static on(locator: string, description?: string): Click {
        return new Click(locator, description ?? locator);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.interactionStart("Click", this.description);
        const page = BrowseTheWeb.as(actor).page;
        await page.locator(this.locator).click();
        ScreenplayLogger.log(`Clicked on element: ${this.description}`);
        ScreenplayLogger.interactionEnd("Click", this.description);
    }
}
