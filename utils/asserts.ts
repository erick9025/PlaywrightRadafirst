import { expect } from "@playwright/test";
import { AssertionsHandler } from "./assertionsHandler";
import { TestUtilities } from "../utils/testUtilities";
import { z } from "zod";

export class Asserts {
    
    private static _useHardAsserts = true;
    
    // ToDo document below setter and getter, rename input parameter to a better name
     // true = HARD | false = SOFT
    public static set UseHardAsserts(falseIfWantSoft : boolean) {
        Asserts._useHardAsserts = falseIfWantSoft;
    }

    public static get UseHardAsserts(): boolean {
        return Asserts._useHardAsserts;
    }

    //----------------------------------------- REUSABLE HELPER TO CHOOSE BETWEEN HARD OR SOFT ASSERT -----------------------------------------

    private static runAssertion(
        doHardAssertion: boolean,
        hardAssertion: () => void,
        softAssertion: () => void,
        originAssertMethodName: string,
        message: string,
        assertionMessage: string
    ): boolean {
        if (doHardAssertion && this.UseHardAsserts) {
            hardAssertion();
            return true;
        }

        softAssertion();

        try {
            hardAssertion();
            return true;
        } catch (error) {
            AssertionsHandler.reportError(
                originAssertMethodName,
                AssertionsHandler.ensureError(error),
                message,
                assertionMessage
            );
            return false;
        }
    }

    //----------------------------------------- INTENTIONALLY FORCE A FAILURE (e.g. unsupported SWITCH scenario) -----------------------------------------

    public static assertFail(message: string): void {
        let error : Error = new Error("Test case FAILED! " + message);
        AssertionsHandler.throwError("assertFail", error, message, "Test case should not fail.");
    }
    
    //----------------------------------------- BOUNDARY TESTING -----------------------------------------

    public static assertNumberGreaterThanOrEqual(valueBigger: number, valueSmaller: number, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(valueBigger).toBeGreaterThanOrEqual(valueSmaller), () => expect.soft(valueBigger).toBeGreaterThanOrEqual(valueSmaller), "assertNumberGreaterThanOrEqual", message, "[" + valueBigger + "] should be greater or equal to [" + valueSmaller + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + valueBigger + "] is greater or equal to [" + valueSmaller + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertNumberGreaterThanOrEqual", AssertionsHandler.ensureError(error), message, "[" + valueBigger + "] should be greater or equal to [" + valueSmaller + "]");
        }
    }

    public static assertNumberGreaterThan(valueBigger: number, valueSmaller: number, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(valueBigger).toBeGreaterThan(valueSmaller), () => expect.soft(valueBigger).toBeGreaterThan(valueSmaller), "assertNumberGreaterThan", message, "[" + valueBigger + "] should be greater than [" + valueSmaller + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + valueBigger + "] is greater than [" + valueSmaller + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertNumberGreaterThan", AssertionsHandler.ensureError(error), message, "[" + valueBigger + "] should be greater than [" + valueSmaller + "]");
        }
    }

    public static assertNumberLessThanOrEqual(valueSmaller: number, valueBigger: number, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(valueSmaller).toBeLessThanOrEqual(valueBigger), () => expect.soft(valueSmaller).toBeLessThanOrEqual(valueBigger), "assertNumberLessThanOrEqual", message, "[" + valueSmaller + "] should be less or equal to [" + valueBigger + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + valueSmaller + "] is less or equal to [" + valueBigger + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertNumberLessThanOrEqual", AssertionsHandler.ensureError(error), message, "[" + valueSmaller + "] should be less or equal to [" + valueBigger + "]");
        }
    }

    public static assertNumberLessThan(valueSmaller: number, valueBigger: number, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(valueSmaller).toBeLessThan(valueBigger), () => expect.soft(valueSmaller).toBeLessThan(valueBigger), "assertNumberLessThan", message, "[" + valueSmaller + "] should be less than [" + valueBigger + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + valueSmaller + "] is less than [" + valueBigger + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertNumberLessThan", AssertionsHandler.ensureError(error), message, "[" + valueSmaller + "] should be less than [" + valueBigger + "]");
        }
    }

    public static assertIntegerWithinRange(value: number, minimum: number, maximum: number, message: string, doHardAssertion : boolean = true): void {
        let assertionMessage: string = `The provided number '${value}' should be a valid integer within range [${minimum}-${maximum}].`;
        //assertionMessage = this.addPrefixIfApplicable(message);

        const condition: boolean = value !== undefined && value !== null && Number.isInteger(value) && value >= minimum && value <= maximum;

        try {
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertIntegerWithinRange", message, assertionMessage)) return;
            AssertionsHandler.logAssertMessage(`Assert PASSED! The provided number '${value}' is a valid integer within range [${minimum}-${maximum}]. ${message}`);
        } catch (error) {
            AssertionsHandler.throwError("assertIntegerWithinRange", AssertionsHandler.ensureError(error), message, assertionMessage);
        }
    }

    public static assertIntegerIsPositive(value: number, message: string, doHardAssertion : boolean = true): void {
        const assertionMessage: string = `The provided number '${value}' should be a valid POSITIVE integer (within range [1-infinite]).`;
        const condition: boolean = value !== undefined && value !== null && Number.isInteger(value) && value >= 1;

        try {
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertIntegerIsPositive", message, assertionMessage)) return;
            AssertionsHandler.logAssertMessage(`Assert PASSED! The provided number '${value}' is a valid positive integer. ${message}`);
        } catch (error) {
            AssertionsHandler.throwError("assertIntegerIsPositive", AssertionsHandler.ensureError(error), message, assertionMessage);
        }
    }

    public static assertTextGreaterThanOrEqual(stringZ: string, stringA: string, message: string, doHardAssertion : boolean = true): void {
        try {
            // Number is negative when LEFT comes BEFORE RIGHT (L=Apple, R=Orange)
            const condition = stringA.localeCompare(stringZ) <= 0;
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertTextGreaterThanOrEqual", message, "[" + stringZ + "] should be greater or equal to [" + stringA + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + stringZ + "] is greater or equal to [" + stringA + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertTextGreaterThanOrEqual", AssertionsHandler.ensureError(error), message, "[" + stringZ + "] should be greater or equal to [" + stringA + "]");
        }
    }

    public static assertTextLessThanOrEqual(stringA: string, stringZ: string, message: string, doHardAssertion : boolean = true): void {
        try {
            // Number is negative when LEFT comes BEFORE RIGHT (L=Apple, R=Orange)
            const condition = stringA.localeCompare(stringZ) <= 0;
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertTextLessThanOrEqual", message, "[" + stringA + "] should be less or equal to [" + stringZ + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + stringA + "] is less or equal to [" + stringZ + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertTextLessThanOrEqual", AssertionsHandler.ensureError(error), message, "[" + stringA + "] should be less or equal to [" + stringZ + "]");
        }
    }

    public static assertDateGreaterThanOrEqual(dateA: Date, dateZ: Date, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(dateA.getTime()).toBeGreaterThanOrEqual(dateZ.getTime()), () => expect.soft(dateA.getTime()).toBeGreaterThanOrEqual(dateZ.getTime()), "assertDateGreaterThanOrEqual", message, "[" + dateA + "] should be greater or equal to [" + dateZ + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + dateA + "] is greater or equal to [" + dateZ + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertDateGreaterThanOrEqual", AssertionsHandler.ensureError(error), message, "[" + dateA + "] should be greater or equal to [" + dateZ + "]");
        }   
    }

    public static assertDateLessThanOrEqual(dateZ: Date, dateA: Date, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(dateZ.getTime()).toBeLessThanOrEqual(dateA.getTime()), () => expect.soft(dateZ.getTime()).toBeLessThanOrEqual(dateA.getTime()), "assertDateLessThanOrEqual", message, "[" + dateZ + "] should be less or equal to [" + dateA + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + dateZ + "] is less or equal to [" + dateA + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertDateLessThanOrEqual", AssertionsHandler.ensureError(error), message, "[" + dateZ + "] should be less or equal to [" + dateA + "]");
        }
    }

    public static assertStringIsNumberGreaterThan(valueAsString: string, minValue: number, message: string, doHardAssertion : boolean = true): void {
        try {
            const numericValue = parseFloat(valueAsString);
            if (!this.runAssertion(doHardAssertion, () => expect(numericValue).toBeGreaterThan(minValue), () => expect.soft(numericValue).toBeGreaterThan(minValue), "assertStringIsNumberGreaterThan", message, "String should be a number greater than " + minValue + ".")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! '" + valueAsString + "' String is a number greater than " + minValue + ": " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertStringIsNumberGreaterThan", AssertionsHandler.ensureError(error), message, "String should be a number greater than " + minValue + ".");
        }
    }

    public static assertNumberIncreasedByOne(originalValue: number, newValue: number, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(newValue).toBe(originalValue + 1), () => expect.soft(newValue).toBe(originalValue + 1), "assertNumberIncreasedByOne", message, "Number should have increased by exactly one from original value: [" + originalValue + "] to new value: [" + (originalValue + 1) + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Number increased by exactly one. Original value: [" + originalValue + "], New value: [" + newValue + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertNumberIncreasedByOne", AssertionsHandler.ensureError(error), message, "Number should have increased by exactly one from original value: [" + originalValue + "] to new value: [" + (originalValue + 1) + "]");
        }
    }

    public static assertNumberDecreasedByOne(originalValue: number, newValue: number, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(newValue).toBe(originalValue - 1), () => expect.soft(newValue).toBe(originalValue - 1), "assertNumberDecreasedByOne", message, "Number should have decreased by exactly one from original value: [" + originalValue + "] to new value: [" + (originalValue - 1) + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Number decreased by exactly one. Original value: [" + originalValue + "], New value: [" + newValue + "], " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertNumberDecreasedByOne", AssertionsHandler.ensureError(error), message, "Number should have decreased by exactly one from original value: [" + originalValue + "] to new value: [" + (originalValue - 1) + "]");
        }
    }

    //----------------------------------------- BINARY TESTING -----------------------------------------

    public static assertTrue(condition: boolean, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertTrue", message, "Condition should be true.")) return;

            AssertionsHandler.logAssertMessage("Assert PASSED! Condition is true: " + message);
        } catch (error) {
            AssertionsHandler.throwError(
                "assertTrue", AssertionsHandler.ensureError(error), message, "Condition should be true."
            );
        }
    }

    public static assertFalse(condition: boolean, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(false), () => expect.soft(condition).toBe(false), "assertFalse", message, "Condition should be false.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Condition is false: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertFalse", AssertionsHandler.ensureError(error), message, "Condition should be false.");
        }
    }

    //----------------------------------------- CONTAINS TESTING -----------------------------------------

    public static assertStringContains(outerString: string, innerString: string, message: string, doHardAssertion : boolean = true): void {
        try {
            const condition = outerString.includes(innerString);
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertStringContains", message, "[" + innerString + "] should be contained within [" + outerString + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + innerString + "] is contained within [" + outerString + "] " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertStringContains", AssertionsHandler.ensureError(error), message, "[" + innerString + "] should be contained within [" + outerString + "]");
        }
    }

    public static assertStringDoesNotContain(outerString: string, innerString: string, message: string, doHardAssertion : boolean = true): void {
        try {
            const condition = outerString.includes(innerString);
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(false), () => expect.soft(condition).toBe(false), "assertStringDoesNotContain", message, "[" + innerString + "] should NOT be contained within [" + outerString + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + innerString + "] is not contained within [" + outerString + "] " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertStringDoesNotContain", AssertionsHandler.ensureError(error), message, "[" + innerString + "] should NOT be contained within [" + outerString + "]");
        }
    }

    public static assertArrayContains(array: any[], item: any, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(array).toContain(item), () => expect.soft(array).toContain(item), "assertArrayContains", message, "Array should contain the item.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Array contains item: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertArrayContains", AssertionsHandler.ensureError(error), message, "Array should contain the item.");
        }
    }

    public static assertArrayDoesNotContain(array: any[], item: any, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(array).not.toContain(item), () => expect.soft(array).not.toContain(item), "assertArrayDoesNotContain", message, "Array should NOT contain the item.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Array does not contain item: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertArrayDoesNotContain", AssertionsHandler.ensureError(error), message, "Array should NOT contain the item.");
        }
    }

    //----------------------------------------- EQUALITY TESTING -----------------------------------------

    public static assertEquals(expectedValue: number | string, actualValue: number | string, message: string, doHardAssertion : boolean = true): void {
        try {            
            if (!this.runAssertion(doHardAssertion, () => expect(actualValue).toBe(expectedValue), () => expect.soft(actualValue).toBe(expectedValue), "assertEquals", message, "[" + actualValue + "] should be equal to [" + expectedValue + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + expectedValue + "] is equal to [" + actualValue + "] " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertEquals", AssertionsHandler.ensureError(error), message, "[" + actualValue + "] should be equal to [" + expectedValue + "]");
        }
    }

    public static assertNotEquals(value1: number | string, value2: number | string, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(value2).not.toBe(value1), () => expect.soft(value2).not.toBe(value1), "assertNotEquals", message, "[" + value2 + "] should NOT be equal to [" + value1 + "]")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! [" + value1 + "] is not equal to [" + value2 + "] " + message);
        } catch (error) {
            AssertionsHandler.throwError(
                "assertNotEquals",
                AssertionsHandler.ensureError(error),
                message,
                "[" + value2 + "] should NOT be equal to [" + value1 + "]"
            );
        }
    }

    public static assertObjectsEqual(expectedObject: object, actualObject: object, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(actualObject).toEqual(expectedObject), () => expect.soft(actualObject).toEqual(expectedObject), "assertObjectsEqual", message, "Objects should be equal.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Objects are equal: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertObjectsEqual", AssertionsHandler.ensureError(error), message, "Objects should be equal.");
        }
    }

    public static assertObjectsNotEqual(object1: object, object2: object, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(object1).not.toEqual(object2), () => expect.soft(object1).not.toEqual(object2), "assertObjectsNotEqual", message, "Objects should NOT be equal.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Objects are not equal: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertObjectsNotEqual", AssertionsHandler.ensureError(error), message, "Objects should NOT be equal.");
        }
    }

    //----------------------------------------- NULLNESS TESTING -----------------------------------------

    public static assertStringNullOrEmpty(text: string, message: string, doHardAssertion : boolean = true): void {
        try {
            const condition = TestUtilities.isNullOrEmpty(text);
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(true), () => expect.soft(condition).toBe(true), "assertStringNullOrEmpty", message, "String should be null or empty.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! String is null or empty: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertStringNullOrEmpty", AssertionsHandler.ensureError(error), message, "String should be null or empty.");
        }
    }

    public static assertStringNotNullNorEmpty(text: string, message: string, doHardAssertion : boolean = true): void {
        try {
            const condition = TestUtilities.isNullOrEmpty(text);
            if (!this.runAssertion(doHardAssertion, () => expect(condition).toBe(false), () => expect.soft(condition).toBe(false), "assertStringNotNullNorEmpty", message, "String should NOT be null nor empty.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! String is not null nor empty: " + message + " --> " + text);
        } catch (error) {
            AssertionsHandler.throwError("assertStringNotNullNorEmpty", AssertionsHandler.ensureError(error), message, "String should NOT be null nor empty.");
        }
    }

    public static assertObjectNull(object: Object, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(object).toBeNull(), () => expect.soft(object).toBeNull(), "assertObjectNull", message, "Object should be null.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Object is null: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertObjectNull", AssertionsHandler.ensureError(error), message, "Object should be null.");
        }
    }

    public static assertObjectNotNull(object: Object, message: string, doHardAssertion : boolean = true): void {
        try {
            if (!this.runAssertion(doHardAssertion, () => expect(object).not.toBeNull(), () => expect.soft(object).not.toBeNull(), "assertObjectNotNull", message, "Object should NOT be null.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Object is not null: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertObjectNotNull", AssertionsHandler.ensureError(error), message, "Object should NOT be null.");
        }
    }

    //----------------------------------------- OTHER TESTING -----------------------------------------

    public static assertTruthy(result: any, message: string, doHardAssertion : boolean = true): void {
        try {
            //Ensures that value is true in a boolean context, anything but false, 0, '', null, undefined or NaN. Use this method when you don't care about the specific value.
            if (!this.runAssertion(doHardAssertion, () => expect(result).toBeTruthy(), () => expect.soft(result).toBeTruthy(), "assertTruthy", message, "Result should be truthy.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Result is truthy: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertTruthy", AssertionsHandler.ensureError(error), message, "Result should be truthy.");
        }
    }

    public static assertCorrectZodSchema(jsonResponseFromApi: string, schema: z.ZodType, message: string, doHardAssertion: boolean = true): void {
        let isValid = false;
        try {
            const result = schema.safeParse(JSON.parse(jsonResponseFromApi));
            isValid = result.success;
            if (!result.success) {
                result.error.issues.forEach((issue) => {
                    console.error(`Path: ${issue.path.join('.')} — ${issue.message}`);
                });
            }
        } catch (error) {
            const detail = error instanceof Error ? error.message : String(error);
            console.error(`Invalid JSON response: ${detail}`);
        }

        try {
            if (!this.runAssertion(doHardAssertion, () => expect(isValid).toBe(true), () => expect.soft(isValid).toBe(true), "assertCorrectZodSchema", message, "Result should be valid when JSON corresponds to the provided Zod schema.")) return;
            AssertionsHandler.logAssertMessage("Assert PASSED! Result is valid when JSON corresponds to correct Zod schema: " + message);
        } catch (error) {
            AssertionsHandler.throwError("assertCorrectZodSchema", AssertionsHandler.ensureError(error), message, "Result should be valid when JSON corresponds to the provided Zod schema.");
        }
    }
}
