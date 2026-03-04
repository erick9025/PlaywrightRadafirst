import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { SwagLoginPage } from "../pom/pages/pagesByFeature/swagLoginPage";

const { Given, When, Then } = createBdd();

Given("I am on the Swag login page", async ({ page }) => {
  const loginPage = new SwagLoginPage(page);
  await loginPage.goTo();
});

When(
  "I login to Swag with username {string} and password {string}",
  async ({ page }, username: string, password: string) => {
    const loginPage = new SwagLoginPage(page);
    await loginPage.login(username, password);
  }
);

Then("I should be redirected to the Swag dashboard", async ({ page }) => {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
