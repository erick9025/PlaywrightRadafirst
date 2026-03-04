export class ElementsSwagProducts {
    //Define locators that should return LIST OF elements
    public readonly ListAllAddToCardButtons: string = "[id*='add-to-cart-']";
    public readonly AllButtonsAddToCart: string = "[id*='add-to-cart']";
    public readonly ListAllProductsNames: string = "[data-test='inventory-item-name']";
    public readonly ListAllProductsPrices: string = ".inventory_item_price";

    //Define locators that should return SINGLE element  
    public readonly TitleProducts : string = ".title";
    public readonly ItemFromCatalogDescriptionXpath: string = "//*[@data-test='inventory-item-name' and contains(text(),'{{key}}')]";
    public readonly ItemFromCatalogDescriptionCssPW: string = this.ListAllProductsNames + ":has-text('{{key}}')";
    public readonly ButtonAddToCartItemFromCatalog: string = this.ItemFromCatalogDescriptionXpath + "/following::button[1]";
    public readonly DdlProductsSort: string = ".product_sort_container";

    //Try same approach with XPATH and CSS-SELECTOR (only works in PlayWright, not on Chrome or other browsers)
    public readonly DummyItemFromCatalogDescriptionXpath: string = "//*[@data-test='inventory-item-name' and contains(text(),'Backpack')]";
    public readonly DummyItemFromCatalogDescriptionCssPW: string = this.ListAllProductsNames + ":has-text('Backpack')";
}