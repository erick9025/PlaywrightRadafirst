import type { Actor } from "../core/Actor";
import type { Question } from "../core/Question";
import { BrowseTheWeb } from "../abilities/BrowseTheWeb";
import { SwagProductsElements } from "../elements/SwagProductsElements";
import { ProductSortingOptions } from "../../utils/productSortingOptions";

/**
 * Question: read the displayed product values used to verify a selected sort.
 * Name sorts read product names; price sorts read the displayed currency values.
 */
export class ProductSortOrder implements Question<string[]> {
    private constructor(private readonly sortingOption: ProductSortingOptions) {}

    public static for(sortingOption: ProductSortingOptions): ProductSortOrder {
        return new ProductSortOrder(sortingOption);
    }

    public async answeredBy(actor: Actor): Promise<string[]> {
        const page = BrowseTheWeb.as(actor).page;
        const isNameSort: boolean =
            this.sortingOption === ProductSortingOptions.NameAscending ||
            this.sortingOption === ProductSortingOptions.NameDescending;
        const referenceLocator: string = isNameSort
            ? SwagProductsElements.listAllProductsNames
            : SwagProductsElements.listAllProductsPrices;

        const values: string[] = await page.locator(referenceLocator).allTextContents();
        return values.map((value) => value.trim()); // LAMBDA FUNCTION: Trim whitespace from each value before returning
    }
}
