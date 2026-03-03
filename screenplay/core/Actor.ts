import type { Ability } from "./Ability";
import type { Performable } from "./Performable";
import type { Question } from "./Question";

/**
 * The central concept of the Screenplay Pattern.
 *
 * An Actor:
 *  - Has a name (for logging and error messages)
 *  - Holds Abilities (e.g. BrowseTheWeb)
 *  - Attempts Tasks and Interactions via attemptsTo()
 *  - Answers Questions about system state via asks()
 *  - Remembers typed state across tasks via remember()/recall()
 */
export class Actor {
    private readonly _name: string;
    private readonly _abilities: Map<string, Ability> = new Map();

    // Typed key-value memory — replaces ExecutionParameters static state.
    // Scoped to this actor instance (safe for parallel test workers).
    private readonly _memory: Map<string, unknown> = new Map();

    private constructor(name: string) {
        this._name = name;
    }

    // ----- Factory -----

    public static named(name: string): Actor {
        return new Actor(name);
    }

    // ----- Identity -----

    public get name(): string {
        return this._name;
    }

    // ----- Abilities -----

    /**
     * Grant one or more abilities to this actor.
     * Usage: Actor.named("Buyer").whoCan(BrowseTheWeb.using(page))
     */
    public whoCan(...abilities: Ability[]): Actor {
        for (const ability of abilities) {
            this._abilities.set(ability.constructor.name, ability);
        }
        return this;
    }

    /**
     * Retrieve a previously granted ability by its class constructor.
     * Throws if the ability was not granted.
     *
     * Prefer using the static helper on the ability itself:
     *   BrowseTheWeb.as(actor)  →  actor.abilityTo(BrowseTheWeb)
     */
    public abilityTo<T extends Ability>(abilityClass: new (...args: any[]) => T): T {
        const instance = this._abilities.get(abilityClass.name);
        if (!instance) {
            throw new Error(
                `Actor '${this._name}' does not have the ability '${abilityClass.name}'. ` +
                `Did you call actor.whoCan(${abilityClass.name}.using(...))?`
            );
        }
        return instance as T;
    }

    // ----- Tasks & Interactions -----

    /**
     * Execute one or more Performables sequentially.
     * Usage: await actor.attemptsTo(Login.withDefaultUser(), AddProductToCart.named("Backpack"))
     */
    public async attemptsTo(...performables: Performable[]): Promise<void> {
        for (const performable of performables) {
            await performable.performAs(this);
        }
    }

    // ----- Questions -----

    /**
     * Ask a Question and get a typed answer back.
     * Usage: const text = await actor.asks(Text.of(SwagLoginElements.pageHeader))
     */
    public async asks<T>(question: Question<T>): Promise<T> {
        return question.answeredBy(this);
    }

    // ----- Memory -----

    /**
     * Store a value in the actor's memory under a string key.
     * Usage: actor.remember("cartTotal", 0)
     */
    public remember<T>(key: string, value: T): void {
        this._memory.set(key, value);
    }

    /**
     * Retrieve a previously stored value.
     * Throws if key was never set (programmer error protection).
     * Usage: actor.recall<number>("cartTotal")
     */
    public recall<T>(key: string): T {
        if (!this._memory.has(key)) {
            throw new Error(
                `Actor '${this._name}' has no memory of '${key}'. ` +
                `Did you call actor.remember('${key}', ...) first?`
            );
        }
        return this._memory.get(key) as T;
    }

    /**
     * Retrieve a value, returning a default if the key was never set.
     * Useful for accumulator patterns like cart total.
     * Usage: actor.recallOrDefault<number>("cartTotal", 0)
     */
    public recallOrDefault<T>(key: string, defaultValue: T): T {
        if (!this._memory.has(key)) {
            return defaultValue;
        }
        return this._memory.get(key) as T;
    }
}
