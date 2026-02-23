import { TestUtilities } from "../utils/testUtilities";
import { BasePage } from "./parent/basePage";
import { Page } from '@playwright/test';

/*
On POM, the application will be splitted into multiples pages (one per screen/functionality/feature)
... each page will have its own:
- Parameters/Attributes
- Locators
- Methods
- Asserts/Validations (expect library) ---------> moved to Asserts class
- Constants (texts, lists, dictionaries, telephones, etc.)

Original responsibilites: 5
Current responsibilites: 4
*/

export class SwagProductsPage extends BasePage {

    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************
    private totalPriceAllItemsAdded: number = 0; // Will be later placed on 'SwagProductsPage'

    // ******************************************** LOCATORS (2) *****************************************************

    private readonly inputUser: string = "aaaa";
    private readonly inputPassword: string = "aaaa";
    private readonly locator3: string = "aaaa";
    private readonly locator4: string = "aaaa";
    private readonly locator5: string = "aaaa";
    private readonly locator6: string = "aaaa";
    private readonly locator7: string = "aaaa";
    private readonly locator8: string = "aaaa";
    

    // ******************************************** METHODS (3) *****************************************************
    public async login(user: string, password: string) : Promise<void> {

        // If user not provided, take default, same for password
        if(TestUtilities.isNullOrEmpty(user)) {
            user = this.userStandard;
        }

        if(TestUtilities.isNullOrEmpty(password)) {
            password = this.correctPassword;
        }


    }


    // ******************************************** CONSTANTS (4) *****************************************************
    private readonly legalMessage: string = "© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy";  // Will be later placed on 'SwagProductsPage'
        
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
