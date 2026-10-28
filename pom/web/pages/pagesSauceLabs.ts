import { Page, Browser, BrowserContext } from '@playwright/test';
import { SwagLoginPage} from "./pagesByFeature/swagLoginPage"
import { SwagProductsPage } from './pagesByFeature/swagProductsPage';
import { SwagCartPage } from './pagesByFeature/swagCartPage';

export class PagesSauceLabs {
    // 3 available page objects for the Swag application, but you can have as many as you need, just add them here and initialize them in the instancePages method at the end of this class
    private _swagLoginPage!: SwagLoginPage;
    private _swagProductsPage!: SwagProductsPage;
    private _swagCartPage!: SwagCartPage; 

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
}
