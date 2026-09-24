import { test, Browser, BrowserContext, Page } from '@playwright/test';
import { MailinatorPage } from '../../pom/pages/emailProviders/mailinatorPage';
import { GmailPage } from '../../pom/pages/emailProviders/gmailPage';
import { IEmailProvider } from '../../pom/pages/emailProviders/interfaces/iEmailProvider';

test.describe('Tests for Email pages with Mailinator', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let emailPage: IEmailProvider; // DISGUISE directly as the ONLY INTERFACE related

    ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
    test.beforeAll(async ({ playwright }, testInfo) => {
        // Resolve browser from playwright.config.ts project
        const browserName = testInfo.project.use.browserName!;
        const browserType = playwright[browserName];

        browser = await browserType.launch({
            headless: false,
        });
    });

    test.beforeEach(async () => {
        // Create a BrowserContext (isolated session)
        context = await browser.newContext();

        // Create a Page inside the context
        page = await context.newPage();

        // Use polymorphism to instance as class A or as class B
        emailPage = new MailinatorPage(page); // Class A
    });

    test.afterEach(async () => {
        await context.close();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test("Login to my inbox and search for email 1", async () => {
        await emailPage.goTo();
        await emailPage.login("juanito.perez@gmail.com", "Pa$$word1234");
        await emailPage.openEmail("2026 Fifa World Cup", "fifa2026@fifa.com");
    });
});

test.describe('Tests for Email pages with Gmail', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    let emailPage: IEmailProvider; // DISGUISE directly as the ONLY INTERFACE related

    ////////////////////////////////////////////////////////// BEFORE/AFTER SETUP //////////////////////////////////////////////////////////
    test.beforeAll(async ({ playwright }, testInfo) => {
        // Resolve browser from playwright.config.ts project
        const browserName = testInfo.project.use.browserName!;
        const browserType = playwright[browserName];

        browser = await browserType.launch({
            headless: false,
        });
    });

    test.beforeEach(async () => {
        // Create a BrowserContext (isolated session)
        context = await browser.newContext();

        // Create a Page inside the context
        page = await context.newPage();

        // Use polymorphism to instance as class A or as class B
        emailPage = new GmailPage(page); // Class B
    });

    test.afterEach(async () => {
        await context.close();
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////

    test("Login to my inbox and search for email 2", async () => {
        await emailPage.goTo();
        await emailPage.login("juanito.perez@gmail.com", "Pa$$word1234");
        await emailPage.openEmail("2026 Fifa World Cup", "fifa2026@fifa.com");
    });
});