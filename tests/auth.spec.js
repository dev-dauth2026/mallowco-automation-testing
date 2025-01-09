import { test, expect } from '@playwright/test';
require('dotenv').config();

test.describe('User Authentication Tests', () => {
  test('User log failed', async ({ page }) => {
    await page.goto('https://www.mallowco.com.au/');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByLabel('E-Mail Address *').fill('testuser@gmail.com');
    await page.locator('#login_password').fill('TestPassword123!');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/.*login/);
  });

  test.only('User can log in successfully', async ({ page }) => {
    await page.goto('https://www.mallowco.com.au/');
    
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByLabel('E-Mail Address *').fill('dauth2026grg@gmail.com');
    await page.locator('#login_password').fill('D@vid1234#');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('User log out successfully', async ({page})=>{

    await page.goto('https://www.mallowco.com.au/');
    await page.getByRole('link', { name: 'Login', exact: true }).click();
    await page.getByLabel('E-Mail Address *').click();
    await page.getByLabel('E-Mail Address *').fill(process.env.USERNAME);
    await page.getByLabel('E-Mail Address *').press('Tab');
    await page.locator('#login_password').fill(process.env.PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByText('Welcome David Profile Order History My Referrals Change Password Logout My Cart').click();
    await page.getByRole('link', { name: ' Logout' }).click();
    await expect(page).toHaveURL(/.*/);

  });

  

});
