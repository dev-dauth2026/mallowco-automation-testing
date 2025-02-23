import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import fs from 'fs';
import { Login } from '../../pages/Login';

// Fix for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure "visible" authState directory
const authStateDir = path.join(__dirname, '../playwright/authState');
export const authFile = path.join(authStateDir, 'user.json');

setup('Authenticate User', async ({ page }) => {

  // Ensure the authState directory exists
  if (!fs.existsSync(authStateDir)) {
    fs.mkdirSync(authStateDir, { recursive: true });
  }

  // Initialize the Login class properly
  let login = new Login(page);

  if (!process.env.TEST_URL) {
    throw new Error("Missing TEST_URL in environment variables.");
  }

  await page.goto(`${process.env.TEST_URL}login`);

  // Perform login with valid credentials
  await login.login(process.env.EMAIL, process.env.PASSWORD);

  // Wait for login process
  await page.waitForLoadState('networkidle');

  // Verify login was successful
  const isSuccessful = await login.isLoginSuccessful();
  expect(isSuccessful).toBe(true);

  // Save authentication state in visible authState directory
  await page.context().storageState({ path: authFile });

});
