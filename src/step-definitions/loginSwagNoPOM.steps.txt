import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';

const { Given, When, Then } = createBdd();

Given("We are on the Swag login page", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

When(
  "We login to Swag with username {string} and password {string}",
  async ({ page }, username: string, password: string) => {
    await page.fill("#user-name", username);
    await page.fill("#password", password);
    await page.click("#login-button,.submit-button");
  }
);

Then("We should be redirected to the Swag dashboard", async ({ page }) => {
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
