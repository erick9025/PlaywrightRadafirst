import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 6_000, // Global timeout for all tests in milliseconds (default is 30 seconds)
  expect: {
    timeout: 1_000
  },
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on', // Options: 'on', 'off', 'retain-on-failure', 'on-first-retry'
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    /*{
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }*/
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    }/*
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    }*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
