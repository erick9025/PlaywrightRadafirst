import type { Actor } from "../../core/Actor";
import type { IEmailTask } from "./IEmailTask";
import { Navigate } from "../../interactions/Navigate";
import { Enter } from "../../interactions/Enter";
import { Click } from "../../interactions/Click";
import { ScreenplayLogger } from "../../logger/ScreenplayLogger";

// Mailinator locators (kept inline — no shared page object needed)
const MailinatorElements = {
    inputEmail:    "#many_login_email",
    inputPassword: "#many_login_password",
    buttonLogIn:   "a.submit"
} as const;

/**
 * High-level Task: navigate to Mailinator and log in.
 *
 * Usage:
 *   const loginTask: IEmailTask = LoginToMailinator.withCredentials(user, pass);
 *   await emailUser.attemptsTo(loginTask);
 */
export class LoginToMailinator implements IEmailTask {
    private constructor(
        private readonly user: string,
        private readonly password: string
    ) {}

    public static withCredentials(user: string, password: string): LoginToMailinator {
        return new LoginToMailinator(user, password);
    }

    public async performAs(actor: Actor): Promise<void> {
        ScreenplayLogger.taskStart("LoginToMailinator", this.user);

        await actor.attemptsTo(
            Navigate.to("https://www.mailinator.com/v4/login.jsp"),
            Enter.theValue(this.user).into(MailinatorElements.inputEmail, "Email [Input]"),
            Enter.theValue(this.password).into(MailinatorElements.inputPassword, "Password [Input]"),
            Click.on(MailinatorElements.buttonLogIn, "Log in [Button]")
        );

        ScreenplayLogger.taskEnd("LoginToMailinator", this.user);
    }
}
