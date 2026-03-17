import { test as base } from '@playwright/test';
import { chromium } from 'playwright';

export const test = base.extend<{
  persistentPage: any;
}>({
  persistentPage: async ({}, use, testInfo) => {
    if (testInfo.project.name !== 'persistent-chrome') {
      await use(undefined);
      return;
    }

    const context = await chromium.launchPersistentContext(
      'C:/Users/erick.jimenez/AppData/Local/Google/Chrome/User Data',
      {
        channel: 'chrome',
        args: ['--profile-directory=Default'],
        headless: false,
      }
    );

    const page = await context.newPage();
    await use(page);

    await context.close();
  },
});