import {test,expect} from "@playwright/test"
import { Cart } from "../pages/cart";
import { CartModal } from "../pages/components/CartModal";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Shop } from "../pages/Shop";
import 'dotenv/config';

test.describe('Cart testing ', ()=>{
    test('Product add to cart test', async({page})=>{

        const home_page = new Home(page);
        const shop_page = new Shop(page);
        const login = new Login(page);
        const cart = new Cart(page);
        const cart_modal = new CartModal(page); 
        
        await home_page.gotoHomePage();


        await shop_page.addFirstProductToCart1();

        await login.login(process.env.EMAIL, process.env.PASSWORD);

        const productAdded = await shop_page.addFirstProductToCart2();
        
        await shop_page.showCartDetail();

        await cart_modal.waitForProductNameInCart(productAdded)

        const productAddedCheck = await cart_modal.addedProductItemCheck();

        expect(productAddedCheck).toBe(productAdded);
        

    })
})

