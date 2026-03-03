import type { Actor } from "../../core/Actor";
import type { Performable } from "../../core/Performable";
import { ScreenplayLogger } from "../../logger/ScreenplayLogger";

/**
 * Builder for the OpenEmail Task.
 * Allows fluent syntax: OpenEmail.withSubject("Reset Password").from("noreply@example.com")
 */
class OpenEmailBuilder {
    constructor(private readonly subject: string) {}

    /**
     * Specify the sender email and return the final Performable Task.
     * Pass empty string to accept email from anyone.
     *
     * Usage:
     *   await emailUser.attemptsTo(OpenEmail.withSubject("Fifa 2026").from("fifa2026@fifa.com"))
     */
    public from(senderEmail: string): Performable {
        const subject = this.subject;

        return {
            async performAs(actor: Actor): Promise<void> {
                ScreenplayLogger.taskStart("OpenEmail", subject);

                ScreenplayLogger.log(`Will search for an email with partial subject: ${subject}`);

                if (!ScreenplayLogger.isNullOrEmpty(senderEmail)) {
                    ScreenplayLogger.log(`Email also has to come from: ${senderEmail}`);
                } else {
                    ScreenplayLogger.log("Email can come from anyone");
                }

                // TODO: Implement actual email search and open logic
                // (depends on email provider's DOM structure)

                ScreenplayLogger.taskEnd("OpenEmail", subject);
            }
        };
    }
}

/**
 * High-level Task: search for and open an email by subject and optional sender.
 *
 * Usage:
 *   await emailUser.attemptsTo(OpenEmail.withSubject("2026 Fifa World Cup").from("fifa2026@fifa.com"))
 */
export class OpenEmail {
    private constructor() {}

    public static withSubject(subject: string): OpenEmailBuilder {
        return new OpenEmailBuilder(subject);
    }
}
