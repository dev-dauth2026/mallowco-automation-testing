import {test,expect} from '@playwright/test'
import { Auth } from '../pages/auth'
require('dotenv').config();

test.describe('User Authentication Test', ()=>{
    test('User login test',async ({page})=>{

        const auth =  new Auth(page);

        // Navigate to the home page
        await auth.goHomepage();

        // Store the URL before login
        // const beforeLoginURL = await auth.getCurrentUrl();

        
        await auth.login(process.env.USERNAME, process.env.PASSWORD);

        //Wait for the page to handle login 
        await page.waitForTimeout(2000);

        // Store the URL after login
        // const afterLoginURL = await auth.getCurrentUrl();

        // Assert that the URLs are the same before and after login
        // expect(beforeLoginURL).toBe(afterLoginURL);

        const isSuccessful = await auth.isLoginSuccessful();
        expect(isSuccessful).toBe(true);
    })
})