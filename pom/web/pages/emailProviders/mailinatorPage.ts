import { IEmailProvider } from "./interfaces/iEmailProvider";
import { BasePage } from "../pagesByFeature/parent/basePage";
import { TestUtilities } from "../../../utils/testUtilities";

export class MailinatorPage extends BasePage implements IEmailProvider {

    private readonly _inputEmail: string = "#many_login_email";
    private readonly _inputPassword: string = "#many_login_password";
    private readonly _buttonLogIn: string = "a.submit";

    public async goTo(): Promise<void> {
        await this.page.waitForTimeout(5_000);
        await this.goToURL("https://www.mailinator.com/v4/login.jsp");
    }

    public async login(user: string, password: string) : Promise<void> {
        await this.enterText(this._inputEmail, "Email [Input]", user);
        await this.enterText(this._inputPassword, "Email [Input]", password);
        await this.click(this._buttonLogIn, "Log in [Button]");
    }

    public async openEmail(subject: string, fromEmail: string) : Promise<void> {
        this.logMessage("Will search for an email inside Mailinator with partial subject: " + subject);

        if(!TestUtilities.isNullOrEmpty(fromEmail)) {
            this.logMessage("Email also have to come from: " + fromEmail);
        }
        else {
            this.logMessage("Email can come from anyone");
        }
    }
}