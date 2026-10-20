import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 8,
  timeout: 22_000, // Global timeout for all tests in milliseconds (default is 30 seconds)
  expect: {
    timeout: 5_000
  },
  reporter: [
    ['html', { open: 'always' }]
  ],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
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
