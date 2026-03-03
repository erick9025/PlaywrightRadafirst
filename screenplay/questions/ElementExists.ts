import type { Actor } from "../core/Actor";
import type { Question } from "../core/Question";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Question: check whether at least one element matching the locator exists in the DOM.
 *
 * Usage:
 *   const exists = await actor.asks(ElementExists.locatedBy("[data-test='inventory-item']"));
 *   expect(exists).toBe(true);
 */
export class ElementExists implements Question<boolean> {
    private constructor(private readonly locator: string) {}

    public static locatedBy(locator: string): ElementExists {
        return new ElementExists(locator);
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        const page = BrowseTheWeb.as(actor).page;
        return (await page.locator(this.locator).count()) > 0;
    }
}
