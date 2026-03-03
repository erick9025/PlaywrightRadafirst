import type { Actor } from "../core/Actor";
import type { Performable } from "../core/Performable";
import { Navigate } from "../interactions/Navigate";
import { Enter } from "../interactions/Enter";
import { Click } from "../interactions/Click";
import { SwagLoginElements } from "../elements/SwagLoginElements";
import { SwagConstants } from "../constants/SwagConstants";
import { ScreenplayLogger } from "../logger/ScreenplayLogger";

/**
 * High-level Task: log into SauceDemo.
 *
 * Usage:
 *   await actor.attemptsTo(Login.withDefaultUser())
 *   await actor.attemptsTo(Login.withCredentials("standard_user", "secret_sauce"))
 */
export class Login implements Performable {
    private constructor(
        private readonly username: string,
        private readonly password: string
    ) {}

    /** Log in using the default standard_user credentials. */
    public static withDefaultUser(): Login {
        return new Login(SwagConstants.userStandard, SwagConstants.correctPassword);
    }

    /** Log in using explicit credentials. */
    public static withCredentials(username: string, password: string): Login {
        return new Login(username, password);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("Login", this.username);

        await actor.attemptsTo(
            Navigate.to(SwagConstants.baseUrl),
            Enter.theValue(this.username).into(SwagLoginElements.inputUser, "Username [Input]"),
            Enter.theValue(this.password).into(SwagLoginElements.inputPassword, "Password [Input]"),
            Click.on(SwagLoginElements.buttonLogin, "Login [Button]")
        );

        ScreenplayLogger.taskEnd("Login", this.username);
    }
}
