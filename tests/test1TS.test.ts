import { test, expect } from '@playwright/test';

/////////////////////////////////////////////////////////// TESTS START HERE ///////////////////////////////////////////////////////////
test("My very first test with Facebook and TypeScript", async ({ page }) => {
  // Navigate to Facebook
  await page.goto("https://www.facebook.com");

  // Open registration form
  await page.locator("[data-testid='open-registration-form-button']").click();

  // Fill user information
  await page.locator("[name='firstname']").fill("Erick");
  await page.locator("[name='lastname']").fill("Jiménez");

  console.log('Test completed using TypeScript by ERICK JIMENEZ');
});