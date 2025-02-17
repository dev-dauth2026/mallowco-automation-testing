import { test, expect } from '@playwright/test';
import { Signup } from '../pages/Signup';
import 'dotenv/config';

test.describe('User Sign up Test',()=>{
      
      let signup;

      test.beforeEach('Navigate to home page ', async({page})=>{
         signup = new Signup(page);
         await page.setExtraHTTPHeaders({
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        });
         // Navigate to the home page
         await signup.goHomePage();
         await page.waitForTimeout(3000);
         await signup.cookiesAccepted();
         await page.waitForTimeout(3000);
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
      })
      
    

})