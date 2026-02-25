import { Page } from '@playwright/test';
import { SwagParentPage } from "./parent/swagParentPage";
import { ExecutionParameters } from "../utils/executionParameters";
import { TestUtilities } from "../utils/testUtilities";
import { Asserts } from "../utils/asserts";
import { ProductSortingOptions } from "../utils/productSortingOptions";

/*
On POM, the application will be splitted into multiples pages (one per screen/functionality/feature)
... each page will have its own:
- Parameters/Attributes ---> should remain here
- Locators ---------> moved to Elements class
- Methods  ---> should remain here
- Asserts/Validations (expect library) ---------> moved to Asserts class
- Constants (texts, lists, dictionaries, telephones, etc.)  ---------> moved to Constants class

Original responsibilites: 5
Current responsibilites: 2
*/

export class SwagProductsPage extends SwagParentPage {

    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************
    private itemsAlreadyAdded : string[] = [];
    private howManyItemsAlreadyAdded : number = 0;
    
    // ******************************************** LOCATORS (2) *****************************************************

    // moved to another class
    

    // ******************************************** METHODS (3) *****************************************************

    public async addProductToCart(wantedProduct : string): Promise<void> {
        
        this.mainMethodStart("addProductToCart", wantedProduct);

        this.logMessage("Current existing products for sale:");
        this.ConstantsProductsPage.existingProducts.forEach(product => {
            this.logMessage("..." + product);
        });

        await this.verifyElementIsNotFound("fake.element", "Fake [Dummy Element]", 5); // POC not existing locators is not found

        this.logMessage("Adding to the cart the product: " + wantedProduct);
        const dynamicLocatorLabel : string = TestUtilities.replaceKey(this.ElementsSwagProducts.ItemFromCatalogDescriptionCssPW, wantedProduct);
        const dynamicLocatorButton : string = TestUtilities.replaceKey(this.ElementsSwagProducts.ButtonAddToCartItemFromCatalog, wantedProduct);

        await this.islistNotEmpty(this.ElementsSwagProducts.ListAllAddToCardButtons).then((listIsNotEmpty : boolean) => {
            Asserts.assertTrue(listIsNotEmpty, "List of buttons is not empty");
        });
                    
        await this.verifyElementIsVisible(dynamicLocatorLabel, wantedProduct + " [Product from Catalog]");
        await this.verifyElementIsVisible(dynamicLocatorButton, "Add to cart [Button from " + wantedProduct + "]");

        let btnTextBefore = await this.returnTextFromElement(dynamicLocatorButton, "Add to cart [Button from " + wantedProduct + "]");

        if(btnTextBefore === "Remove") {
            this.logMessage("Item was already added: " + wantedProduct);
            this.methodEnd("addProductToCart", "Was already added: " + wantedProduct);
            return;
        }

        Asserts.assertEquals(btnTextBefore, "Add to cart", "Button text is correct before click");

        await this.click(dynamicLocatorButton, "Add to cart [Button from " + wantedProduct + "]");
        this.howManyItemsAlreadyAdded++;
        this.itemsAlreadyAdded.push(wantedProduct);

        const priceLocator : string = TestUtilities.replaceKeyName("//div[@class='inventory_item' and contains(.,'{{itemName}}')]//child::*[@class='inventory_item_price']", "itemName", wantedProduct);
        const correspondingPriceStr : string = await this.returnTextFromElement(priceLocator, `'${wantedProduct}' price [Dynamic $ value]`);
        const correspondingPrice : number = TestUtilities.getNumericValue(TestUtilities.getTextAfter(correspondingPriceStr, "$"));

        this.infoBold(`'${wantedProduct}' price: $${correspondingPrice}`);
        ExecutionParameters.expectedTotal += correspondingPrice;

        let btnTextAfter = await this.returnTextFromElement(dynamicLocatorButton, "Add to cart [Button from " + wantedProduct + "]");
        Asserts.assertEquals(btnTextAfter, "Remove", "Button text is correct after click");
    
        this.mainMethodEnd("addProductToCart", wantedProduct);
    }

    public async printTotalAddedSoFar(): Promise<void> {        
        this.mainMethodStart("printTotalAddedSoFar");

        this.infoImportant("Total $ so far: " + TestUtilities.formatCurrency(ExecutionParameters.expectedTotal));

        this.methodEnd("printTotalAddedSoFar");
    }
    
    // ToDo HOMEWORK fix below method (from repo 'PlaywrightProxymise' > SwagDashboardPage to 'PlaywrightRadafirst' > SwagProductsPage)
    public async sortProducts(orderBy : ProductSortingOptions) : Promise<SwagProductsPage> {
        let valueAsStr : string = "";
        this.methodStart("sortProducts", orderBy.toString());

        //await this.page.waitForTimeout(800); //JUST FOR DEBUGGING PURPOSES
        
        const sortingMap: Record<ProductSortingOptions, string> = {
            [ProductSortingOptions.NameAscending]: "az",
            [ProductSortingOptions.NameDescending]: "za",
            [ProductSortingOptions.PriceAscending]: "lohi",
            [ProductSortingOptions.PriceDescending]: "hilo"
          };
          
        valueAsStr = sortingMap[orderBy];

        //Encapsulate into base page
        await this.selectDropdownOptionByValue(this.ElementsSwagProducts.DdlProductsSort, valueAsStr);

        this.methodEnd("sortProducts", orderBy.toString());
        return this;
    }

    public step1() : SwagProductsPage {
        this.logMessage("Doing step 1");
        return this;
    }

    public step2() : SwagProductsPage {
        this.logMessage("Doing step 2");
        return this;
    }

    public step3() : SwagProductsPage {
        this.logMessage("Doing step 3");
        return this;
    }

    public step4() : SwagProductsPage {
        this.logMessage("Doing step 4");
        return this;
    }

    // ******************************************** CONSTANTS (4) *****************************************************
    
    // moved to a separate class

    // ******************************************** ASSERTS (5) *****************************************************
    
    // calls are here but logic is performed on Asserts.ts class
}
