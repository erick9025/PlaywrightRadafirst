import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 4,
  retries: 2, // Retry failed tests up to 2 times
  timeout: 15_000, // Global timeout for all tests in milliseconds (default is 30 seconds)
  expect: {
    timeout: 1_000
  },
  reporter: [
    ['html', { open: 'always' }],
    ['list'],
    ['json']
  ],
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome', // Real Google Chrome
      },
    },
    /*{
      name: 'Firefox',
      use: {
        browserName: 'firefox',
      },
    },
    {
      name: 'WebKit',
      use: {
        browserName: 'webkit',
      },
    },*/
  ],
});