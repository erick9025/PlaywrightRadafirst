import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 6_000, // Global timeout for all tests in milliseconds (default is 30 seconds)
  expect: {
    timeout: 1_000
  },
  reporter: [['html', { open: 'always' }]],
  use: {
    trace: 'on', // or 'on'
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
