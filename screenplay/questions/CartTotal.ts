import type { Actor } from "../core/Actor";
import type { Question } from "../core/Question";
import { SwagConstants } from "../constants/SwagConstants";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * Question: retrieve the accumulated cart total that was tracked in the actor's memory
 * as products were added via AddProductToCart tasks.
 *
 * Returns the total formatted as a USD currency string (e.g. "$49.98").
 *
 * Usage:
 *   const total = await actor.asks(CartTotal.accumulated());
 *   expect(total).toBe("$49.98");
 */
export class CartTotal implements Question<string> {
    private constructor() {}

    public static accumulated(): CartTotal {
        return new CartTotal();
    }

    public async answeredBy(actor: Actor): Promise<string> {
        const total = actor.recallOrDefault<number>(SwagConstants.memoryKeys.cartTotal, 0);
        return ScreenplayLogger.formatCurrency(total);
    }
}
