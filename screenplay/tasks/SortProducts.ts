import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { Select } from "../interactions/Select";
import { StoreListText } from "../interactions/StoreListText";
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
        let locatorTexts: string;
        let description: string;

        switch (this.orderBy) {
            case ProductSortingOptions.NameAscending:
            case ProductSortingOptions.NameDescending:
                locatorTexts = SwagProductsElements.listAllProductsNames;
                description = "Product Names";
                break;
            case ProductSortingOptions.PriceAscending:
            case ProductSortingOptions.PriceDescending:
                locatorTexts = SwagProductsElements.listAllProductsPrices;
                description = "Product Prices";
                break;
        }

        await actor.attemptsTo(
            Select.theOption(value).from(
                SwagProductsElements.ddlProductsSort,
                "Sort Products [Dropdown]"
            ),
            StoreListText.from(locatorTexts, description)
        );

        ScreenplayLogger.taskEnd("SortProducts", this.orderBy.toString());
    }
}
