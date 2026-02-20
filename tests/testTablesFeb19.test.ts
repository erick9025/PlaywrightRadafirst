import { test, Browser, BrowserContext, Page, Locator, expect } from '@playwright/test';
import { TestUtilities } from '../utils/testUtilities';
import { Asserts } from '../utils/asserts';

let browser: Browser;
let context: BrowserContext;
let page: Page;

////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
test.beforeAll(async ({ playwright }, testInfo) => {
    // Resolve browser from playwright.config.ts project
    const browserName = testInfo.project.use.browserName!;
    const browserType = playwright[browserName];

    browser = await browserType.launch({
        headless: false,
    });
});

test.beforeEach(async () => {
    // Create a BrowserContext (isolated session)
    context = await browser.newContext();

    // Create a Page inside the context
    page = await context.newPage();
});

test.afterEach(async () => {
    await context.close();
});

test.afterAll(async () => {
    await browser.close();
});

/////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////
test.skip("Testing dynamic tables", async () => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    const colNumberName: number = await TestUtilities.returnColumnNumberForHeader(page, "Name"); // await is used for async functions to extract the return type inside the <>
    const colNumberMemory: number = await TestUtilities.returnColumnNumberForHeader(page, "Memory"); // await is used for async functions to extract the return type inside the <>
    const colNumberCPU: number = await TestUtilities.returnColumnNumberForHeader(page, "CPU"); // await is used for async functions to extract the return type inside the <>
    const colNumberDisk: number = await TestUtilities.returnColumnNumberForHeader(page, "Disk"); // await is used for async functions to extract the return type inside the <>
    const colNumberNetwork: number = await TestUtilities.returnColumnNumberForHeader(page, "Network"); // await is used for async functions to extract the return type inside the <>

    // Below should be always 1
    TestUtilities.logMessage("colNumberName: " + colNumberName);

    // Below are randomized (from 2 to 5)
    TestUtilities.logMessage("colNumberMemory: " + colNumberMemory);
    TestUtilities.logMessage("colNumberCPU: " + colNumberCPU);
    TestUtilities.logMessage("colNumberDisk: " + colNumberDisk);
    TestUtilities.logMessage("colNumberNetwork: " + colNumberNetwork);

    // Iterate over every 'Name' value and verify it one of the allowed values
    const allowedProcesses: string[] = [ "Internet Explorer", "Firefox", "Chrome", "System" ];
    const valuesCol1: Locator = page.locator("//tbody//td[" + colNumberName + "]");
    let count: number = await valuesCol1.count();
    let index: number = 0;

    for (index = 0; index < count; index++) {
        const text: string = await valuesCol1.nth(index).innerText();

        // Determine whether the text is one of the allowed ones
        const isValid: boolean = allowedProcesses.includes(text);

        //expect(isValid).toBe(true); // Native assert/expect, message is not really meaningful
        Asserts.assertTrue(isValid, text + " must be included in the list with values: " + allowedProcesses.join(", ")); // Our custom assert (internally uses expect) with improved messages
    }

    const text1 = "Erick Jimenez";
    const text2 = "Rodriguez";

    expect.soft(text1.includes(text2)).toBe(true);
    expect.soft(text1.includes(text2)).toBe(true);
    expect.soft(text1.includes(text2)).toBe(true);
    expect.soft(text1.includes(text2)).toBe(true);
    expect.soft(text1.includes(text2)).toBe(true);
    expect.soft(text1.includes(text2)).toBe(true);

    TestUtilities.logMessage("Checkpoint...");

    // Iterate over every 'Memory' value and verify it has '58.7 MB' format
    const valuesColMemory: Locator = page.locator("//tbody//td[" + colNumberMemory + "]");
    count = await valuesColMemory.count();
    index = 0; // Reset index back to zero

    for (index = 0; index < count; index++) {
        const text: string = await valuesColMemory.nth(index).innerText();

        Asserts.assertTrue(text.includes(" MB"), "All values from Memory column should be in MB: " + text);
    }

    // ToDo HOMEWORK - Iterate over every 'CPU' value and verify it has '9.4%' format


    // ToDo HOMEWORK - Iterate over every 'Disk' value and verify it has '0.5 MB/s' format


    // ToDo HOMEWORK - Iterate over every 'Network' value and verify it has '4.6 Mbps' format


});

