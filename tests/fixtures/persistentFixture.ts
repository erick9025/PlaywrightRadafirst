import { test as base, chromium, Page } from '@playwright/test';

export const test = base.extend<{
  persistentPage: Page | undefined;
}>({
  persistentPage: async ({}, use, testInfo) => {
    if (testInfo.project.name !== 'persistent-chrome') {
      await use(undefined);
      return;
    }

    const context = await chromium.launchPersistentContext(
      'C:/Users/erick.jimenez/AppData/Local/Google/Chrome/User Data',
      //'C:/ErickAutomation/ChromeProfiles/Default',
      {
        channel: 'chrome',
        args: ['--profile-directory=Default'],
        headless: false,
      }
    );

    try {
      const page = await context.newPage();
      await use(page);
    } 
    finally {
      await context.close();
    }
  },
});