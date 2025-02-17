import {test,expect} from '@playwright/test'
import { Auth } from '../pages/Login'
import 'dotenv/config';

test.describe('User Authentication Test', ()=>{
    let auth;

    test.beforeEach('Navigate to Home Page ',async({page})=>{
        auth =  new Auth(page);

        // Navigate to the home page
        await auth.goHomepage();
    });

    test('User login successful',async ({page})=>{
        
        // Perform login with valid credentials
        await auth.login(process.env.EMAIL, process.env.PASSWORD);

        //Wait for the page to handle login 
        await page.waitForTimeout(2000);

        const isSuccessful = await auth.isLoginSuccessful();
        expect(isSuccessful).toBe(true);
    });

    test('User login fail',async({page})=>{
        
        // Perform login with invalid credentials
        await auth.login('david2020g@gmail.com','dav1234#')
        
        // Wait for the page to handle login
        await page.waitForTimeout(2000);

        const isSuccessful = await auth.isLoginSuccessful();
        const isErrorMessageVisible = await auth.isErrorMessageVisible();

        expect(isSuccessful).toBe(false);
        expect(isErrorMessageVisible).toBe(true);
    })
})