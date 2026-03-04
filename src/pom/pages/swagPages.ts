import { Page } from '@playwright/test';
import { SwagLoginPage} from "./pagesByFeature/swagLoginPage"
import { SwagProductsPage } from './pagesByFeature/swagProductsPage';
import { SwagCartPage } from './pagesByFeature/swagCartPage';

export class SwagPages {
    private _swagLoginPage!: SwagLoginPage;
    private _swagProductsPage!: SwagProductsPage;
    private _swagCartPage!: SwagCartPage; 

    public get swagLoginPage(): SwagLoginPage {
        return this._swagLoginPage;
    }

    private set swagLoginPage(object: SwagLoginPage) {
        this._swagLoginPage = object;
    }

    public get swagProductsPage(): SwagProductsPage {
        return this._swagProductsPage;
    }

    private set swagProductsPage(object: SwagProductsPage) {
        this._swagProductsPage = object;
    }

    public get swagCartPage(): SwagCartPage {
        return this._swagCartPage;
    }

    private set swagCartPage(object: SwagCartPage) {
        this._swagCartPage = object;
    }

    public instancePages(page: Page) : void {
        this.swagLoginPage = new SwagLoginPage(page);
        this.swagProductsPage = new SwagProductsPage(page);
        this.swagCartPage = new SwagCartPage(page);
    }
}