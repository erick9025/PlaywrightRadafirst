import { Page } from "@playwright/test";
import type { Ability } from "../core/Ability";
import type { Actor } from "../core/Actor";

/**
 * The core browser ability. Wraps a Playwright Page.
 * Every Interaction that needs the browser retrieves it through this ability.
 *
 * Usage:
 *   const buyer = Actor.named("Buyer").whoCan(BrowseTheWeb.using(page));
 *   const page  = BrowseTheWeb.as(buyer).page;
 */
export class BrowseTheWeb implements Ability {
    private readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    // ----- Factory -----

    /** Grant this ability backed by a specific Playwright page. */
    public static using(page: Page): BrowseTheWeb {
        return new BrowseTheWeb(page);
    }

    // ----- Retrieval (used inside Interactions) -----

    /** Retrieve BrowseTheWeb from an actor's ability set. */
    public static as(actor: Actor): BrowseTheWeb {
        return actor.abilityTo(BrowseTheWeb);
    }

    // ----- Page access -----

    public get page(): Page {
        return this._page;
    }
}
