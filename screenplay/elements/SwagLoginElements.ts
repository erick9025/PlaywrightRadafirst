/**
 * Locator strings for the SauceDemo Login page.
 * Pure data — no methods, no framework imports.
 */
export const SwagLoginElements = {
    pageHeader:     ".login_logo",
    inputUser:      "#user-name",
    inputPassword:  "#password",
    // CSS OR-clause: matches either selector
    buttonLogin:    "#login-button,.submit-button"
} as const;
