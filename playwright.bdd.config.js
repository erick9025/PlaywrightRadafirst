import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: ['src/step-definitions/**/*.ts', 'src/support/hooks.ts'],
});

export default defineConfig({
  testDir,
  // Applies to the complete BDD scenario, including hooks and Playwright cleanup.
  timeout: 15_000,
  // A retry identifies intermittent failures without slowing successful runs.
  retries: 1,
  expect: {
    timeout: 10_000
  },
  reporter: [
    ['html', { open: 'always' }]
  ],
  use: {
    actionTimeout: 5_000,
    navigationTimeout: 10_000,
    // Record a trace for the retry of a flaky test. This preserves diagnostic
    // history without the teardown delay caused by tracing every attempt.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Video recording requires Playwright's optional FFmpeg download. Keep the
    // lightweight diagnostics enabled so a missing FFmpeg binary cannot stop a run.
    video: 'off',
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
