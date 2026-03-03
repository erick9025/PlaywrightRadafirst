import type { Actor } from "./Actor";

/**
 * A Question queries the system state and returns a typed answer.
 * It never changes state — it only reads.
 *
 * T is the answer type, e.g. string, boolean, number.
 */
export interface Question<T> {
    answeredBy(actor: Actor): Promise<T>;
}
