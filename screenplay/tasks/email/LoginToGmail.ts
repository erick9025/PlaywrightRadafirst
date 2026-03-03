import type { Actor } from "../../core/Actor";
import type { IEmailTask } from "./IEmailTask";
import { Navigate } from "../../interactions/Navigate";
import { Enter } from "../../interactions/Enter";
import { Click } from "../../interactions/Click";
import { ScreenplayLogger } from "../../logger/ScreenplayLogger";

// Gmail locators (kept inline)
const GmailElements = {
    inputEmail:  "input[type='email']",
    buttonNext:  "div#identifierNext button"
} as const;

/**
 * High-level Task: navigate to Gmail and log in.
 * Note: password entry requires a second page step (handled separately).
 *
 * Usage:
 *   const loginTask: IEmailTask = LoginToGmail.withCredentials(user, pass);
 *   await emailUser.attemptsTo(loginTask);
 */
export class LoginToGmail implements IEmailTask {
    private constructor(
        private readonly user: string,
        private readonly password: string
    ) {}

    public static withCredentials(user: string, password: string): LoginToGmail {
        return new LoginToGmail(user, password);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("LoginToGmail", this.user);

        await actor.attemptsTo(
            Navigate.to("https://accounts.google.com/ServiceLogin?hl=es&service=mail"),
            Enter.theValue(this.user).into(GmailElements.inputEmail, "Email [Input]"),
            Click.on(GmailElements.buttonNext, "Next [Button]")
        );

        ScreenplayLogger.log("Password that will be entered: " + this.password);
        // Note: password step requires waiting for the password screen to load.
        // Extend this task once the full flow is available.

        ScreenplayLogger.taskEnd("LoginToGmail", this.user);
    }
}
