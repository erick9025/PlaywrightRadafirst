import { TestUtilities } from "../utils/testUtilities";
import { allKnownPrefixes } from "../utils/constants";

export class AssertionsHandler {
    public static ensureError(value: unknown): Error {
        if (value instanceof Error) {
            return value;
        }
        
        // Convert non-Error values to Error objects
        return new Error(String(value));
    }

    public static reportError(originAssertMethodName: string, exception: Error, userMessage: string, assertionMessage: string = ""): void {
        const timestamp: string = TestUtilities.getCurrentFormattedTimestamp();
        console.error(timestamp + ": Assert FAILED! " + originAssertMethodName);
        console.error("Native error type: " + exception.constructor.name);
        console.error("Native error message: " + exception.message);
        console.error("User message: " + userMessage);

        if (!TestUtilities.isNullOrEmpty(assertionMessage)) {
            console.error("Assertion message: " + assertionMessage);
            this.logAssertMessage(assertionMessage + " --> " + userMessage, false /*isSuccessfulAssert*/);
        }
    }

    public static throwError(originAssertMethodName: string, exception: Error, userMessage: string, assertionMessage: string = ""): void {
        AssertionsHandler.reportError(originAssertMethodName, exception, userMessage, assertionMessage);
        throw exception;
    }

    public static logAssertMessage(message: string, isSuccessfulAssert: boolean = true): void {
        const logSuffixLeft: string = isSuccessfulAssert ? "" : "ERROR ";
        // Move any known prefix found anywhere in the message before the timestamp.
        const suffixes: string[] = [];
        for (const prefix of allKnownPrefixes) {
            if (prefix && message.includes(prefix)) {
                suffixes.push(prefix);
                message = message.split(prefix).join("").trim();
            }
        }

        // Timestamp is local when running locally, is eastern when running on CI.
        const timestamp: string = process.env.CI ? TestUtilities.getCurrentTimestampTransformedToUSEasternTime() : TestUtilities.getCurrentFormattedTimestamp();
        const logSuffixRight = suffixes.length ? suffixes.join(" ") + " " : "";
        console.log(`${timestamp}${logSuffixRight}: ${message}`);
        TestUtilities.safeAnnotationsPush({
            type: `${timestamp}${logSuffixLeft}${logSuffixRight}`,
            description: `${message}`
        });
    }
}
