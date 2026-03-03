import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { Select } from "../interactions/Select";
import { SwagProductsElements } from "../elements/SwagProductsElements";
import { ProductSortingOptions } from "../../utils/productSortingOptions";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * High-level Task: sort the products list using the sort dropdown.
 *
 * Usage:
 *   await actor.attemptsTo(SortProducts.by(ProductSortingOptions.NameAscending))
 */
export class SortProducts implements Performable {
    private constructor(private readonly orderBy: ProductSortingOptions) {}

    public static by(orderBy: ProductSortingOptions): SortProducts {
        return new SortProducts(orderBy);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("SortProducts", this.orderBy.toString());

        const sortingMap: Record<ProductSortingOptions, string> = {
            [ProductSortingOptions.NameAscending]:  "az",
            [ProductSortingOptions.NameDescending]: "za",
            [ProductSortingOptions.PriceAscending]: "lohi",
            [ProductSortingOptions.PriceDescending]:"hilo"
        };

        const value = sortingMap[this.orderBy];

        await actor.attemptsTo(
            Select.theOption(value).from(
                SwagProductsElements.ddlProductsSort,
                "Sort Products [Dropdown]"
            )
        );

        ScreenplayLogger.taskEnd("SortProducts", this.orderBy.toString());
    }
}
