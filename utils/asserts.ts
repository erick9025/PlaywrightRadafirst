import { expect } from "@playwright/test";
import { TestUtilities } from "../utils/testUtilities.ts";
import { z,  } from "zod";
import chalk from 'chalk';

export class Asserts {
    
    private static _useHardAsserts = true;

    private static throwError(originAssertMethodName: string, exception: Error, userMessage: string, assertionMessage: string = ""): void {
        let timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.error(timestamp + ": Assert FAILED! " + originAssertMethodName);
        console.error("Native error type: " + exception.constructor.name);
        console.error("Native error message: " + exception.message);
        console.error("User message: " + userMessage);

        if (!TestUtilities.isNullOrEmpty(assertionMessage)) {
            console.error(chalk.bgRedBright("Assertion message: " + assertionMessage));
            TestUtilities.logErrorToConsole("Assertion message: " + assertionMessage);
        }

        throw exception;
    }

    //----------------------------------------- BASE ASSERTS -----------------------------------------

    // force a failure instead of using ' throw new Error("Failure message");'
    public static assertFail(message: string): void {
        let error : Error = new Error("Test case FAILED! " + message);
        this.throwError("assertFail", error, message, "Test case should not fail.");
    }

    //----------------------------------------- BOUNDARY TESTING -----------------------------------------

    public static assertNumberGreaterThanOrEqual(valueBigger: number, valueSmaller: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(valueBigger).toBeGreaterThanOrEqual(valueSmaller) : expect.soft(valueBigger).toBeGreaterThanOrEqual(valueSmaller);
            TestUtilities.logMessage("Assert PASSED! [" + valueBigger + "] is greater or equal to [" + valueSmaller + "], " + message);
        } catch (error) {
            this.throwError("assertNumberGreaterThanOrEqual", this.ensureError(error), message, "[" + valueBigger + "] should be greater or equal to [" + valueSmaller + "]");
        }
    }

    public static assertNumberLessThanOrEqual(valueSmaller: number, valueBigger: number, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(valueSmaller).toBeLessThanOrEqual(valueBigger) : expect.soft(valueSmaller).toBeLessThanOrEqual(valueBigger);
            TestUtilities.logMessage("Assert PASSED! [" + valueSmaller + "] is less or equal to [" + valueBigger + "], " + message);
        } catch (error) {
            this.throwError("assertNumberLessThanOrEqual", this.ensureError(error), message, "[" + valueSmaller + "] should be less or equal to [" + valueBigger + "]");
        }
    }

    public static assertTextGreaterThanOrEqual(stringZ: string, stringA: string, message: string, trueIfHard : boolean = true): void {
        try {
            // Number is negative when LEFT comes BEFORE RIGHT (L=Apple, R=Orange)
            trueIfHard ? expect(stringA.localeCompare(stringZ) <= 0).toBe(true) : expect.soft(stringA.localeCompare(stringZ) <= 0).toBe(true);
            TestUtilities.logMessage("Assert PASSED! [" + stringZ + "] is greater or equal to [" + stringA + "], " + message);
        } catch (error) {
            this.throwError("assertTextGreaterThanOrEqual", this.ensureError(error), message, "[" + stringZ + "] should be greater or equal to [" + stringA + "]");
        }
    }

    public static assertTextLessThanOrEqual(stringA: string, stringZ: string, message: string, trueIfHard : boolean = true): void {
        try {
            // Number is negative when LEFT comes BEFORE RIGHT (L=Apple, R=Orange)
            trueIfHard ? expect(stringA.localeCompare(stringZ) <= 0).toBe(true) : expect.soft(stringA.localeCompare(stringZ) <= 0).toBe(true);
            TestUtilities.logMessage("Assert PASSED! [" + stringA + "] is less or equal to [" + stringZ + "], " + message);
        } catch (error) {
            this.throwError("assertTextLessThanOrEqual", this.ensureError(error), message, "[" + stringA + "] should be less or equal to [" + stringZ + "]");
        }
    }

    public static assertDateGreaterThanOrEqual(dateA: Date, dateZ: Date, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(dateA.getTime()).toBeGreaterThanOrEqual(dateZ.getTime()) : expect.soft(dateA.getTime()).toBeGreaterThanOrEqual(dateZ.getTime());
            TestUtilities.logMessage("Assert PASSED! [" + dateA + "] is greater or equal to [" + dateZ + "], " + message);
        } catch (error) {
            this.throwError("assertDateGreaterThanOrEqual", this.ensureError(error), message, "[" + dateA + "] should be greater or equal to [" + dateZ + "]");
        }   
    }

    public static assertDateLessThanOrEqual(dateZ: Date, dateA: Date, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(dateZ.getTime()).toBeLessThanOrEqual(dateA.getTime()) : expect.soft(dateZ.getTime()).toBeLessThanOrEqual(dateA.getTime());
            TestUtilities.logMessage("Assert PASSED! [" + dateZ + "] is less or equal to [" + dateA + "], " + message);
        } catch (error) {
            this.throwError("assertDateLessThanOrEqual", this.ensureError(error), message, "[" + dateZ + "] should be less or equal to [" + dateA + "]");
        }
    }

    public static assertStringIsNumberGreaterThan(valueAsString: string, minValue: number, message: string, trueIfHard : boolean = true): void {
        try {
            const numericValue = parseFloat(valueAsString);
            trueIfHard ? expect(numericValue).toBeGreaterThan(minValue) : expect.soft(numericValue).toBeGreaterThan(minValue);
            TestUtilities.logMessage("Assert PASSED! '" + valueAsString + "' String is a number greater than " + minValue + ": " + message);
        } catch (error) {
            this.throwError("assertStringIsNumberGreaterThan", this.ensureError(error), message, "String should be a number greater than " + minValue + ".");
        }
    }

    //----------------------------------------- BINARY TESTING -----------------------------------------

    public static assertTrue(condition: boolean, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(condition).toBe(true) : expect.soft(condition).toBe(true);
            TestUtilities.logMessage("Assert PASSED! Condition is true: " + message);
        } catch (error) {
            this.throwError(
                "assertTrue", this.ensureError(error), message, "Condition should be true."
            );
        }
    }

    public static assertFalse(condition: boolean, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(condition).toBe(false) : expect.soft(condition).toBe(false);
            TestUtilities.logMessage("Assert PASSED! Condition is false: " + message);
        } catch (error) {
            this.throwError("assertFalse", this.ensureError(error), message, "Condition should be false.");
        }
    }

    //----------------------------------------- CONTAINS TESTING -----------------------------------------

    public static assertStringContains(outerString: string, innerString: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(outerString.includes(innerString)).toBe(true) : expect.soft(outerString.includes(innerString)).toBe(true);
            TestUtilities.logMessage("Assert PASSED! [" + innerString + "] is contained within [" + outerString + "] " + message);
        } catch (error) {
            this.throwError("assertStringContains", this.ensureError(error), message, "[" + innerString + "] should be contained within [" + outerString + "]");
        }
    }

    public static assertStringDoesNotContain(outerString: string, innerString: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(outerString.includes(innerString)).toBe(false) : expect.soft(outerString.includes(innerString)).toBe(false)
            TestUtilities.logMessage("Assert PASSED! [" + innerString + "] is not contained within [" + outerString + "] " + message);
        } catch (error) {
            this.throwError("assertStringDoesNotContain", this.ensureError(error), message, "[" + innerString + "] should NOT be contained within [" + outerString + "]");
        }
    }

    public static assertArrayContains(array: any[], item: any, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(array).toContain(item) : expect.soft(array).toContain(item);
            TestUtilities.logMessage("Assert PASSED! Array contains item: " + message);
        } catch (error) {
            this.throwError("assertArrayContains", this.ensureError(error), message, "Array should contain the item.");
        }
    }

    public static assertArrayDoesNotContain(array: any[], item: any, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(array).not.toContain(item) : expect.soft(array).not.toContain(item);
            TestUtilities.logMessage("Assert PASSED! Array does not contain item: " + message);
        } catch (error) {
            this.throwError("assertArrayDoesNotContain", this.ensureError(error), message, "Array should NOT contain the item.");
        }
    }

    //----------------------------------------- EQUALITY TESTING -----------------------------------------

    public static assertEquals(expectedValue: number | string, actualValue: number | string, message: string, trueIfHard : boolean = true): void {
        try {            
            trueIfHard ? expect(actualValue).toBe(expectedValue) : expect.soft(actualValue).toBe(expectedValue); // ToDo REPLICATE THIS IN THE REMAINING ASSERTS
            TestUtilities.logMessage("Assert PASSED! [" + expectedValue + "] is equal to [" + actualValue + "] " + message);
        } catch (error) {
            this.throwError("assertEquals", this.ensureError(error), message, "[" + actualValue + "] should be equal to [" + expectedValue + "]");
        }
    }

    public static assertNotEquals(value1: number | string, value2: number | string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(value2).not.toBe(value1) : expect.soft(value2).not.toBe(value1);
            TestUtilities.logMessage("Assert PASSED! [" + value1 + "] is not equal to [" + value2 + "] " + message);
        } catch (error) {
            this.throwError(
                "assertNotEquals",
                this.ensureError(error),
                message,
                "[" + value2 + "] should NOT be equal to [" + value1 + "]"
            );
        }
    }

    public static assertObjectsEqual(expectedObject: object, actualObject: object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(actualObject).toEqual(expectedObject) : expect.soft(actualObject).toEqual(expectedObject);
            TestUtilities.logMessage("Assert PASSED! Objects are equal: " + message);
        } catch (error) {
            this.throwError("assertObjectsEqual", this.ensureError(error), message, "Objects should be equal.");
        }
    }

    public static assertObjectsNotEqual(object1: object, object2: object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(object1).not.toEqual(object2) : expect.soft(object1).not.toEqual(object2);
            TestUtilities.logMessage("Assert PASSED! Objects are not equal: " + message);
        } catch (error) {
            this.throwError("assertObjectsNotEqual", this.ensureError(error), message, "Objects should NOT be equal.");
        }
    }

    //----------------------------------------- NULLNESS TESTING -----------------------------------------

    public static assertStringNullOrEmpty(text: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(TestUtilities.isNullOrEmpty(text)).toBe(true) : expect.soft(TestUtilities.isNullOrEmpty(text)).toBe(true);
            TestUtilities.logMessage("Assert PASSED! String is null or empty: " + message);
        } catch (error) {
            this.throwError("assertStringNullOrEmpty", this.ensureError(error), message, "String should be null or empty.");
        }
    }

    public static assertStringNotNullNorEmpty(text: string, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(TestUtilities.isNullOrEmpty(text)).toBe(false) : expect.soft(TestUtilities.isNullOrEmpty(text)).toBe(false);
            TestUtilities.logMessage("Assert PASSED! String is not null or empty: " + message + " | " + text);
        } catch (error) {
            this.throwError("assertStringNotNullNorEmpty", this.ensureError(error), message, "String should NOT be null or empty.");
        }
    }

    public static assertObjectNull(object: Object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(object).toBeNull() : expect.soft(object).toBeNull();
            TestUtilities.logMessage("Assert PASSED! Object is null: " + message);
        } catch (error) {
            this.throwError("assertObjectNull", this.ensureError(error), message, "Object should be null.");
        }
    }

    public static assertObjectNotNull(object: Object, message: string, trueIfHard : boolean = true): void {
        try {
            trueIfHard ? expect(object).not.toBeNull() : expect.soft(object).not.toBeNull();
            TestUtilities.logMessage("Assert PASSED! Object is not null: " + message);
        } catch (error) {
            this.throwError("assertObjectNotNull", this.ensureError(error), message, "Object should NOT be null.");
        }
    }

    //----------------------------------------- OTHER TESTING -----------------------------------------

    public static assertTruthy(result: any, message: string, trueIfHard : boolean = true): void {
        try {
            //Ensures that value is true in a boolean context, anything but false, 0, '', null, undefined or NaN. Use this method when you don't care about the specific value.
            trueIfHard ? expect(result).toBeTruthy() : expect.soft(result).toBeTruthy();
            TestUtilities.logMessage("Assert PASSED! Result is truthy: " + message);
        } catch (error) {
            this.throwError("assertTruthy", this.ensureError(error), message, "Result should be truthy.");
        }
    }

    /*public static assertCorrectZodSchema(jsonResponseFromApi: string, schema : z.ZodType<any, z.ZodTypeDef, any>, message: string, trueIfHard : boolean = true): void {
        const result : z.SafeParseReturnType<any, any>= schema.safeParse(jsonResponseFromApi);
        let itFailed : boolean = false;

        if (!result.success) {
            //console.error("Validation failed. Details:");
            result.error.errors.forEach((err) => {
                console.error(`❌ Path: ${err.path.join('.')} — ${err.message}`);
            });
            itFailed = true;
            this.assertFailSpecialPrivate("Result should be truthy when JSON corresponds to correct Zod schema. More details are displayed on stderr section on HTML Playwright report"); // a 'throw' happens here, preventing below try-catch block being executed
        } 
        
        try {
            //Ensures that value is true in a boolean context, anything but false, 0, '', null, undefined or NaN. Use this method when you don't care about the specific value.
            trueIfHard ? expect(result).toBeTruthy() : expect.soft(result).toBeTruthy();
            TestUtilities.logMessage("Assert PASSED! Result is truthy when JSON corresponds to correct Zod schema: " + message);
        } 
        // Below 'catch' block will not actually happen, because of above 'return' statement, if we got to the 'try' that means assert was already succesful ( we are just keeping it as second safe and to keep consistency with above asserts)
        catch (error) {
            if (error instanceof Error) {
                this.throwError("assertTruthy", error, message, "Result should be truthy when JSON corresponds to correct Zod schema.");
            }
        }
    }*/

    // Add this helper function to your Asserts class
    private static ensureError(value: unknown): Error {
        if (value instanceof Error) {
            return value;
        }
        
        // Convert non-Error values to Error objects
        return new Error(String(value));
    }
}