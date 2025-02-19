import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 2 : 2,
  reporter: 'html',

  use: {
    headless: process.env.CI ? true : false,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    permissions: ['geolocation'],
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    locale: 'en-US',
    timezoneId: 'America/Los_Angeles',
    trace: 'on-first-retry',
    screenshot: 'on-first-failure',
    video: 'on-first-failure',
  },
  timeout: 60000,

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-gpu',
          ],
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        launchOptions: {
          args: [],
        },
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        browserName: 'webkit',
        launchOptions: {
          args: [],
        },
      },
    },
  ],

});
