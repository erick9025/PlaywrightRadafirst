import chalk from "chalk";
import { test } from "@playwright/test";

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

export function convertStringToDoubleNumber(text : string) : number {
    return parseFloat(text.replace(/[^0-9.]/g, "").replace(/,/g, ""));
}

export function padZero(value: number) : string {
    return value.toString().padStart(2, '0');
}

export function getCurrentFormattedTimestamp() : string {
    let currentDate : Date;
    currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = padZero(currentDate.getMonth() + 1); // Months are zero-based
    const day = padZero(currentDate.getDate());
    const hours = padZero(currentDate.getHours());
    const minutes = padZero(currentDate.getMinutes());
    const seconds = padZero(currentDate.getSeconds());
    const milliseconds = currentDate.getMilliseconds().toFixed();
    
    return `${year}/${month}/${day} @ ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// LOGGING

export function logToConsole(message: string): void {
    const timestamp : string = getCurrentFormattedTimestamp();
    console.log(chalk.bgWhite(timestamp + ": " + message));
    test.info().annotations.push({
        type: `${timestamp}`,
        description: `${message}`
    });
}

export function logErrorToConsole(errorMessage : string) : void{
    let timestamp = getCurrentFormattedTimestamp();
    console.error(chalk.bgRed(timestamp + ": " + errorMessage));
}
