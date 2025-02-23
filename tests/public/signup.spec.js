import { test, expect } from '@playwright/test';
import { Signup } from '../../pages/Signup';
import 'dotenv/config';

test.describe('User Sign up Test',()=>{
      
      let signup;

      test.beforeEach('Navigate to home page ', async({page})=>{
         signup = new Signup(page);
         // Navigate to the home page
         await signup.gotoHomePage();
         await signup.cookiesAccepted();
         await signup.header.signupLink.click();
         await page.waitForLoadState('networkidle');
      })

      test('Sign up test successfully', async({page})=>{

        //destructuring the .ev variables for clarity
        const {
            FIRSTNAME = '',
            LASTNAME = '',
            EMAIL = '',
            PASSWORD = '',
            CONFIRM_PASSWORD = '',
        } = process.env;
        
        // Perform signup with valid credentials
        const fullName = `${FIRSTNAME} ${LASTNAME}`;
        await signup.signUp(fullName,EMAIL,PASSWORD,CONFIRM_PASSWORD);

        //Wait for the page to handle login 
        await page.waitForTimeout(2000);

        // Validate successful signup.
        await expect(page.getByRole('link',{name: `Welcome ${process.env.FIRSTNAME} `})).toBeVisible();

        // signup and login button not appearing assertion
        await expect(page.locator('text=Sign Up')).not.toBeVisible();
        await expect(page.locator('text=Login')).not.toBeVisible();

      })

      // ─────────────────────────────────────────────────────────────────────────────────
  // NEGATIVE / FAIL TEST CASES
  // ─────────────────────────────────────────────────────────────────────────────────

  // 1. Missing one or more fields
  test('Sign up test fail - missing required fields', async ({ page }) => {
    // Example: pass empty strings to replicate missing fields
    await signup.signUp('', '', '', '');

    // Wait to see if error messages appear
    await page.waitForTimeout(1000);

    // Assertions:
    // - Confirm user stays on signup page
    // - Check for an error message or that "Welcome" link is not shown
    await expect(page.getByText('Please enter your name').first()).toBeVisible();
    await expect(page.getByText('Please enter your email').first()).toBeVisible();

    // Alternatively, confirm that the "Welcome" link is not visible
    await expect(page.getByRole('link', { name: /Welcome/i })).toHaveCount(0);
  });

  // Invalid email format
  test('Sign up test fail - invalid email format', async ({ page }) => {
    const firstName = 'Daniel';
    const lastName = 'Gg';
    const invalidEmail = 'danielgrg2020'; // no @ or domain
    const password = 'Password123';
    const confirmPassword = 'Password123';

    const fullName = `${firstName} ${lastName}`;
    await signup.signUp(fullName, invalidEmail, password, confirmPassword);

    await page.waitForTimeout(1000);

    // Check for a specific error message about invalid email
    await expect(page.getByText(/invalid email/i)).toBeVisible();

    // Or confirm that we did not navigate away
    await expect(page.getByRole('link', { name: /Welcome/i })).toHaveCount(0);
  });

  // Password mismatch
  test('Sign up test fail - password mismatch', async ({ page }) => {
    const firstName = 'Daniel';
    const lastName = 'Gg';
    const email = 'danielgrg22@gmail.com';
    const password = 'Password123';
    const confirmPassword = 'DifferentPassword123';

    const fullName = `${firstName} ${lastName}`;
    await signup.signUp(fullName, email, password, confirmPassword);

    await page.waitForTimeout(1000);

    // Check for mismatch error message
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Welcome/i })).toHaveCount(0);
  });

  // Password too short (assuming there's a minimum length policy)
  test('Sign up test fail - short password', async ({ page }) => {
    const firstName = 'Daniel';
    const lastName = 'Gg';
    const email = 'danielgrg22@gmail.com';
    const password = '123'; // Deliberately too short
    const confirmPassword = '123';

    const fullName = `${firstName} ${lastName}`;
    await signup.signUp(fullName, email, password, confirmPassword);

    await page.waitForTimeout(1000);

    // Assertion: error message about password length
    await expect(page.getByText(/password must be at least/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Welcome/i })).toHaveCount(0);
  });

  // Missing uppercase letter
  test('Sign up fail - password missing uppercase', async ({ page }) => {
    // All lowercase except the numeric & special char
    // e.g. 'abc12!'
    await signup.signUp(
      'David Gg',
      'davidgg22@gmail.com',
      'abc12!',
      'abc12!'
    );
    await page.waitForTimeout(1000);

    // Example assertion if site says "A capital (uppercase) letter" is missing
    await expect(page.getByText(/A capital \(uppercase\) letter/i)).toBeVisible();
  });

  // Missing lowercase letter
  test('Sign up fail - password missing lowercase', async ({ page }) => {
    // All uppercase except numeric & special char
    // e.g. 'ABC12!'
    await signup.signUp(
      'David Gg',
      'davidgg22@gmail.com',
      'ABC12!',
      'ABC12!'
    );
    await page.waitForTimeout(1000);

    // App might show a "A lowercase letter is missing" error
    await expect(page.getByText(/A lowercase letter/i)).toBeVisible();
  });

  // Missing special character
  test('Sign up fail - password missing special char', async ({ page }) => {
    // Contains uppercase, lowercase, numeric but no special char
    // e.g. 'Abc12345'
    await signup.signUp(
      'David Gg',
      'davidgg22@gmail.com',
      'Abc12345',
      'Abc12345'
    );
    await page.waitForTimeout(1000);

    await expect(page.getByText(/A special character/i)).toBeVisible();
  });

  // Missing numeric digit
  test('Sign up fail - password missing number', async ({ page }) => {
    // Contains uppercase, lowercase, special but no numeric
    // e.g. 'Abcdefg!'
    await signup.signUp(
      'David Gg',
      'davidgg22@gmail.com',
      'Abcdefg!',
      'Abcdefg!'
    );
    await page.waitForTimeout(1000);

    await expect(page.getByText(/A number/i)).toBeVisible();
  });


  // Existing user / duplicate email scenario
  test('Sign up test fail - email already in use', async ({ page }) => {
    //destructuring the .ev variables for clarity
    const {
        FIRSTNAME = '',
        LASTNAME = '',
        EMAIL = '',
        PASSWORD = '',
        CONFIRM_PASSWORD = '',
    } = process.env;

    const fullName = `${FIRSTNAME} ${LASTNAME}`;
    await signup.signUp(fullName,EMAIL,PASSWORD,CONFIRM_PASSWORD);

    await page.waitForTimeout(1000);

    // Check for a message indicating email is already registered
    await expect(page.getByText(/already registered/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /Welcome/i })).toHaveCount(0);
  });

  // Sign up with Facebook
  test('Sign up with Facebook Account', async({page})=>{
    await signup.signupWithFacebook();

    //Wait for the popup to finish loading
    await page.waitForLoadState('networkidle');

    //Assert the popup’s URL is indeed Facebook (or at least includes "facebook.com")
    await expect(page).toHaveURL(/facebook\.com/i);

  })

  // Sign up with Google Account
  test('Sign up with Google Account', async({page})=>{
    await signup.signUpWithGoogle();

    //Wait for the popup to finish loading
    await page.waitForLoadState('networkidle');

    //Assert the popup’s URL is indeed Google (or at least includes "google.com")
    await expect(page).toHaveURL(/google\.com/i);

  })

  // Navigate to Login page using Login link
  test('Navigate to Login page using Login link', async({page})=>{
    await signup.gotoLoginPage();

    //Wait for the popup to finish loading
    await page.waitForLoadState('networkidle');

    //Assert the popup’s URL is indeed Google (or at least includes "google.com")
    await expect(page).toHaveURL(/login/);
  })
      
    

})