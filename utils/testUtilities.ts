import { expect, test, Browser, BrowserContext } from '@playwright/test';
import { Asserts } from './asserts';
import { env } from '../playwright.config'; // adjust path as needed

export class TestUtilities {

    public static readonly TRANSFERS_WAIT_TIME: number = 10_000;

    //SHOULD BE: June 19, 2025 7:43:45 PM
    //PRINTING : June 20, 2025 at 10:02:58 AM
    public static DateOptionsAPTransactionHistory : Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    //--------------------------------------------------------- CONSOLE LOGGER ---------------------------------------------------------
    public static logErrorToConsole(errorMessage: string): void {
        const timestamp = TestUtilities.getCurrentFormattedTimestamp();
        console.error(timestamp + ": " + errorMessage);
        test.info().annotations.push({
            type: `ERROR ${timestamp}`,
            description: `${errorMessage}`
        });
    }

    public static logToConsole(message: string): void {
        const timestamp : string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({
            type: `${timestamp}`,
            description: `${message}`
        });
    }

    public static logToConsoleNoTimestamp(message: string): void {
        console.log(message);
        test.info().annotations.push({
            type: ``,
            description: `${message}`
        });
    }

    public static DEBUGGING_ON: boolean = false;
    public static HYBRID_TESTS_ON: boolean = false;

    public static logToConsoleDebug(message: string): void {
        if(TestUtilities.DEBUGGING_ON) {
            message = "Debug: " + message;
            const timestamp : string = TestUtilities.getCurrentFormattedTimestamp();
                console.log(timestamp + ": " + message);
                test.info().annotations.push({
                    type: `${timestamp}`,
                    description: `${message}`
                });
        }        
    }

    public static logToConsoleImportant(message: string, printBlankLineAfter: boolean = true): void {
        const charL: string = "⚡⚡⚡";
        const charR: string = "⚡⚡⚡";
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({ //BLANK LINE
            type: ' '
        });
        test.info().annotations.push({
            type: `${timestamp} ${charL}${message}${charR}`
        });
        if(printBlankLineAfter) {
            test.info().annotations.push({ //BLANK LINE
                type: ' '
            });
        }        
    }

    public static logToConsoleWarning(message: string, printBlankLineAfter: boolean = true): void {
        const charL: string = "🚨🚨🚨";
        const charR: string = "⚠️⚠️⚠️";
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({ //BLANK LINE
            type: ' '
        });
        test.info().annotations.push({
            type: `${timestamp} ${charL}${message}${charR}`
        });
        if(printBlankLineAfter) {
            test.info().annotations.push({ //BLANK LINE
                type: ' '
            });
        }        
    }

    public static logToConsoleBold(message: string): void {
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({
            type: `${timestamp} ${message}`
        });
    }

    public static logIssue(messageForMinorIssue: string): void {
        const timestamp : string = TestUtilities.getCurrentFormattedTimestamp();
        test.info().annotations.push({
            type: `issues`,
            description: `${timestamp}: ${messageForMinorIssue}`
        });

        test.info().attach('issues.txt', {
            body: `${timestamp}: ${messageForMinorIssue}`,
            contentType: 'text/plain',
        });
    }

    public static logMethodStart(message: string): void {
        const charL: string = "🔵🔵";
        const charR: string = "🔵🔵";
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({ //BLANK LINE
            type: ' '
        });
        test.info().annotations.push({
            type: `${timestamp} ${charL}${message}${charR}`
        });        
    }

    public static logMethodEnd(message: string): void {
        const charL: string = "🟠🟠";
        const charR: string = "🟠🟠";
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({
            type: `${timestamp} ${charL}${message}${charR}`
        }); 
        test.info().annotations.push({ //BLANK LINE
            type: ' '
        });
    }

    public static logMainMethodStart(message: string): void {
        const charL: string = "🟩🟩🟩";
        const charR: string = "🟩🟩🟩";
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({ //BLANK LINE
            type: ' '
        });
        test.info().annotations.push({
            type: `${timestamp} ${charL}${message}${charR}`
        });        
    }

    public static logMainMethodEnd(message: string): void {
        const charL: string = "🟥🟥🟥";
        const charR: string = "🟥🟥🟥";
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.log(timestamp + ": " + message);
        test.info().annotations.push({
            type: `${timestamp} ${charL}${message}${charR}`
        }); 
        test.info().annotations.push({ //BLANK LINE
            type: ' '
        });
    }

    public static newEmptyLine(): void {
        console.log(""); // Print an empty line without style
    }

    public static printBetween(prefix: string, message: string, char: string = "["): void {
        // Added an index signature { [key: string]: string } to 'chars'.
        // This allows us to use dynamic string keys without TypeScript errors.
        const chars: { [key: string]: string } = 
        {
            "[" : "]",
            "{" : "}",
            "(" : ")"            
        };

        const rightChar = chars.hasOwnProperty(char) ? chars[char] : char;
        TestUtilities.logToConsole(prefix + " " + char + message + rightChar);
    }

    //------------------------------------------------------------ UTILITIES (JavaScript Language related) -----------------------------------------------------------
    public static padNumber(num: number, size: number): string {
        let s = num.toString();
        while (s.length < size) s = "0" + s;
        return s;
    }

    public static getTodaysDateInAPFormat(): string {
        const todaysDateObj = new Date();
        return TestUtilities.getTextBefore(todaysDateObj.toLocaleString("en-US", TestUtilities.DateOptionsAPTransactionHistory), " at");
    }

    public static getCurrentYear(): string {
        return new Date().getFullYear().toString();
    }

    public static sanitizeOtp(otp: string, label: string, length: number = 6): string {
        const trimmed: string = otp.trim();
        const pattern: RegExp = new RegExp(`^\\d{${length}}$`);
        if (!pattern.test(trimmed)) {
            Asserts.assertFail(`Invalid ${label} OTP format: '${otp}'. Expected a ${length}-digit number.`);
        }
        return trimmed;
    }
    
    public static isNullOrEmpty(text: any): boolean {
        return text == undefined || text.length == 0 || text === "";
    }

    public static isXpath(locator: string): boolean {
        return locator.startsWith("//") || locator.startsWith("(//");
    }

    public static convertToXpath(locator: string): string {
        if(!TestUtilities.isXpath(locator)){
            return "//" + locator;
        }

        return locator;
    }

    public static getTextBefore(fullText: string, marker: string): string {
        const index = fullText.indexOf(marker);
        if (index === -1) return fullText; // If marker not found, return full text
        return fullText.substring(0, index);
    }

    public static getTextAfter(fullText: string, marker: string): string {
        if (typeof fullText !== 'string' || typeof marker !== 'string') return '';
    
        const index = fullText.indexOf(marker);
        if (index === -1) return ''; // marker not found

        return fullText.substring(index + marker.length);
    }

    public static getTextBetween(fullText: string, startText: string, endText: string, limitsShouldExist: boolean = true): string {
        const startIndex = fullText.indexOf(startText);
        const endIndex = fullText.indexOf(endText, startIndex + startText.length);

        TestUtilities.logToConsole("Getting text between '" + startText + "' (left) and '" + endText + "' (right) from string: " + fullText);

        if(limitsShouldExist) {
            Asserts.assertFalse(startIndex === -1 || endIndex === -1, "Both limits (LEFT & RIGHT) should be present in text: " + fullText);
        }

        if (startIndex === -1 || endIndex === -1) {
            Asserts.assertFail("Limits not found in text: " + fullText);
        }

        return fullText.substring(startIndex + startText.length, endIndex);
    }

    public static getNumericValue(str: string, shouldBeNumeric: boolean = true): number {
        const num: number = parseFloat(str);
        let isNan: boolean = isNaN(num);

        if(shouldBeNumeric && isNan) Asserts.assertFail("String should be a valid number: " + str);
        return num;
    }

    public static getPrettyJSON(jsonAsObject: any): string {
        let semiPrettyJson = JSON.stringify(jsonAsObject, null, 2);
        return semiPrettyJson;
    }

    public static replaceCustomKey(text: string, keyName: string, replacement: string): string {
        let charLeft = "{{";
        let charRight = "}}";
        let key = charLeft + keyName + charRight;
        expect(text.includes(key)).toBe(true);

        // Escape special regex characters in the key
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escapedKey, 'g');
        return text.replace(regex, replacement);
    }

    public static replaceFixedKey(text: string, replacement: string): string {
        return TestUtilities.replaceCustomKey(text, "key", replacement);
    }

    public static replaceTagAndFixedKey(newTag: string, locator: string, replacement: string): string {
        let xpath: string = locator.replaceAll("*", newTag);
        xpath = TestUtilities.replaceCustomKey(xpath, "key", replacement);
        return xpath;
    }

    public static transformXpath(baseXpath: string, keyValue: string, optionalKnownTag: string = ""): string {
        //TestUtilities.logToConsole("Transforming Xpath: " + baseXpath + " with key: " + keyValue + " and tag: " + optionalKnownTag);
        let transformed = TestUtilities.replaceFixedKey(baseXpath, keyValue);

        if(optionalKnownTag.length > 0) {
            let tag = optionalKnownTag.toLowerCase();
            transformed = transformed.replace("*", tag);
        }

        //TestUtilities.logToConsole("Transformed final Xpath: " + transformed);
        return transformed;
    }

    public static stringToBoolean(booleanAsString: string): boolean {
        // Check if the string is 'true' (case insensitive)
        if (booleanAsString.toLowerCase() === 'true') {
            return true;
        }
        // Check if the string is 'false' (case insensitive)
        else if (booleanAsString.toLowerCase() === 'false') {
            return false;
        }
        // For any other string, return false
        else {
            return false;
        }
    }

    /*
    Declare as extension method
    String.prototype.startsWithUpperCase = function() {
        return /^[A-Z]/.test(this);
    };
    */

    /*
    String.prototype.replaceKeyExt = function(url, keyName, keyValue) {
        const charLeft = "{";
        const charRight = "}";
        const key = charLeft + keyName + charRight;
    
        if (!(url.includes(charLeft) && url.includes(charRight) && url.includes(key))) {
            throw new Error("URL does not contain the necessary placeholders.");
        }
    
        return url.replace(key, keyValue);
    }*/


    public static getCurrentFormattedDate(): string {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = this.padZero(currentDate.getMonth() + 1); // Months are zero-based
        const day = this.padZero(currentDate.getDate());
      
        return `${year}/${month}/${day}`;
    }

    // Map digits to superscript
    private static readonly superscriptMap: Record<string, string> = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹',
    };

    public static getCustomFormattedTimestampYYYYMMDDhhmmss(date: Date, separatorChar: string = " @ "): string {
        const year = date.getFullYear();
        const month = this.padZero(date.getMonth() + 1); // Months are zero-based
        const day = this.padZero(date.getDate());
        const hours = this.padZero(date.getHours());
        const minutes = this.padZero(date.getMinutes());
        const seconds = this.padZero(date.getSeconds());
              
        return `${year}/${month}/${day}${separatorChar}${hours}:${minutes}:${seconds}`;
    }

    public static getCurrentFormattedTimestamp(): string {
        let currentDate;
        currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = this.padZero(currentDate.getMonth() + 1); // Months are zero-based
        const day = this.padZero(currentDate.getDate());
        const hours = this.padZero(currentDate.getHours());
        const minutes = this.padZero(currentDate.getMinutes());
        const seconds = this.padZero(currentDate.getSeconds());
        const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');
        const millisecondsMini = milliseconds.split('').map(d => this.superscriptMap[d] ?? d).join('');
      
        return `${year}/${month}/${day} @ ${hours}:${minutes}:${seconds}.${millisecondsMini}`;
    }

    public static getCurrentFormattedTimestampYYYYMMDDhhmmss(separatorChar: string = ""): string {
        let currentDate;
        currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = this.padZero(currentDate.getMonth() + 1); // Months are zero-based
        const day = this.padZero(currentDate.getDate());
        const hours = this.padZero(currentDate.getHours());
        const minutes = this.padZero(currentDate.getMinutes());
        const seconds = this.padZero(currentDate.getSeconds());
              
        return `${year}${month}${day}${separatorChar}${hours}${minutes}${seconds}`;
    }

    public static getCurrentFormattedTimestampYYMMDDhhmmss(separatorChar: string = ""): string {
        let currentDate;
        currentDate = new Date();
        const yearLast2 = currentDate.getFullYear().toString().slice(-2); // Get last two digits of the year
        const month = this.padZero(currentDate.getMonth() + 1); // Months are zero-based
        const day = this.padZero(currentDate.getDate());
        const hours = this.padZero(currentDate.getHours());
        const minutes = this.padZero(currentDate.getMinutes());
        const seconds = this.padZero(currentDate.getSeconds());
              
        return `${yearLast2}${month}${day}${separatorChar}${hours}${minutes}${seconds}`;
    }

    public static printCurrentFormattedTimestamp(): void {
        this.logToConsole("Current timestamp: " + TestUtilities.getCurrentFormattedTimestamp());
    }
      
    public static padZero(value: number): string {
        return value.toString().padStart(2, '0');
    }

    public static getMonthName(date: Date): string {
        return date.toLocaleString('en-US', { month: 'long' });
    }

    public static printDateInfo(date: Date): void {
        this.logToConsole("Full date is: " + date);

        let dayOfWeek = date.getDay();
        let day = date.getDate();
        let month = date.getMonth() + 1; //Month is 0-11, add +1 to make it 1-12
        let year = date.getFullYear();

        this.logToConsole("   Weekday: " + dayOfWeek);
        this.logToConsole("   Day: " + day);
        this.logToConsole("   Month: " + month);
        this.logToConsole("   Year: " + year);
        this.logToConsole("   Month name: " + TestUtilities.getMonthName(date));
    }

    /*
    You can handle both currency symbols and commas by modifying the .replace() logic. Here’s the improved version:

    Using parseFloat() (Recommended)
        const priceStr = "$49,999.99";
        const price = parseFloat(priceStr.replace(/[^0-9.]/g, "").replace(/,/g, ""));
        this.logToConsole(price); // Output: 49999.99

    Alternative Using Regex match()
        const priceStr = "$49,999.99";
        const price = parseFloat(priceStr.replace(/,/g, "").match(/\d+(\.\d+)?/)![0]);
        this.logToConsole(price); // Output: 49999.99

    Explanation
        .replace(/[^0-9.,]/g, "") > Removes everything except numbers, . and ,
        .replace(/,/g, "") > Removes commas (for numbers like "49,999.99")
        parseFloat() > Converts the cleaned string to a number
    */
    public static convertStringToDoubleNumber(text: string): number {
        return parseFloat(text.replace(/[^0-9.]/g, "").replace(/,/g, ""));
    }

    public static getQueryParamsAsString(queryParams?: Record<string, string> | Partial<Record<string, string>>): string {
        if(!queryParams || Object.keys(queryParams).length === 0) {
            return ""; // Return empty string if no query parameters are provided
        }
        else {
            return "?" + Object.entries(queryParams)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
                .join('&');
        }        
    }

    public static numberToCurrency(amount: number): string {
        // Convert the number to a currency string
        const formattedCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
        return formattedCurrency; //console.log(formatted); // "$8.53"
    }

    public static randomAmount(integers: string = ""): string {
        let numbersLeft = "";
        let numbersRight = "";

        if(!TestUtilities.isNullOrEmpty(integers)) {            
            const numericVal = TestUtilities.getNumericValue(integers, true);
            numbersLeft = integers;
        }
        else {
            //LEFT Randomize (1 to 9)
            const randomLeft = Math.floor(Math.random() * 9) + 1;
            numbersLeft = randomLeft.toString();
        }

        //RIGHT Randomize (1 to 9)
        const randomRight = Math.floor(Math.random() * 99) + 1;
        numbersRight = String(randomRight).padStart(2, '0');

        return numbersLeft + "." + numbersRight;
    }

    public static isInstanceOf<T>(obj: unknown, clazz: new (...args: any[]) => T): obj is T {
        return obj instanceof clazz;
    }

    // "M/d/yyyy h:mm a"
    public static formatDate(date: Date): string {
        const month = date.getMonth() + 1; // Months are zero-based
        const day = date.getDate();
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        const paddedMinutes = minutes.toString().padStart(2, '0');

        return `${month}/${day}/${year} ${hours}:${paddedMinutes} ${ampm}`;

        // Example usage:
        //const now = new Date();
        //console.log(formatDate(now)); // e.g., "7/21/2025 3:05 PM"
    }

    // OLD Customers portal transfers: sample date from table: '07/23/2025 09:42:04 AM'
    //                             put your sample here:-->"06/20/2025 10:25:35 AM"
    public static parseDateTimeWithCBOldFormat(input: string): Date {
        // Expecting format: MM/DD/YYYY hh:mm:ss AM/PM
        // Example: "06/20/2025 10:25:35 AM"
        const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/;
        const match = input.trim().match(regex);
        if (!match) {
            Asserts.assertFail(`Invalid date format: ${input}`);
            return new Date(NaN); // Unreachable, but for TS
        }
        const [, monthStr, dayStr, yearStr, hourStr, minStr, secStr, period] = match;
        let month = Number(monthStr);
        let day = Number(dayStr);
        let year = Number(yearStr);
        let hours = Number(hourStr);
        let minutes = Number(minStr);
        let seconds = Number(secStr);
        if (period === 'PM' && hours < 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        const returnDate: Date = new Date(year, month - 1, day, hours, minutes, seconds);
        TestUtilities.logToConsole("Parsed date: " + returnDate);
        return returnDate;
        /*
        Example usage:
        const date = parseDateTimeWithCBOldFormat("07/22/2025 12:38:32 PM");
        console.log(date.toISOString()); // 2025-07-22T18:38:32.000Z (depending on your timezone)
        */
    }

    // NEW Customers portal transfers: sample date from table: '07/23/2025 | 09:42:04 AM'
    //                             put your sample here:-->"06/20/2025 | 10:25:35 AM"
    public static parseDateTimeWithCBFormat(input: string): Date {
        // Expecting format: MM/DD/YYYY | hh:mm:ss AM/PM
        // Example: "06/20/2025 | 10:25:35 AM"
      //const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/;
        const regex = /^(\d{2})\/(\d{2})\/(\d{4})\s+\|\s+(\d{1,2}):(\d{2}):(\d{2})\s+(AM|PM)$/;
        const match = input.trim().match(regex);
        if (!match) {
            Asserts.assertFail(`Invalid date format: ${input}`);
            return new Date(NaN); // Unreachable, but for TS
        }
        const [, monthStr, dayStr, yearStr, hourStr, minStr, secStr, period] = match;
        let month = Number(monthStr);
        let day = Number(dayStr);
        let year = Number(yearStr);
        let hours = Number(hourStr);
        let minutes = Number(minStr);
        let seconds = Number(secStr);
        if (period === 'PM' && hours < 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0;
        }
        const returnDate: Date = new Date(year, month - 1, day, hours, minutes, seconds);
        TestUtilities.logToConsole("Parsed date: " + returnDate);
        return returnDate;
        /*
        Example usage:
        const date = parseDateTimeWithCBFormat("07/22/2025 | 12:38:32 PM");
        console.log(date.toISOString()); // 2025-07-22T18:38:32.000Z (depending on your timezone)
        */
    }

    public static removeLeadingZerosFromString(value: string): string {
        // Remove leading zeros from a string
        return value.replace(/^0+/, '');
    }

    public static dateObjectToString(dateObject: Date, pattern: string, printAdditionalInfo: boolean = false): string {
        if(printAdditionalInfo) {
            this.newEmptyLine();
            this.logToConsole(`Converting date object to string with pattern: '${pattern}' | date is ${dateObject}`);
        }        
        
        switch (pattern) {
            case "MM/DD/YYYY":
                return `${this.padZero(dateObject.getMonth() + 1)}/${this.padZero(dateObject.getDate())}/${dateObject.getFullYear()}`;
            case "M/DD/YYYY":
                return `${dateObject.getMonth() + 1}/${this.padZero(dateObject.getDate())}/${dateObject.getFullYear()}`;
            case "MMM/DD/YYYY":
                return `${this.getMonthName(dateObject).substring(0, 3)}/${this.padZero(dateObject.getDate())}/${dateObject.getFullYear()}`;
            case "MMMM/DD/YYYY":
                return `${this.getMonthName(dateObject)}/${this.padZero(dateObject.getDate())}/${dateObject.getFullYear()}`;
            case "MMMM D, YYYY":
                return `${this.getMonthName(dateObject)} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
            case "hh:mm:ss A":
                let hours = dateObject.getHours();
                const minutes = this.padZero(dateObject.getMinutes());
                const seconds = this.padZero(dateObject.getSeconds());
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                return `${this.padZero(hours)}:${minutes}:${seconds} ${ampm}`;
            case "h:mm:ss A":
                let hoursNoZero = dateObject.getHours();
                const minutesNoZero = this.padZero(dateObject.getMinutes());
                const secondsWithZero = this.padZero(dateObject.getSeconds());
                const ampmNoZero = hoursNoZero >= 12 ? 'PM' : 'AM';
                hoursNoZero = hoursNoZero % 12; 
                hoursNoZero = hoursNoZero ? hoursNoZero : 12; // the hour '0' should be '12'
                const hoursNoZeroStr = this.removeLeadingZerosFromString(hoursNoZero.toString());
                return `${hoursNoZeroStr}:${minutesNoZero}:${secondsWithZero} ${ampmNoZero}`;
            default:
                Asserts.assertFail(`Unsupported date pattern: ${pattern}`);
                return ""; // This line will never be reached due to the assertion above (USED to prevent TypeScript error)
        }            
    }

    public static removeLeadingParenthesis(value: string): string {
        // Remove leading Parenthesis from a string
        return value.replace(/^\(+/, ''); // This regex matches one or more opening Parenthesis at the start of the string
    }

    public static transformInTrElement(containerLocator: string, textToFind: string) {
        return `${containerLocator}//tbody//tr[contains(.,'${textToFind}')]`;
    }

    // Sample of GUID: 5f70a0c0-8ded-4f88-997d-b34601157dd2 (Reference ID in Accounts Transfers tables)
    public static isGUID(value: string): boolean {
        const guidRegex = /^[{(]?[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}[)}]?$/i;
        return guidRegex.test(value);
    }  
    
    public static maskPassword(password: string): string {
        return '*'.repeat(password.length);
    }

    // Return the enum option exactly as declared inside the export enum definition (blue = "orange" will print the blue portion)
    public static getEnumKey<T extends Record<string, string>>(
        enumObj: T,
        value: T[keyof T]
        ): keyof T | undefined {
        return (Object.keys(enumObj) as Array<keyof T>)
            .find(k => enumObj[k] === value);
    }
}