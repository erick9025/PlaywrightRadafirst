import { test } from "@playwright/test";
import { Actor } from "../../screenplay/core/Actor";
import { BrowseTheWeb } from "../../screenplay/abilities/BrowseTheWeb";
import type { IEmailTask } from "../../screenplay/tasks/email/IEmailTask";
import { LoginToMailinator } from "../../screenplay/tasks/email/LoginToMailinator";
import { LoginToGmail } from "../../screenplay/tasks/email/LoginToGmail";
import { OpenEmail } from "../../screenplay/tasks/email/OpenEmail";

/*
  ╔══════════════════════════════════════════════════════════════╗
  ║       SCREENPLAY PATTERN — Email Provider Tests             ║
  ║                                                              ║
  ║  Demonstrates polymorphism through the Task interface:      ║
  ║  swap LoginToMailinator ↔ LoginToGmail with ONE line.       ║
  ╚══════════════════════════════════════════════════════════════╝
*/

test.describe("Email Providers – Screenplay Pattern", () => {

    let emailUser: Actor;

    test.beforeEach(async ({ page }) => {
        emailUser = Actor.named("EmailUser").whoCan(BrowseTheWeb.using(page));
    });

    // ─────────────────────────────────────────────────────────
    // Test: Login to Gmail and search for an email
    // Change loginTask to LoginToMailinator to switch providers
    // ─────────────────────────────────────────────────────────
    test.skip("Login to Gmail inbox and search for email", async () => {
        // Polymorphism: swap this line to change providers
        const loginTask: IEmailTask = LoginToGmail.withCredentials("juanito.perez@gmail.com", "Pa$$word1234");
        // const loginTask: IEmailTask = LoginToMailinator.withCredentials("juanito.perez@example.com", "Pa$$word1234");

        await emailUser.attemptsTo(
            loginTask,
            OpenEmail.withSubject("2026 Fifa World Cup").from("fifa2026@fifa.com")
        );
    });

    // ─────────────────────────────────────────────────────────
    // Test: Login to Mailinator inbox
    // ─────────────────────────────────────────────────────────
    test.skip("Login to Mailinator inbox and search for email", async () => {
        const loginTask: IEmailTask = LoginToMailinator.withCredentials("juanito.perez@example.com", "Pa$$word1234");

        await emailUser.attemptsTo(
            loginTask,
            OpenEmail.withSubject("2026 Fifa World Cup").from("fifa2026@fifa.com")
        );
    });
});
