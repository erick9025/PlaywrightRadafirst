import type { Performable } from "../../core/Performable";

/**
 * Marker interface for email-provider Tasks.
 * Allows tests to hold a typed reference that can be swapped between
 * LoginToMailinator and LoginToGmail without changing the test code.
 *
 * Usage:
 *   const loginTask: IEmailTask = new LoginToMailinator(user, pass); // or LoginToGmail
 *   await emailUser.attemptsTo(loginTask);
 */
export interface IEmailTask extends Performable {}
