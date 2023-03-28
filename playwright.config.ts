import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  globalSetup: 'config/globalSetup.ts',
  timeout: 200 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 2,
  workers: process.env.CI ? 1 : '50%',
  reporter: [['html', { open: 'on-failure' }]],
  use: {
    actionTimeout: 20000,
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
      },
    },
    // TODO: Add Chromium and Webkit once Optum Restrictions are lifted.
  ],
};

export default config;
