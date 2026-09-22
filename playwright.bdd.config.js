import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'src/features/**/*.feature',
  steps: ['src/step-definitions/**/*.ts', 'src/support/hooks.ts'],
});

export default defineConfig({
  testDir,
  // Applies to the complete BDD scenario, including hooks and Playwright cleanup.
  // Includes trace finalization after each scenario.
  timeout: 45_000,
  // Retry once to preserve evidence for intermittent external-site failures.
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
    // Keep a complete replayable trace for every passed and failed attempt.
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
      },
    },
  ],
});
