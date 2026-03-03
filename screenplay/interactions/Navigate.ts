import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Low-level Interaction: navigate the browser to a URL.
 *
 * Usage:
 *   await actor.attemptsTo(Navigate.to("https://www.saucedemo.com/"))
 */
export class Navigate implements Performable {
    private constructor(private readonly url: string) {}

    public static to(url: string): Navigate {
        return new Navigate(url);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.interactionStart("Navigate", this.url);
        const page = BrowseTheWeb.as(actor).page;
        await page.goto(this.url);
        ScreenplayLogger.interactionEnd("Navigate", this.url);
    }
}
