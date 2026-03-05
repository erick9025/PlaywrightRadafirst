import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: ['src/step-definitions/**/*.ts', 'src/support/hooks.ts'],
});

export default defineConfig({
  testDir,
  timeout: 15_000,
  expect: {
    timeout: 1_000
  },
  reporter: [
    ['html', { open: 'always' }]
  ],
  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
});
