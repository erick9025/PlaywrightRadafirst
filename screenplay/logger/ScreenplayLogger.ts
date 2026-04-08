import { test } from "@playwright/test";
import chalk from "chalk";

/**
 * Centralized logger for the Screenplay layer.
 * Direct port of the chalk-based logging from TestUtilities + BasePage,
 * restructured as a pure static utility callable from any Interaction or Task.
 *
 * Never call this from the Actor core — logging belongs in Tasks/Interactions.
 */
export class ScreenplayLogger {

    // ----- Timestamp helpers -----

    public static formatTimestamp(): string {
        const now = new Date(); // Exact date+timestamp at the moment the method was called

        const datePart = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        }).format(now);

        const timePart = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }).format(now);

        const ms = now.getMilliseconds().toString().padStart(3, "0");
        const [time, period] = timePart.split(" ");

        return `${datePart} @ ${time}.${ms} ${period}`;
    }

    public static getCurrentTimestamp(): string {
        const d = new Date();
        const pad = (v: number) => v.toString().padStart(2, "0");
        return `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())} @ ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}.${d.getMilliseconds()}`;
    }

    // ----- Log levels -----

    /** Standard info log — white background, timestamp in annotation type. */
    public static log(message: string): void {
        const ts = ScreenplayLogger.formatTimestamp();
        console.log(chalk.bgWhite(`${ts}: ${message}`));
        test.info().annotations.push({ type: ts, description: message });
    }

    /** Bold log — timestamp + message combined into annotation type. */
    public static logBold(message: string): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        console.log(chalk.bgWhite(`${ts}: ${message}`));
        test.info().annotations.push({ type: `${ts} ${message}` });
    }

    /** Important log — highlighted with ⚡ symbols. */
    public static logImportant(message: string, blankLineAfter = true): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        console.log(chalk.bgWhite(`${ts}: ${message}`));
        test.info().annotations.push({ type: " " });
        test.info().annotations.push({ type: `${ts} ⚡⚡⚡${message}⚡⚡⚡` });
        if (blankLineAfter) test.info().annotations.push({ type: " " });
    }

    /** Warning log — highlighted with 🚨 symbols. */
    public static logWarning(message: string, blankLineAfter = true): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        console.log(chalk.bgWhite(`${ts}: ${message}`));
        test.info().annotations.push({ type: " " });
        test.info().annotations.push({ type: `${ts} 🚨🚨🚨${message}⚠️⚠️⚠️` });
        if (blankLineAfter) test.info().annotations.push({ type: " " });
    }

    /** Error log — red background. */
    public static logError(message: string): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        console.error(chalk.bgRed(`${ts}: ${message}`));
        test.info().annotations.push({ type: `ERROR ${ts}`, description: message });
    }

    /** Issue log — attaches to HTML report as a separate annotation + text file. */
    public static logIssue(message: string): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        test.info().annotations.push({ type: "issues", description: `${ts}: ${message}` });
        test.info().attach("issues.txt", {
            body: `${ts}: ${message}`,
            contentType: "text/plain"
        });
    }

    // ----- Task lifecycle markers -----

    /** Marks the start of a high-level Task (green squares 🟩). */
    public static taskStart(taskName: string, detail = ""): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        const label = detail ? `${taskName} [${detail}]` : taskName;
        console.log(chalk.bgWhite(`${ts}: ...Starting task [${label}]`));
        test.info().annotations.push({ type: " " });
        test.info().annotations.push({ type: `${ts} 🟩🟩🟩 ...Starting task [${label}] 🟩🟩🟩` });
    }

    /** Marks the end of a high-level Task (red squares 🟥). */
    public static taskEnd(taskName: string, detail = ""): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        const label = detail ? `${taskName} [${detail}]` : taskName;
        console.log(chalk.bgWhite(`${ts}: ...Ending task [${label}]`));
        test.info().annotations.push({ type: `${ts} 🟥🟥🟥 ...Ending task [${label}] 🟥🟥🟥` });
        test.info().annotations.push({ type: " " });
    }

    /** Marks the start of a low-level Interaction (blue circles 🔵). */
    public static interactionStart(interactionName: string, detail = ""): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        const label = detail ? `${interactionName} [${detail}]` : interactionName;
        console.log(chalk.bgWhite(`${ts}: ...Starting [${label}]`));
        test.info().annotations.push({ type: `${ts} 🔵🔵 ...Starting [${label}]` });
    }

    /** Marks the end of a low-level Interaction (orange circles 🟠). */
    public static interactionEnd(interactionName: string, detail = ""): void {
        const ts = ScreenplayLogger.getCurrentTimestamp();
        const label = detail ? `${interactionName} [${detail}]` : interactionName;
        console.log(chalk.bgWhite(`${ts}: ...Ending [${label}]`));
        test.info().annotations.push({ type: `${ts} 🟠🟠 ...Ending [${label}]` });
    }
}
