import type { Actor } from "../core/Actor";
import type { Question } from "../core/Question";
import * as utils from "../utils/utils";
import { ProductSortingOptions } from "../../enums/productSortingOptions";
import { SortingOptions } from "../../enums/sortingOptions";
import { Asserts } from "../../asserts/asserts";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Question: check whether a list of products is sorted correctly.
 *
 * Usage:
 *   const sorted = await actor.asks(IsListSortedCorrectly.by(ProductSortingOptions.NameAscending));
 *   expect(sorted).toBe(true);
 */
export class IsListSortedCorrectly implements Question<boolean> {
    private constructor(private readonly sortingOption: ProductSortingOptions, private readonly allTexts: string[]) {}

    public static by(sortingOption: ProductSortingOptions, allTexts: string[]): IsListSortedCorrectly {
        return new IsListSortedCorrectly(sortingOption, allTexts);
    }

    public async answeredBy(actor: Actor): Promise<boolean> {
        let answer: boolean = false;
        let answersList: boolean[] = [];

        const mapSwagEnumToGenericEnum: Record<ProductSortingOptions, SortingOptions> = {
            [ProductSortingOptions.NameAscending]: SortingOptions.AlphabeticAsc,
            [ProductSortingOptions.NameDescending]: SortingOptions.AlphabeticDesc,
            [ProductSortingOptions.PriceAscending]: SortingOptions.NumericAsc,
            [ProductSortingOptions.PriceDescending]: SortingOptions.NumericDesc
        };

        const orderByOptionSelected: SortingOptions = mapSwagEnumToGenericEnum[this.sortingOption];

        switch (orderByOptionSelected) {
            case SortingOptions.AlphabeticAsc:
            case SortingOptions.AlphabeticDesc:
                for (let index = 0; index < this.allTexts.length - 1; index++) {
                    const itemBefore: string = this.allTexts[index];
                    const itemAfter: string = this.allTexts[index + 1];

                    ScreenplayLogger.log(`Comparing alphabetic items: before '${itemBefore}' and after '${itemAfter}' when checking for order ${orderByOptionSelected}'`);

                    const individualAnswer = orderByOptionSelected === SortingOptions.AlphabeticAsc
                        ? itemBefore.localeCompare(itemAfter) <= 0
                        : itemAfter.localeCompare(itemBefore) <= 0;
                    answersList.push(individualAnswer);
                }
                break;
            case SortingOptions.NumericAsc:
            case SortingOptions.NumericDesc:
                for (let index = 0; index < this.allTexts.length - 1; index++) {
                    const itemBefore: number = utils.convertStringToDoubleNumber(this.allTexts[index]);
                    const itemAfter: number = utils.convertStringToDoubleNumber(this.allTexts[index + 1]);

                    ScreenplayLogger.log(`Comparing numeric items: before '${itemBefore}' and after '${itemAfter}' when checking for order ${orderByOptionSelected}'`);

                    const individualAnswer = orderByOptionSelected === SortingOptions.NumericAsc
                        ? itemBefore <= itemAfter
                        : itemAfter <= itemBefore;
                    answersList.push(individualAnswer);
                }
                break;
            default:
                Asserts.assertFail("Invalid sorting option provided: " + orderByOptionSelected);
        }

        answer = answersList.every(item => item === true);

        return answer;
    }
}
