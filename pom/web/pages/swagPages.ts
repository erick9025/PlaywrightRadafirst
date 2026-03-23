import { Page, Browser, BrowserContext } from '@playwright/test';
import { SwagLoginPage} from "./pagesByFeature/swagLoginPage"
import { SwagProductsPage } from './pagesByFeature/swagProductsPage';
import { SwagCartPage } from './pagesByFeature/swagCartPage';
import { Asserts } from '../../../utils/asserts';

export class SwagPages {
    // 3 available page objects for the Swag application, but you can have as many as you need, just add them here and initialize them in the instancePages method at the end of this class
    private _swagLoginPage!: SwagLoginPage;
    private _swagProductsPage!: SwagProductsPage;
    private _swagCartPage!: SwagCartPage; 

    // Another GROUP (will not be instantiated by default, but ON-DEMAND using the method initSecondaryPageBasedOnPage or initSecondaryPageBasedOnContext when needed in the tests, this is useful in case we want to open multiple pages/contexts in the same test, we can initialize them here and then use them in the tests when needed, this way we have a single initialization of all the page objects that can be used across all tests that need them, and we don't have to worry about initializing them multiple times or importing them in each test file. We just need to make sure that any test that imports this baseTestCP.ts file has access to the AllPagesCP object through the custom test object we are exporting at the end of this file, and then it can use any of the page objects initialized here when needed.)
    private _swagLoginPage2!: SwagLoginPage;
    private _swagProductsPage2!: SwagProductsPage;
    private _swagCartPage2!: SwagCartPage; 

    constructor(page: Page) {
        this.SwagLoginPage = new SwagLoginPage(page);
        this.SwagProductsPage = new SwagProductsPage(page);
        this.SwagCartPage = new SwagCartPage(page);
    }

    // Getters and setters for GROUP-1
    public get SwagLoginPage(): SwagLoginPage {
        return this._swagLoginPage;
    }

    private set SwagLoginPage(object: SwagLoginPage) {
        this._swagLoginPage = object;
    }

    public get SwagProductsPage(): SwagProductsPage {
        return this._swagProductsPage;
    }

    private set SwagProductsPage(object: SwagProductsPage) {
        this._swagProductsPage = object;
    }

    public get SwagCartPage(): SwagCartPage {
        return this._swagCartPage;
    }

    private set SwagCartPage(object: SwagCartPage) {
        this._swagCartPage = object;
    }  
    
    // Getters and setters for GROUP-2 (secondary pages in case we want to open multiple pages/contexts in the same test)
    public get SwagLoginPage2(): SwagLoginPage {
        return this._swagLoginPage2;
    }

    private set SwagLoginPage2(object: SwagLoginPage) {
        this._swagLoginPage2 = object;
    }

    public get SwagProductsPage2(): SwagProductsPage {
        return this._swagProductsPage2;
    }

    private set SwagProductsPage2(object: SwagProductsPage) {
        this._swagProductsPage2 = object;
    }

    public get SwagCartPage2(): SwagCartPage {
        return this._swagCartPage2;
    }

    private set SwagCartPage2(object: SwagCartPage) {
        this._swagCartPage2 = object;
    }

    // More methods
    public async resetAllPagesWithFreshContext(browser: Browser): Promise<void> {
        const freshContext: BrowserContext = await browser.newContext();
        const freshPage: Page = await freshContext.newPage();
        await freshPage.setViewportSize({ width: 1920, height: 1080 });

        // Reset all the page objects with the new page from the fresh context, this is useful in case we want to start a test with a fresh context and we want to make sure that all the page objects are using the new page from the fresh context, ...
        // ...this way we can avoid any issues that might arise from using an old page that might have some state or cookies that we don't want in our new test. Or leaving the previous user logged in
        this.SwagLoginPage = new SwagLoginPage(freshPage);
        this.SwagProductsPage = new SwagProductsPage(freshPage);
        this.SwagCartPage = new SwagCartPage(freshPage);
    }

    // Use Generics to initialize the secondary page objects when needed (THIS IS THE ONE ACTUALLY USED IN THE TESTS)
    public async initSecondaryPageBasedOnPage<T>(anotherPage: Page, classModel: new (pageOrContext: Page) => T): Promise<void> {
        // Define the class name as a string variable to be used in the switch case
        const classAsStringFromT: string = classModel.name; // Get the class name as a string from the constructor
        this.instanceObjectAccordingly(anotherPage, classAsStringFromT);
    }

    // Use Generics to initialize the secondary page objects when needed (TO USE THIS WE NEED ANOTHER SET OF PAGES THAT HAVE CONSTRUTOR BASED ON CONTEXT, NOT PAGE)
    public async initSecondaryPageBasedOnContext<T>(anotherContext: BrowserContext, classModel: new (pageOrContext: BrowserContext) => T): Promise<void> {
        // Define the class name as a string variable to be used in the switch case
        const classAsStringFromT: string = classModel.name; // Get the class name as a string from the constructor
        const localNewPage: Page = await anotherContext.newPage(); // Create a new page from the context to be used in the page object initialization
        this.instanceObjectAccordingly(localNewPage, classAsStringFromT);
    }

    private instanceObjectAccordingly(pwObjectPage: Page, classAsStringFromT: string): void {
        // Define the class name as a string variable to be used in the switch case, we can use the name of the class as a string 
        // (e.g. if received CPAccountsPage inside <>, then instance the AccountsPage2 object, 
        // if received CPAddressBookPage inside <>, then instance the AddressBookPage2 object, etc.)
        switch (classAsStringFromT) {
            case 'SwagLoginPage':
                this.SwagLoginPage2 = new SwagLoginPage(pwObjectPage);
                break;
            case 'SwagProductsPage':
                this.SwagProductsPage2 = new SwagProductsPage(pwObjectPage);
                break;
            case 'SwagCartPage':
                this.SwagCartPage2 = new SwagCartPage(pwObjectPage);
                break;
            default:
                Asserts.assertFail(`The class name '${classAsStringFromT}' does not match any of the defined page objects in the switch case. Please make sure to add a case for this class in the switch statement.`);
        }
    }
}