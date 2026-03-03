import type { Actor } from "./Actor";

/**
 * Anything an Actor can attempt: a low-level Interaction or a
 * high-level Task composed of multiple Interactions.
 */
export interface Performable {
    performAs(actor: Actor): Promise<void>;
}
