import { Page } from '@playwright/test';

// Proxymise requires DEFAULT imports
import SwagLoginPage  from "./pagesByFeature/swagLoginPage"
import SwagProductsPage from './pagesByFeature/swagProductsPage';
import SwagCartPage from './pagesByFeature/swagCartPage';

export class SwagPagesProxymise {
    private _swagLoginPage!: any;
    private _swagProductsPage!: any;
    private _swagCartPage!: any; 

    public get swagLoginPage() {
        return this._swagLoginPage;
    }

    private set swagLoginPage(object: any) {
        this._swagLoginPage = object;
    }

    public get swagProductsPage() {
        return this._swagProductsPage;
    }

    private set swagProductsPage(object: any) {
        this._swagProductsPage = object;
    }

    public get swagCartPage() {
        return this._swagCartPage;
    }

    private set swagCartPage(object: any) {
        this._swagCartPage = object;
    }

    public initPages(page: Page) : void {
        // Static constructors
        this.swagLoginPage = SwagLoginPage.initPage(page);
        this.swagProductsPage = SwagProductsPage.initPage(page);
        this.swagCartPage = SwagCartPage.initPage(page);
    }
}