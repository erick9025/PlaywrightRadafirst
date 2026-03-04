import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PlaywrightWorld } from "../support/world";
import { SwagLoginPage } from "../pom/pages/pagesByFeature/swagLoginPage";

Given("I am on the Swag login page", async function (this: PlaywrightWorld) {
  const loginPage = new SwagLoginPage(this.page);
  await loginPage.goTo();
});

When(
  "I login to Swag with username {string} and password {string}",
  async function (this: PlaywrightWorld, username: string, password: string) {
    const loginPage = new SwagLoginPage(this.page);
    await loginPage.login(username, password);
  }
);

Then("I should be redirected to the Swag dashboard", async function (this: PlaywrightWorld) {
  await expect(this.page).toHaveURL("inventory");
});