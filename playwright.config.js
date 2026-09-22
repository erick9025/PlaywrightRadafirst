import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  workers: 8,
  timeout: 60_000, // Global timeout for all tests in milliseconds (default is 30 seconds)
  expect: {
    timeout: 10_000
  },
  reporter: [
    ['html', { open: 'always' }]
  ],
  use: {
    trace: 'on', // or 'on'
    screenshot: 'on',
    video: 'retain-on-failure',
  }
});
