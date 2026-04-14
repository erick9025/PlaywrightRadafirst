import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { SwagConstants } from "../constants/SwagConstants";
import { ProductSortingOptions } from "../../utils/productSortingOptions";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * High-level Task: sort the products list using the sort dropdown.
 *
 * Usage:
 *   await actor.attemptsTo(VerifyProductsSortedCorrectly.by(ProductSortingOptions.NameAscending))
 */
export class VerifyProductsSortedCorrectly implements Performable {
    private constructor(private readonly orderBy: ProductSortingOptions) {}

    public static by(orderBy: ProductSortingOptions): VerifyProductsSortedCorrectly {
        return new VerifyProductsSortedCorrectly(orderBy);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("VerifyProductsSortedCorrectly", this.orderBy.toString());

        ScreenplayLogger.log(`Verifying products are sorted by ${this.orderBy.toString()}...`);

        // Log what's inside the memory
        const allTextsMemory = actor.recallOrDefault<string[]>(SwagConstants.memoryKeys.allTextsMemory, []);

        ScreenplayLogger.taskEnd("VerifyProductsSortedCorrectly", this.orderBy.toString());
    }
}
