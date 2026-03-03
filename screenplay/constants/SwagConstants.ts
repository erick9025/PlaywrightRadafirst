/**
 * Test data constants for the SauceDemo application.
 *
 * Accepted usernames:
 *   standard_user, locked_out_user, problem_user,
 *   performance_glitch_user, error_user, visual_user
 *
 * Password for all users: secret_sauce
 */
export const SwagConstants = {
    baseUrl:                "https://www.saucedemo.com/",
    expectedLoginHeader:    "Swag Labs",
    expectedCartTitle:      "Your Cart",

    // Credentials
    userStandard:           "standard_user",
    correctPassword:        "secret_sauce",

    // All products available in the catalog
    existingProducts: [
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie",
        "Test.allTheThings() T-Shirt (Red)"
    ] as const,

    // Memory keys used by Tasks to share state through the Actor
    memoryKeys: {
        cartTotal: "cartTotal"
    } as const
} as const;
