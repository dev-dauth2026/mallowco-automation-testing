import { test, expect } from '@playwright/test';
import { Signup } from '../pages/Signup';
import 'dotenv/config';

test.describe('User Sign up Test',()=>{
      
      let signup;

      test.beforeEach('Navigate to home page ', async({page})=>{
         signup = new Signup(page);
         // Navigate to the home page
         await signup.gotoHomePage();
         await signup.cookiesAccepted();
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
      
    

})