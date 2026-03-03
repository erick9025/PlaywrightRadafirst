/**
 * Resolves dynamic locator templates by replacing the {{key}} placeholder
 * with a concrete value.
 *
 * Example:
 *   resolveLocator("[data-test='inventory-item-name']:has-text('{{key}}')", "Sauce Labs Backpack")
 *   → "[data-test='inventory-item-name']:has-text('Sauce Labs Backpack')"
 */
export function resolveLocator(template: string, value: string): string {
    return template.replace(/\{\{key\}\}/g, value);
}
