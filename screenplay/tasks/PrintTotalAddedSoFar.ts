import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { SwagConstants } from "../constants/SwagConstants";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * High-level Task: print the accumulated cart total from the actor's memory.
 * Does not interact with the browser — purely logs a summary.
 *
 * Usage:
 *   await actor.attemptsTo(PrintTotalAddedSoFar.now())
 */
export class PrintTotalAddedSoFar implements Performable {
    private constructor() {}

    public static now(): PrintTotalAddedSoFar {
        return new PrintTotalAddedSoFar();
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("PrintTotalAddedSoFar");

        const total = actor.recallOrDefault<number>(SwagConstants.memoryKeys.cartTotal, 0);
        ScreenplayLogger.logImportant("Total $ so far: " + ScreenplayLogger.formatCurrency(total));

        ScreenplayLogger.taskEnd("PrintTotalAddedSoFar");
    }
}
