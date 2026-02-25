import { TestUtilities } from "../utils/testUtilities";
import { BasePage } from "./parent/basePage";
import { Page } from '@playwright/test';
import { Asserts } from "../utils/asserts";
import { ExecutionParameters } from "../utils/executionParameters";

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

export class SwagCartPage extends BasePage {


    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************

    // ******************************************** LOCATORS (2) *****************************************************

    //Define locators that should return LIST OF elements
    private readonly IconCart: string = "a.shopping_cart_link";
    private readonly PageTitle: string = ".title";  

    // ******************************************** METHODS (3) *****************************************************

    public async goToCart(): Promise<void> {
        
        this.mainMethodStart("goToCart");

        await this.click(this.IconCart, "Cart [Icon]");
        await this.verifyElementIsVisibleAndContainsText(this.PageTitle, "Title [Dynamic Label]", "Your Cart", 3_000, false);
    
        this.mainMethodEnd("goToCart");
    }

    public async verifyCartTotalIsCorrect(): Promise<void> {
        
        this.mainMethodStart("verifyCartTotalIsCorrect");

        this.logMessage("Total added so far: " + ExecutionParameters.expectedTotal);

        // ToDo Homework
    
        this.mainMethodEnd("verifyCartTotalIsCorrect");
    }

    // ******************************************** CONSTANTS (4) *****************************************************


}
