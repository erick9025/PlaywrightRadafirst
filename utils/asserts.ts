import { expect } from "@playwright/test";
import { TestUtilities } from "./testUtilities";

export class Asserts {

    // Public methods/asserts TO BE USED OUTSIDE THIS CLASS
    public static assertTrue(condition: boolean, message: string): void {
        try {
            expect(condition).toBe(true);
            TestUtilities.logMessage("Assert PASSED! Condition is true: " + message);
        } 
        catch (error) {
            if (error instanceof Error) {
                this.throwError("assertTrue", error, message, "Condition should be true.");
            }
        }
    }

    public static assertFalse(condition: boolean, message: string): void {
        try {
            expect(condition).toBe(false);
            TestUtilities.logMessage("Assert PASSED! Condition is false: " + message);
        } 
        catch (error) {
            if (error instanceof Error) {
                this.throwError("assertFalse", error, message, "Condition should be false.");
            }
        }
    }

    // Private methods TO BE USED INTERNALLY
    private static throwError(
        originAssertMethodName: string, 
        exception: Error, 
        userMessage: string, 
        assertionMessage: string
    ): void {
        let timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.error(timestamp + ": Assert FAILED! " + originAssertMethodName);
        console.error("Native error type: " + exception.constructor.name);
        console.error("Native error message: " + exception.message);
        console.error("User message: " + userMessage);

        if (!TestUtilities.isNullOrEmpty(assertionMessage)) {
            console.error("Assertion message: " + assertionMessage);
        }

        throw exception;
    }
}