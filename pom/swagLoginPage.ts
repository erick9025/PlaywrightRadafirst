import { Asserts } from "../utils/asserts";
import { TestUtilities } from "../utils/testUtilities";
import { BasePage } from "./parent/basePage";
import { Page } from '@playwright/test';

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

export class SwagLoginPage extends BasePage {

    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************
    // Page is too simple, no need to have a changing attribute here

    // ******************************************** LOCATORS (2) *****************************************************

    private readonly pageHeader: string = ".login_logo";
    private readonly inputUser: string = "#user-name";
    private readonly inputPassword: string = "#password";
    private readonly buttonLogin: string = "#login-button,.submit-button"; // Sample OR CLAUSE with CSS Selector (comma ',')    

    // ******************************************** METHODS (3) *****************************************************
    public async login(user: string = "", password: string = "") : Promise<void> {

        this.mainMethodStart("login");
        await this.goToURL("https://www.saucedemo.com/");

        // If user not provided, take default, same for password
        if(TestUtilities.isNullOrEmpty(user)) {
            user = this.userStandard;
        }

        if(TestUtilities.isNullOrEmpty(password)) {
            password = this.correctPassword;
        }

        const headerText: string = await this.returnTextFromElement(this.pageHeader, "Page Header [Header Centered]");

        Asserts.assertEquals(this.expectedPageHeader, headerText, "Header must be correct");

        await this.enterText(this.inputUser, "Username [Input]", user);
        await this.enterText(this.inputPassword, "Password [Input]", password);
        await this.click(this.buttonLogin, "Login [Button]");
        this.mainMethodEnd("login");
    }


    // ******************************************** CONSTANTS (4) *****************************************************

    private readonly expectedPageHeader: string = "Swag Labs";

    /*
    Accepted usernames are:
        standard_user
        locked_out_user
        problem_user
        performance_glitch_user
        error_user
        visual_user
    */
    private readonly userStandard: string = "standard_user";

    /*
    Password for all users:
        secret_sauce
    */
    private readonly correctPassword: string = "secret_sauce";
}
