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

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

export function getTextAfter(fullText: string, marker: string): string {
    if (typeof fullText !== "string" || typeof marker !== "string") return "";
    const index = fullText.indexOf(marker);
    if (index === -1) return "";
    return fullText.substring(index + marker.length);
}

export function isNullOrEmpty(text: string | undefined): boolean {
    return text === undefined || text.length === 0 || text === "";
}

export function getNumericValue(str: string): number {
    const parsed = parseFloat(str);
    if (isNaN(parsed)) throw new Error(`Cannot parse '${str}' as a number`);
    return parsed;
}