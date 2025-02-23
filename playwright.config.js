import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Define __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authStatePath = path.resolve(__dirname, 'playwright/authState/user.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: process.env.CI ? 2 : 2,
  reporter: 'html',

  use: {
    // headless: process.env.CI ? true : false,
    headless: true ,
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
      name: 'setup', // Setup project for authentication
      testDir: './tests/setup',
      testMatch: '**/*.setup.js',
    },

  // AUTHENTICATED TESTS FOR CHROMIUM
    {
      name: 'authenticated-chromium', // Runs only authenticated tests
      testDir: './tests/authenticated',
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
        storageState: authStatePath,
      },
      dependencies: ['setup'],
    },
    // UNAUTHENTICATED TESTS FOR CHROMIUM
    {
      name: 'unauthenticated-chromium', //Runs only authenticated tests
      testDir: './tests/public',
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
        storageState:  { cookies: [], origins: [] },
      },
      dependencies: ['setup'],
    },
    {
      name: 'authenticated-firefox',
      testDir: './tests/public',

      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        storageState: authStatePath,
      },
      dependencies: ['setup'],
    },
    // AUTHENTICATED TESTS FOR FIREFOX
    {
      name: 'authenticated-firefox',
      testDir: './tests/public',

      use: {
        ...devices['Desktop Firefox'],
        browserName: 'firefox',
        storageState: authStatePath,
      },
      dependencies: ['setup'],
    },
    // UNAUTHENTICATED TESTS FOR FIREFOX
    {
      name: 'unauthenticated-firefox',
      testDir: './tests/public',
      use: {
        ...devices['Desktop Firefox'],
        storageState: { cookies: [], origins: [] },
      },
    },

    // AUTHENTICATED TESTS FOR WEBKIT
    {
      name: 'authenticated-webkit',
      testDir: './tests/authenticated',
      use: {
        ...devices['Desktop Safari'],
        storageState: authStatePath,
      },
      dependencies: ['setup'],
    },

    // UNAUTHENTICATED TESTS FOR WEBKIT
    {
      name: 'unauthenticated-webkit',
      testDir: './tests/public',
      use: {
        ...devices['Desktop Safari'],
        storageState: { cookies: [], origins: [] },
      },
    },
  ],
});
