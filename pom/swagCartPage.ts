import { Page } from '@playwright/test';
import { ExecutionParameters } from "../utils/executionParameters";
import { SwagParentPage } from "./parent/swagParentPage";
import { ElementsSwagCart } from "./elements/elementsSwagCart";
import { ConstantsCartPage } from "./constants/constantsCartPage";

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

export class SwagCartPage extends SwagParentPage<ElementsSwagCart, ConstantsCartPage> {


    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    protected createElements(): ElementsSwagCart {
        return new ElementsSwagCart();
    }

    protected createConstants(): ConstantsCartPage {
        return new ConstantsCartPage();
    }

    protected get ElementsSwagCart(): ElementsSwagCart {
        return this.elements;
    }

    protected get ConstantsCartPage(): ConstantsCartPage {
        return this.constants;
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************

    // ******************************************** LOCATORS (2) *****************************************************

    // ******************************************** METHODS (3) *****************************************************

    public async goToCart(): Promise<void> {
        
        this.mainMethodStart("goToCart");

        await this.click(this.ElementsSwagCart.IconCart, "Cart [Icon]");
        await this.verifyElementIsVisibleAndContainsText(this.ElementsSwagCart.PageTitle, "Title [Dynamic Label]", "Your Cart", 3_000, false);
    
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
