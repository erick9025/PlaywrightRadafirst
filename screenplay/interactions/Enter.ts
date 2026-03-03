import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Builder for the Enter interaction.
 * Allows a fluent interface: Enter.theValue("text").into(locator)
 */
class EnterBuilder {
    constructor(private readonly text: string) {}

    /**
     * Complete the interaction by specifying the target input locator.
     * Returns a Performable ready to be passed to actor.attemptsTo().
     *
     * Usage:
     *   await actor.attemptsTo(Enter.theValue("standard_user").into(SwagLoginElements.inputUser))
     */
    public into(locator: string, description?: string): Performable {
        const text = this.text;
        const label = description ?? locator;

        return {
            async performAs(actor: Actor): Promise<void> {
                ScreenplayLogger.interactionStart("Enter", label);
                const page = BrowseTheWeb.as(actor).page;
                await page.locator(locator).fill(text);
                ScreenplayLogger.log(`Entered text '${text}' into: ${label}`);
                ScreenplayLogger.interactionEnd("Enter", label);
            }
        };
    }
}

/**
 * Low-level Interaction: type a value into an input field.
 *
 * Usage:
 *   Enter.theValue("standard_user").into(SwagLoginElements.inputUser, "Username [Input]")
 */
export class Enter {
    private constructor() {}

    public static theValue(text: string): EnterBuilder {
        return new EnterBuilder(text);
    }
}
