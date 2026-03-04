import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PlaywrightWorld } from "../support/world";

Given("We are on the Swag login page", async function (this: PlaywrightWorld) {
  await this.page.goto("https://www.saucedemo.com/");
});

When(
  "We login to Swag with username {string} and password {string}",
  async function (this: PlaywrightWorld, username: string, password: string) {
    await this.page.fill("#user-name", username);
    await this.page.fill("#password", password);
    await this.page.click("#login-button,.submit-button");
  }
);

Then("We should be redirected to the Swag dashboard", async function (this: PlaywrightWorld) {
  //await expect(this.page).toHaveURL("inventory");
  await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
});