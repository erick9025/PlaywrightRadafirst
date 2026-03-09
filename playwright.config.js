import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

export const myEnv = process.env.TEST_ENV || 'dev';

dotenv.config({
  path: `.env.${myEnv}`
})


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
    baseURL: process.env.BASE_URL,
    headless: true,
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