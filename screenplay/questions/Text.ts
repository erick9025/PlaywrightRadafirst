import type { Actor } from "../core/Actor";
import type { Question } from "../core/Question";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Question: retrieve the visible text of an element.
 *
 * Usage:
 *   const headerText = await actor.asks(Text.of(SwagLoginElements.pageHeader));
 *   expect(headerText).toContain("Swag Labs");
 */
export class Text implements Question<string> {
    private constructor(private readonly locator: string) {}

    public static of(locator: string): Text {
        return new Text(locator);
    }

    public async answeredBy(actor: Actor): Promise<string> {
        const page = BrowseTheWeb.as(actor).page;
        return (await page.locator(this.locator).textContent()) ?? "";
    }
}
