import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";
import { SwagConstants } from "../constants/SwagConstants";

/**
 * Low-level Interaction: click on an element identified by a CSS/XPath locator.
 *
 * Usage:
 *   await actor.attemptsTo(Click.on(SwagLoginElements.buttonLogin, "Login [Button]"))
 */
export class StoreListText implements Performable {
    private constructor(
        private readonly locator: string,
        private readonly description: string
    ) {}

    public static from(locator: string, description?: string): StoreListText {
        return new StoreListText(locator, description ?? locator);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.interactionStart("StoreListText", this.description);
        const page = BrowseTheWeb.as(actor).page;
        const allTexts: string[] = await page.locator(this.locator).allInnerTexts();

        // Save into memory
        const allTextsMemory = actor.recallOrDefault<string[]>(SwagConstants.memoryKeys.allTextsMemory, []);
        actor.remember(SwagConstants.memoryKeys.allTextsMemory, [...allTextsMemory, ...allTexts]);

        ScreenplayLogger.log(`Texts from element: ${this.description}: ${allTexts.join(", ")}`);
        ScreenplayLogger.interactionEnd("StoreListText", this.description);
    }
}
