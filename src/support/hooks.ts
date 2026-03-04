import { Before, After } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { PlaywrightWorld } from "./world";

Before(async function (this: PlaywrightWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: PlaywrightWorld) {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});