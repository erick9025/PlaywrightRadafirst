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
    // Traces are started and attached in the BDD hooks below. Automatic
    // tracing is disabled because its teardown conflicts with this runner.
    trace: 'off',
    screenshot: 'only-on-failure',
    // Video recording requires Playwright's optional FFmpeg download. Keep the
    // lightweight diagnostics enabled so a missing FFmpeg binary cannot stop a run.
    video: 'off'
  }
});
