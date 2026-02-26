import { Page } from '@playwright/test';
import { ExecutionParameters } from "../utils/executionParameters";
import { SwagParentPage } from "./parent/swagParentPage";
import { ElementsSwagCart } from "./elements/elementsSwagCart";
import { ConstantsCartPage } from "./constants/constantsCartPage";
import proxymise from "proxymise";

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

export class SwagCartPage extends SwagParentPage {

    // ******************************************** STATIC PROXYMISE CONSTRUCTOR (0) *****************************************************
    // This method is static now. Necessary for proxymise correct work
    public static initPage(page: Page): SwagCartPage {
        return new SwagCartPage(page);
    }

    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************

    // ******************************************** LOCATORS (2) *****************************************************

    // ******************************************** METHODS (3) *****************************************************

    public async goToCart(): Promise<SwagCartPage> {
        
        this.mainMethodStart("goToCart");

        await this.click(this.ElementsSwagCart.IconCart, "Cart [Icon]");
        await this.verifyElementIsVisibleAndContainsText(this.ElementsSwagCart.PageTitle, "Title [Dynamic Label]", "Your Cart", 3_000, false);
    
        this.mainMethodEnd("goToCart");
        return this;
    }

    public async verifyCartTotalIsCorrect(): Promise<SwagCartPage> {
        
        this.mainMethodStart("verifyCartTotalIsCorrect");

        this.logMessage("Total added so far: " + ExecutionParameters.expectedTotal);

        // ToDo Homework
    
        this.mainMethodEnd("verifyCartTotalIsCorrect");
        return this;
    }

    // ******************************************** CONSTANTS (4) *****************************************************


}

export default proxymise(SwagCartPage);