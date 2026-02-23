import { Page, Locator, expect } from '@playwright/test';
import { TestUtilities } from "../../utils/testUtilities";
import { Asserts } from "../../utils/asserts";

export abstract class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Logging is synchronous method (no need to add 'await' 'async' 'Promise')
    protected logMessage(message: string): void {
        TestUtilities.logMessage(message);
    }

    protected async goToURL(url: string): Promise<void> { 
        await this.page.goto(url);
        this.logMessage("Sucessfully opened URL: " + url);
    }

    protected async click(locator: string, description: string, timeoutMs: number = 5_000): Promise<void> { 
        await this.page.locator(locator).click({timeout : timeoutMs});
        this.logMessage("Clicked on element: " + description);
    }

    protected async enterText(locator: string, description: string, enterText: string, timeoutMs : number = 5_000): Promise<void> { 
        await this.page.locator(locator).fill(enterText, {timeout : timeoutMs});
        this.logMessage(`Entered text '${enterText}' into input element: ${description}`);
    }

    protected async checkCheckbox(): Promise<void> { 
        //ToDo implement method
        Asserts.assertFail("Method not implemented yet: checkCheckbox");
    }

    protected async uncheckCheckbox(): Promise<void> { 
        //ToDo implement method
        Asserts.assertFail("Method not implemented yet: uncheckCheckbox");
    }

    protected async returnColumnNumberForHeader(headerText: string): Promise<number> {
        const headers: Locator = this.page.locator('//thead//th');
        const count: number = await headers.count();
        let index: number = 0;

        for (index = 0; index < count; index++) {
            const text: string = await headers.nth(index).innerText();
            if(text.includes(headerText)) {
                break;
            }
        }

        return index + 1;
    }

    protected async clickAndWaitSuccessfulApi(
            elementLocator: string, 
            elementDescription: string, 
            apiEndpointOrPartialUrl: string,
            expectedStatusCode: number = 200
    ): Promise<void> {
        const timeoutMsForClick: number = 5_000; // 5 seconds
        const timeoutMsForApi: number = 1_500; // 1.5 seconds
        const timeoutString: string = timeoutMsForApi > 1_000 ? "Seconds: " + (timeoutMsForApi / 1000).toString() : "Miliseconds:" + (timeoutMsForApi).toString();

        this.logMessage(`Will click '${elementDescription}' and wait (for a max of ${timeoutString}) for its triggered API call with partial URL '${apiEndpointOrPartialUrl}'`);

        const startTime: number = Date.now(); // Record start time
        
        const [response] = await Promise.all([
            //Parallel step 1
            this.page.waitForResponse(
            resp => resp.url().includes(apiEndpointOrPartialUrl) && resp.status() === expectedStatusCode, // ALWAYS Sucessful API = OK
                { timeout: timeoutMsForApi }
            ),
            //Parallel step 2
            this.page.locator(elementLocator).click({ force: true, timeout: timeoutMsForClick })
        ]);

        const endTime: number = Date.now(); // Record end time
        const durationMs: number = endTime - startTime; // Calculate elapsed milliseconds
        const durationString: string = durationMs > 1_000 ? (durationMs /1000).toString() + " seconds" : (durationMs).toString() + " ms";

        this.logMessage(`Clicked on element: ${elementDescription} and waited for its triggered parallel API call with endpoint: ${apiEndpointOrPartialUrl} that took ${durationString} to run`);        
    }

    protected async verifyElementIsVisible(elementLocator: string, elementDescription: string, timeoutMs: number = 5_000): Promise<void> {
        await this.waitForFirstElement(elementLocator, elementDescription, timeoutMs);

        try{
            await expect(this.page.locator(elementLocator).first()).toBeVisible({ timeout: timeoutMs });
            this.logMessage("Element is visible: " + elementDescription);
        }
        catch(error) {
            this.logMessage("verifyElementIsVisible Failed. Element is NOT visible: " + elementDescription);
        }
    }

    private async waitForFirstElement(elementLocator: string, elementDescription: string, timeoutMs: number): Promise<void> {
        this.logMessage("Waiting for first element: " + elementDescription);

        try{
            await this.page.locator(elementLocator).first().waitFor({ timeout: timeoutMs});
        }
        catch(error){
            Asserts.assertFail("waitForFirstElement Failed: Element not found: '" + elementDescription + "' after waiting for " + timeoutMs);
        }

        this.logMessage("First element is found: " + elementDescription)
    }

    // Element has to be visible (obviously is on DOM)
    protected async isVisible(
            elementLocator: string,
            elementDescription: string,
            timeoutMs: number = 5_000
    ): Promise<boolean> {

        const timeSeconds = timeoutMs / 1000;
        const locator = this.page.locator(elementLocator).first();

        try {
            await locator.waitFor({ state: 'visible', timeout: timeoutMs });

            this.logMessage(`Wanted element is visible: ${elementDescription} after ${timeSeconds} seconds.`);
            return true;
        } 
        catch {
            this.logMessage(`Wanted element is NOT visible: ${elementDescription} after ${timeSeconds} seconds.`);
            return false;
        }
    }

    // Checks if element is on DOM, could be not visible but on the page's code
    protected async isFound(elementLocator: string, elementDescription: string, timeoutMs: number= 5_000): Promise<boolean>{
        let isVisible: boolean = false; // Step 1
        let isNoErrorOrException: boolean = false; // Step 2
        timeoutMs = timeoutMs / 2; // RECALCULATE Divide by 2 because will try 2 different approaches
        const timeSeconds: number = timeoutMs / 1000;

        // ATTEMPT #1
        try {
            isVisible = await this.page.locator(elementLocator).isVisible({ timeout: timeoutMs });
            if(isVisible) {
                this.logMessage("Wanted element is visible: '" + elementDescription + "' after " + timeSeconds + " seconds.");
                return true;
            } 
            else {
                this.logMessage("Wanted element is NOT visible: '" + elementDescription + "' after " + timeSeconds + " seconds.");
            }
        }
        catch {
            this.logMessage("Wanted element is NOT visible: '" + elementDescription + "' after " + timeSeconds + " seconds.");
            isVisible = false;
        }

        if(!isVisible) {
            // ATTEMPT #2 only if above validation is NOT-TRUE
            try {
                await this.page.locator(elementLocator).waitFor({ timeout: timeoutMs }); // Original implementation: By default, waitFor on a locator waits for the element to be attached and visible. If you just want existence in the DOM (not necessarily visible), you should pass { state: "attached" }.
                //await this.page.locator(elementLocator).waitFor({ state: "attached", timeout: timeoutMs }); // New implementation: Still not proven to be better (both this and above line returning false for page counters, still haven't figure out why)
                isNoErrorOrException = true;
                this.logMessage("Element is found: " + elementDescription + "' after " + timeSeconds + " seconds.");
                return true;
            }
            catch {
                isNoErrorOrException = false;
                this.logMessage("Element is NOT found: " + elementDescription + "' after " + timeSeconds + " seconds.");
            }
        }

        return isVisible || isNoErrorOrException;
    }

    protected async returnTextFromElement(elementLocator: string, elementDescription: string, timeoutMs: number = 5_000, printText: boolean = true): Promise<string> {
        await this.verifyElementIsVisible(elementLocator, elementDescription, timeoutMs);
        let text: string = "";
        text = await this.page.locator(elementLocator).first().innerText();
        if(printText) this.logMessage("Text from '" + elementDescription + "': " + text);
        return text.trim();        
    }
}