import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { Browser, BrowserContext, Page } from "@playwright/test";

export class PlaywrightWorld extends World {
  browser!: Browser; // firefox, chrome or safari
  context!: BrowserContext; // session or windown
  page!: Page; // page or tab

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(PlaywrightWorld);