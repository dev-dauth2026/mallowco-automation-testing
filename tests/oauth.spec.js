import {test,expect} from '@playwright/test'
import { Login } from '../pages/Login'
import 'dotenv/config';

test.describe('User Authentication Test', ()=>{
    let auth;

    test.beforeEach('Navigate to Home Page ',async({page})=>{
        login =  new Login(page);

        // Navigate to the home page
        await login.goHomepage();
    });

    test('User login successful',async ({page})=>{
        
        // Perform login with valid credentials
        await login.login(process.env.EMAIL, process.env.PASSWORD);

        //Wait for the page to handle login 
        await page.waitForTimeout(2000);

        const isSuccessful = await login.isLoginSuccessful();
        expect(isSuccessful).toBe(true);
    });

    test('User login fail',async({page})=>{
        
        // Perform login with invalid credentials
        await login.login('david2020g@gmail.com','dav1234#')
        
        // Wait for the page to handle login
        await page.waitForTimeout(2000);

        const isSuccessful = await login.isLoginSuccessful();
        const isErrorMessageVisible = await login.isErrorMessageVisible();

        expect(isSuccessful).toBe(false);
        expect(isErrorMessageVisible).toBe(true);
    })
})