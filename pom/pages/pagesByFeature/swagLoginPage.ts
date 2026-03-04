import { Page } from '@playwright/test';
import { SwagParentPage } from "./parent/swagParentPage";
import { TestUtilities } from "../../../utils/testUtilities";
import { Asserts } from "../../../utils/asserts";
import proxymise from "proxymise";

/*
On POM, the application will be splitted into multiples pages (one per screen/functionality/feature)
... each page will have its own:
- Parameters/Attributes
- Locators
- Methods
- Asserts/Validations (expect library) ---------> moved to Asserts class (only the calls here)
- Constants (texts, lists, dictionaries, telephones, etc.)

Original responsibilites: 5
Current responsibilites: 4
*/

export class SwagLoginPage extends SwagParentPage {

    // ******************************************** STATIC PROXYMISE CONSTRUCTOR (0) *****************************************************
    // This method is static now. Necessary for proxymise correct work
    public static initPage(page: Page): SwagLoginPage {
        return new SwagLoginPage(page);
    }

    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************
    // Page is too simple, no need to have a changing attribute here

    // ******************************************** LOCATORS (2) *****************************************************

    // Moved to ElementsSwagLogin class  

    // ******************************************** METHODS (3) *****************************************************
    public async goTo(): Promise<SwagLoginPage> {
        await this.goToURL("https://www.saucedemo.com/");
        return this;
    }

    public async login(user: string = "", password: string = "") : Promise<SwagLoginPage> {

        this.mainMethodStart("login");
        await this.goToURL("https://www.saucedemo.com/");

        // If user not provided, take default, same for password
        if(TestUtilities.isNullOrEmpty(user)) {
            user = this.ConstantsLoginPage.userStandard;
        }

        if(TestUtilities.isNullOrEmpty(password)) {
            password = this.ConstantsLoginPage.correctPassword;
        }

        const headerText: string = await this.returnTextFromElement(this.ElementsSwagLogin.pageHeader, "Page Header [Header Centered]");

        Asserts.assertEquals(this.ConstantsLoginPage.expectedPageHeader, headerText, "Header must be correct");

        await this.enterText(this.ElementsSwagLogin.inputUser, "Username [Input]", user);
        await this.enterText(this.ElementsSwagLogin.inputPassword, "Password [Input]", password);
        await this.click(this.ElementsSwagLogin.buttonLogin, "Login [Button]");

        this.mainMethodEnd("login");
        return this;
    }


    // ******************************************** CONSTANTS (4) *****************************************************
    
    // Moved to ConstantsLoginPage class
}

export default proxymise(SwagLoginPage);