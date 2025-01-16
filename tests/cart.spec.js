import {test,expect} from "@playwright/test"
import { Cart } from '../pages/cart'
require('dotenv').config();

test.describe('Cart testing ', ()=>{
    test('Product add to cart test', async({page})=>{

        const cart = new Cart(page);

        await cart.gotoHomePage()

        await cart.addToCart(process.env.EMAIL, process.env.PASSWORD);

        await cart.closePage();

    })
})

