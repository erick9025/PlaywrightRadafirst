/**
 * Locator strings for the SauceDemo Products page.
 *
 * Dynamic locators contain the {{key}} placeholder.
 * Use resolveLocator(template, value) from screenplay/utils/locatorUtils
 * to substitute the placeholder before passing to an Interaction.
 */
export const SwagProductsElements = {
    // List locators
    listAllAddToCartButtons:    "[id*='add-to-cart-']",
    allButtonsAddToCart:        "[id*='add-to-cart']",
    listAllProductsNames:       "[data-test='inventory-item-name']",
    listAllProductsPrices:      ".inventory_item_price",

    // Single element locators
    titleProducts:              ".title",
    ddlProductsSort:            ".product_sort_container",

    // Dynamic locators — replace {{key}} with the product name
    itemFromCatalogDescriptionXpath:    "//*[@data-test='inventory-item-name' and contains(text(),'{{key}}')]",
    itemFromCatalogDescriptionCssPW:    "[data-test='inventory-item-name']:has-text('{{key}}')",
    buttonAddToCartItemFromCatalog:     "//*[@data-test='inventory-item-name' and contains(text(),'{{key}}')]/following::button[1]",
    itemPriceLocator:                   "//div[@class='inventory_item' and contains(.,'{{key}}')]//child::*[@class='inventory_item_price']"
} as const;
