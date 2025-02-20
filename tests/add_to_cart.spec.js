import {test,expect} from "@playwright/test"
import { CartModal } from "../pages/components/CartModal";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Shop } from "../pages/Shop";
import { Cart } from "../pages/Cart";
import 'dotenv/config';

test.describe('Add to Cart testing ', ()=>{
    let homePage;
    let shopPage;
    let loginPage;
    let cartPage

    test.beforeEach('Navigate to Home page', async ({page})=>{
        homePage = new Home(page);
        shopPage = new Shop(page);
        loginPage = new Login(page);
        cartPage = new Cart(page);

        await homePage.gotoHomePage();

    })

    test('Cart Modal Display', async({page})=>{
        await homePage.header.myCart.click();

        await page.waitForLoadState('networkidle');

        //assert cart modal opened
        expect(homePage.cartModal.noCartItemText).toBeVisible();
        expect(homePage.cartModal.cartStartShoppingbutton).toBeVisible();
    })


    test('Add Item to Cart before login', async({page})=>{

        const productAddedToCartName = await homePage.addItemToCart();

        expect(page).toHaveURL(/login/);
        await page.waitForLoadState('networkidle');

        await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

        // Wait for navigation or any indication that login succeeded
        await page.waitForLoadState('networkidle');
        
        // Save the authenticated state to auth.json
        await context.storageState({ path: 'auth.json' });
        
        await homePage.showMyCartDetails();
        await page.waitForLoadState('networkidle');

        await homePage.waitForProductNameInCart(productAddedToCartName);

        const cartItemNameList = homePage.cartModal.cartItemName;
        const cartItemsCount = await homePage.cartModal.cartItemNameList.count();   // Other cart item may already exist in the cart before adding a product to the cart.
        const cartItemInCart = cartItemNameList.nth[cartItemsCount-1];

        await expect(cartItemInCart).toContainText(productAddedToCartName);
        
    })

    test.only('Add item to Cart after Login bypass injecting previous cookies', async ({ page }) => {

        // Load pre-authenticated state from auth.json
        const authState = require('../auth.json');
        await context.addCookies(authState.cookies);

        await page.waitForTimeout(5000);
    
        // Revisit the home page so that the authenticated state takes effect
        await homePage.gotoHomePage();

        // Login successful verify
        await expect(page.getByRole('link',{name: `Welcome ${process.env.FIRSTNAME} `})).toBeVisible();

        const cartCountLocator = homePage.header.cartCount
        const cartCountBeforeAddToCart = parseInt(await cartCountLocator.textContent());
        // Now perform the add-to-cart action without being redirected to login
        const productAddedToCartName = await homePage.addItemToCart();
        await page.waitForTimeout(2000);
        const cartCountAfterAddToCart = parsenInt(await cartCountLocator.textContent());

        // Validate that we're not redirected to the login page
        await expect(page).not.toHaveURL(/login/);
        // Cart value increment assertion
        await expect(cartCountAfterAddToCart).toBe(cartCountBeforeAddToCart + 1);
        
        await homePage.showMyCartDetails();
        await page.waitForLoadState('networkidle');
    
        await homePage.waitForProductNameInCart(productAddedToCartName);
    
        const cartItemNameList = homePage.cartModal.cartItemName;
        const cartItemsCount = await homePage.cartModal.cartItemNameList.count();
        const cartItemInCart = cartItemNameList.nth(cartItemsCount - 1);
        //Assert last item of the cart is the added cart item previously
        await expect(cartItemInCart).toContainText(productAddedToCartName);
      });

    


})

