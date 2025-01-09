import {test,expect} from "@playwright/test"
import { Cart } from '../pages/cart'

test.describe('Cart testing ', ()=>{
    test('Product add to cart test', async({page})=>{

        const cart = new Cart(page);

        await cart.gotoHomePage()

        await cart.addToCart('dauth2026grg@gmail.com', 'D@vid1234#');

        await cart.closePage();

    })
})

