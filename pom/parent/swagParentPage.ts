import { Page } from '@playwright/test';
import { BasePage } from "./basePage";
import { ElementsSwagLogin } from "../elements/elementsSwagLogin";
import { ElementsSwagProducts } from "../elements/elementsSwagProducts";
import { ElementsSwagCart } from "../elements/elementsSwagCart";
import { ConstantsLoginPage } from "../constants/constantsLoginPage";
import { ConstantsProductsPage } from "../constants/constantsProductsPage";
import { ConstantsCartPage } from "../constants/constantsCartPage";

export abstract class SwagParentPage extends BasePage {
    // Elements for all page objects DECLARATION
    protected ElementsSwagLogin : ElementsSwagLogin;
    protected ElementsSwagProducts : ElementsSwagProducts;    
    protected ElementsSwagCart : ElementsSwagCart;

    // Constants for all page objects DECLARATION
    protected ConstantsLoginPage : ConstantsLoginPage;
    protected ConstantsProductsPage : ConstantsProductsPage;
    protected ConstantsCartPage : ConstantsCartPage;

    constructor(page: Page) {
        // Call parent constructor first
        super(page);

        // Elements for all page objects INSTANTIATION
        this.ElementsSwagLogin = new ElementsSwagLogin();
        this.ElementsSwagProducts = new ElementsSwagProducts();
        this.ElementsSwagCart = new ElementsSwagCart();

        // Constants for all page objects INSTANTIATION
        this.ConstantsLoginPage = new ConstantsLoginPage();
        this.ConstantsProductsPage = new ConstantsProductsPage();
        this.ConstantsCartPage = new ConstantsCartPage();
    }
}