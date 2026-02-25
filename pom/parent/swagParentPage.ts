import { Page } from '@playwright/test';
import { BasePage } from "./basePage";
import { ElementsSwagProducts } from "../elements/elementsSwagProducts";
import { ConstantsProductsPage } from "../constants/constantsProductsPage";

export abstract class SwagParentPage extends BasePage {
    // Elements for all page objects DECLARATION
    protected ElementsSwagProducts : ElementsSwagProducts;

    // Constants for all page objects DECLARATION
    protected ConstantsProductsPage : ConstantsProductsPage;

    constructor(page: Page) {
        // Call parent constructor first
        super(page);

        // Elements for all page objects INSTANTIATION
        this.ElementsSwagProducts = new ElementsSwagProducts();

        // Constants for all page objects INSTANTIATION
        this.ConstantsProductsPage = new ConstantsProductsPage();
    }
}