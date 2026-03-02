import { IEmailProvider } from "../interfaces/iEmailProvider";
import { IOpenable } from "../interfaces/iOpenable";
import { ILoginService } from "../interfaces/iLoginService";
import { BasePage } from "../../pagesByFeature/parent/basePage";

export abstract class EmailVendor extends BasePage implements IEmailProvider, IOpenable, ILoginService {
    public abstract goTo(): Promise<void>;

    public abstract login(user: string, password: string) : Promise<void>;

    public abstract openEmail(subject: string, fromEmail: string) : Promise<void>;
    
}