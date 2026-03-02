import { EmailVendor } from "./abstractClasses/emailVendor";

export class GmailPage extends EmailVendor {

    private readonly _inputEmail: string = "input[type='email']";
    private readonly _buttonNext: string = "div#identifierNext button";
    
    public async goTo(): Promise<void> {
        await this.page.waitForTimeout(5_000);
        await this.goToURL("https://accounts.google.com/ServiceLogin?hl=es&service=mail");
    }

    public async login(user: string, password: string) : Promise<void> {
        await this.enterText(this._inputEmail, "Email [Input]", user);
        await this.click(this._buttonNext, "Next [Button]");
        
        this.logMessage("Password that will be entered: " + password);        
    }

    public async openEmail(subject: string, fromEmail: string) : Promise<void> {
        this.logMessage("Will search for an email inside Gmail with partial subject: " + subject + " and email coming from: " + fromEmail);
    }
}