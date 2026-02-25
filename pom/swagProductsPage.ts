import { TestUtilities } from "../utils/testUtilities";
import { BasePage } from "./parent/basePage";
import { Page } from '@playwright/test';
import { Asserts } from "../utils/asserts";
import { ProductSortingOptions } from "../utils/productSortingOptions";
import { SwagDashboardElements } from "./elements/swagProductsElements";
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

export class SwagProductsPage extends BasePage {

    private SwagDashboardElements : SwagDashboardElements;

    // ******************************************** CONSTRUCTOR (0) *****************************************************
    constructor(page: Page) {
        super(page);
        this.SwagDashboardElements = new SwagDashboardElements();
    }

    // ******************************************** PARAMETERS/ATTRIBUTES (1) *****************************************************
    private itemsAlreadyAdded : string[] = [];
    private howManyItemsAlreadyAdded : number = 0;
    
    // ******************************************** LOCATORS (2) *****************************************************

    //Define locators that should return LIST OF elements
    private readonly ListAllAddToCardButtons = "[id*='add-to-cart-']";
    private readonly AllButtonsAddToCart = "[id*='add-to-cart']";
    private readonly ListAllProductsNames = "[data-test='inventory-item-name']";
    private readonly ListAllProductsPrices = ".inventory_item_price";

    //Define locators that should return SINGLE element  
    private readonly TitleProducts : string = ".title";
    private readonly ItemFromCatalogDescriptionXpath = "//*[@data-test='inventory-item-name' and contains(text(),'{{key}}')]";
    private readonly ItemFromCatalogDescriptionCssPW = this.ListAllProductsNames + ":has-text('{{key}}')";
    private readonly ButtonAddToCartItemFromCatalog = this.ItemFromCatalogDescriptionXpath + "/following::button[1]";
    private readonly DdlProductsSort = ".product_sort_container";

    //Try same approach with XPATH and CSS-SELECTOR (only works in PlayWright, not on Chrome or other browsers)
    private readonly DummyItemFromCatalogDescriptionXpath = "//*[@data-test='inventory-item-name' and contains(text(),'Backpack')]";
    private readonly DummyItemFromCatalogDescriptionCssPW = this.ListAllProductsNames + ":has-text('Backpack')";
    

    // ******************************************** METHODS (3) *****************************************************

    public async addProductToCart(wantedProduct : string): Promise<void> {
        
        this.mainMethodStart("addProductToCart", wantedProduct);

        await this.verifyElementIsNotFound("fake.element", "Fake [Dummy Element]", 5); // POC not existing locators is not found

        this.logMessage("Adding to the cart the product: " + wantedProduct);
        const dynamicLocatorLabel : string = TestUtilities.replaceKey(this.ItemFromCatalogDescriptionCssPW, wantedProduct);
        const dynamicLocatorButton : string = TestUtilities.replaceKey(this.ButtonAddToCartItemFromCatalog, wantedProduct);

        await this.islistNotEmpty(this.ListAllAddToCardButtons).then((listIsNotEmpty : boolean) => {
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
        await this.selectDropdownOptionByValue(this.SwagDashboardElements.DdlProductsSort, valueAsStr);

        this.methodEnd("sortProducts", orderBy.toString());
        return this;
    }


    // ******************************************** CONSTANTS (4) *****************************************************


}
