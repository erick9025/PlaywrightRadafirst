import type { Actor } from "../core/Actor";
import type { Question } from "../core/Question";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";

/**
 * Question: check whether an element is currently visible on the page.
 *
 * Usage:
 *   const visible = await actor.asks(IsVisible.of(SwagCartElements.pageTitle));
 *   expect(visible).toBe(true);
 */
export class IsVisible implements Question<boolean> {
    private constructor(private readonly locator: string) {}

    public static of(locator: string): IsVisible {
        return new IsVisible(locator);
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        const page = BrowseTheWeb.as(actor).page;
        return page.locator(this.locator).isVisible();
    }
}
