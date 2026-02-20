import { Page, Locator, test } from '@playwright/test';
import chalk from 'chalk';

export class TestUtilities {

    // Async functions/methods return
    // ... TypeScript:  Promise<>
    // ... C#:          Task<>
    // ... Java:        CompletableFuture<>

    public static async returnColumnNumberForHeader(page: Page, headerText: string): Promise<number> {
        const headers: Locator = page.locator('//thead//th');
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

    public static async pending(page: Page, headerText: string): Promise<number> {
        throw new Error("Not implemented method yet");
        let columnNumber: number = 0;

        const headers: Locator = page.locator('//thead//th');
        const count: number = await headers.count();

        for (let i = 0; i < count; i++) {
            const text: string = await headers.nth(i).innerText();
            console.log(text.trim());
        }

        return columnNumber;
    }

    // STATIC keywords allows me to call this method with no need of an instance of a class (DIRECTLY)
    public static formatCurrency(value: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    public static logMessage(message: string) : void {
        console.log("[" + TestUtilities.formatTimestamp() + "]: " + message);
        // ToDo show them the other way with the other quote (Wednesday Feb 12)
    }

    public static logErrorToConsole(errorMessage: string): void {
        const timestamp = TestUtilities.getCurrentFormattedTimestamp();
        console.error(chalk.bgRed(timestamp + ": " + errorMessage));
        test.info().annotations.push({
            type: `ERROR ${timestamp}`,
            description: `${errorMessage}`
        });
    }

    public static formatTimestamp(): string {
        const now = new Date();

        const datePart = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        }).format(now);

        const timePart = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(now);

        const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

        // Split time and AM/PM
        const [time, period] = timePart.split(' ');

        return `${datePart} @ ${time}.${milliseconds} ${period}`;
    }

    public static getCurrentFormattedTimestamp() : string {
        let currentDate : Date;
        currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = this.padZero(currentDate.getMonth() + 1); // Months are zero-based
        const day = this.padZero(currentDate.getDate());
        const hours = this.padZero(currentDate.getHours());
        const minutes = this.padZero(currentDate.getMinutes());
        const seconds = this.padZero(currentDate.getSeconds());
        const milliseconds = currentDate.getMilliseconds().toFixed();
      
        return `${year}/${month}/${day} @ ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    static padZero(value: number) : string {
        return value.toString().padStart(2, '0');
    }

    public static getTextBefore(fullText: string, marker: string) {
        const index = fullText.indexOf(marker);
        if (index === -1) return fullText; // If marker not found, return full text
        return fullText.substring(0, index);
    }

    public static getTextAfter(fullText: string, marker: string) {
        if (typeof fullText !== 'string' || typeof marker !== 'string') return '';
    
        const index = fullText.indexOf(marker);
        if (index === -1) return ''; // marker not found

        return fullText.substring(index + marker.length);
    }

    public static getTextBetween(fullText: string, startText: string, endText: string, limitsShouldExist = true) : string /*| null*/ {
        const startIndex = fullText.indexOf(startText);
        const endIndex = fullText.indexOf(endText, startIndex + startText.length);

        //TestUtilities.logToConsole("Getting text between '" + startText + "' (left) and '" + endText + "' (right) from string: " + fullText);

        if(limitsShouldExist) {
            //CustomAsserts.assertFalse(startIndex === -1 || endIndex === -1, "Both limits (LEFT & RIGHT) should be present in text: " + fullText);
        }

        if (startIndex === -1 || endIndex === -1) {
            //return null; // or throw an error, or return empty string
            //CustomAsserts.assertFail("Left and/or right strings are not included within original string");
        }

        return fullText.substring(startIndex + startText.length, endIndex);
    }

    public static isNullOrEmpty(text : string | undefined) {
        if(text == undefined || text.length == 0 || text == "")
            return true;
        else
            return false;
    }

    public static async clickAndWaitSuccessfulApi(
            page: Page,
            elementLocator: string, 
            elementDescription: string, 
            apiEndpointOrPartialUrl: string,
            expectedStatusCode: number = 200
    ): Promise<void> {
        const timeoutMsForClick: number = 5_000; // 5 seconds
        const timeoutMsForApi: number = 1_500; // 1.5 seconds
        const timeoutString: string = timeoutMsForApi > 1_000 ? "Seconds: " + (timeoutMsForApi / 1000).toString() : "Miliseconds:" + (timeoutMsForApi).toString();

        TestUtilities.logMessage(`Will click '${elementDescription}' and wait (for a max of ${timeoutString}) for its triggered API call with partial URL '${apiEndpointOrPartialUrl}'`);

        const startTime: number = Date.now(); // Record start time
        
        const [response] = await Promise.all([
            //Parallel step 1
            page.waitForResponse(
            resp => resp.url().includes(apiEndpointOrPartialUrl) && resp.status() === expectedStatusCode, // ALWAYS Sucessful API = OK
                { timeout: timeoutMsForApi }
            ),
            //Parallel step 2
            page.locator(elementLocator).click({ force: true, timeout: timeoutMsForClick })
        ]);

        const endTime: number = Date.now(); // Record end time
        const durationMs: number = endTime - startTime; // Calculate elapsed milliseconds
        const durationString: string = durationMs > 1_000 ? (durationMs /1000).toString() + " seconds" : (durationMs).toString() + " ms";

        TestUtilities.logMessage(`Clicked on element: ${elementDescription} and waited for its triggered parallel API call with endpoint: ${apiEndpointOrPartialUrl} that took ${durationString} to run`);        
    }
}