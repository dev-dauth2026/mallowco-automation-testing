import {test,expect} from '@playwright/test'
import { Auth } from '../pages/auth'
require('dotenv').config();

test.describe('User Authentication Test', ()=>{
    test('User login test',async ({page})=>{

        const auth =  new Auth(page);

        await auth.goHomepage();
        await auth.login(process.env.USERNAME, process.env.PASSWORD);
    })
})