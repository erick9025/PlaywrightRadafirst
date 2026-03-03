import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Builder for the Select interaction.
 * Allows a fluent interface: Select.theOption("az").from(locator)
 */
class SelectBuilder {
    constructor(private readonly value: string) {}

    /**
     * Complete the interaction by specifying the target dropdown locator.
     *
     * Usage:
     *   await actor.attemptsTo(Select.theOption("az").from(SwagProductsElements.ddlProductsSort, "Sort Dropdown"))
     */
    public from(locator: string, description?: string): Performable {
        const value = this.value;
        const label = description ?? locator;

        return {
            async performAs(actor: Actor): Promise<void> {
                ScreenplayLogger.interactionStart("Select", `${value} from ${label}`);
                const page = BrowseTheWeb.as(actor).page;
                await page.locator(locator).selectOption({ value });
                ScreenplayLogger.log(`Selected option '${value}' from: ${label}`);
                ScreenplayLogger.interactionEnd("Select", `${value} from ${label}`);
            }
        };
    }
}

/**
 * Low-level Interaction: select a dropdown option by its value attribute.
 *
 * Usage:
 *   Select.theOption("az").from(SwagProductsElements.ddlProductsSort, "Sort Dropdown")
 */
export class Select {
    private constructor() {}

    public static theOption(value: string): SelectBuilder {
        return new SelectBuilder(value);
    }
}
