import {test,expect} from "@playwright/test"
import { CartModal } from "../../pages/components/CartModal";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Shop } from "../../pages/Shop";
import { Cart } from "../../pages/Cart";
import 'dotenv/config';
import { authFile } from "../setup/auth.setup";

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


    test('Should display Cart Modal  from home page', async({page})=>{
        await homePage.header.myCart.click();

        await page.waitForLoadState('networkidle');

        //assert cart modal opened
        expect(homePage.cartModal.noCartItemText).toBeVisible();
        expect(homePage.cartModal.cartStartShoppingbutton).toBeVisible();
    })


    test('Should add item after only login from home page', async({page})=>{
        // Reset storage state for this file to avoid being authenticated
        test.use({ storageState: { cookies: [], origins: [] } });
        let position = 1;

        const productAddedToCartName = await homePage.productCard.addItemToCart(position);

        expect(page).toHaveURL(/login/);
        await page.waitForLoadState('networkidle');

        await loginPage.login(process.env.EMAIL, process.env.PASSWORD);

        // Wait for navigation or any indication that login succeeded
        await page.waitForLoadState('networkidle');
        
        // Save the authenticated state to auth.json
        await context.storageState({ path: 'auth.json' });
        
        await homePage.header.showMyCartDetails();
        await homePage.waitForProductNameInCart(productAddedToCartName);

        const cartItemNameList = homePage.cartModal.cartItemName;
        const cartItemsCount = await homePage.cartModal.cartItemNameList.count();   // Other cart item may already exist in the cart before adding a product to the cart.
        const cartItemInCart = cartItemNameList.nth[cartItemsCount-1];

        await expect(cartItemInCart).toContainText(productAddedToCartName);
        
    })

    test('Should  bypass login and add item to cart', async ({ page }) => {
        let position = 2;

        // Login successful verify
        await expect(page.getByRole('link',{name: `Welcome ${process.env.FIRSTNAME} `})).toBeVisible();

        const cartCountLocator = homePage.header.cartCount
        const cartCountBeforeAddToCart = parseInt(await cartCountLocator.textContent());
        // Now perform the add-to-cart action without being redirected to login
        const productAddedToCartName = await homePage.productCard.addItemToCart(2);
        await page.waitForTimeout(2000);
        const cartCountAfterAddToCart = parsenInt(await cartCountLocator.textContent());

        // Validate that we're not redirected to the login page
        await expect(page).not.toHaveURL(/login/);
        // Cart value increment assertion
        await expect(cartCountAfterAddToCart).toBe(cartCountBeforeAddToCart + 1);
        
        await homePage.header.showMyCartDetails();
        await expect(homePage.cartModal.totalCartItemsPrice).toBeVisible();
    
        await homePage.waitForProductNameInCart(productAddedToCartName);
    
        const cartItemNameList = homePage.cartModal.cartItemName;
        const cartItemsCount = await homePage.cartModal.cartItemNameList.count();
        const cartItemInCart = cartItemNameList.nth(cartItemsCount - 1);
        //Assert last item of the cart is the added cart item previously
        await expect(cartItemInCart).toContainText(productAddedToCartName);
      });

      test('Should navigate to Cart Page', async({page})=>{

        await homePage.header.showMyCartDetails();
        await expect(homePage.cartModal.totalCartItemsPrice).toBeVisible();

        await homePage.cartModal.viewCartButton.click();
        await page.waitForLoadState('networkidle');
        // Navigation to Cart Page assertion
        expect(page).toHaveURL(/cart/);


      })

      test('Cart items total price and totla price displayed should be equal or close', async({page})=>{

        await homePage.header.showMyCartDetails();
        await expect(homePage.cartModal.totalCartItemsPrice).toBeVisible();

        const priceWithQuantity = homePage.cartModal.priceWithQuantity;
        const totalItemsInCart = await priceWithQuantity.count();
        let totalCartItemsPriceAfterSum = 0;
        for(let i=0; i< totalItemsInCart; i++){
            const priceWithQuantityGroupArray = (await priceWithQuantity.nth(i).textContent())
                                                .replace(/[^0-9. ]/g, '')
                                                .replace(/\s+/g, ' ')
                                                .trim().split(" ");
            const itemQuantity = parseFloat(priceWithQuantityGroupArray[0]);
            const itemPrice = parseFloat(priceWithQuantityGroupArray[1]);

            totalCartItemsPriceAfterSum += itemQuantity * itemPrice;
        } 

        const totalPriceInCartDisplayed = (await homePage.cartModal.totalCartItemsPrice.textContent()).trim();
        const totalPriceNumber = parseFloat(totalPriceInCartDisplayed.replace(/[^0-9.]/g, ''));

        // Total price of cart items assertion
        expect(totalPriceNumber).toBeCloseTo(totalCartItemsPriceAfterSum);
      })

      test('Should increase the quantity of the item while adding the item already existed on the cart', async({page})=>{
        let position = 1;

        const itemToBeAdded = (await homePage.productCard.productName.nth(position).textContent()).trim().toUpperCase();

        await homePage.header.myCart.click();
        await homePage.waitForProductNameInCart(itemToBeAdded);

        const cartItemToBeAddedDiv = await homePage.productCard.productCard.filter({hasText:itemToBeAdded})
        const quantityOfItemToBeAddedGroup = (await cartItemToBeAddedDiv.productQuantity.textContent())
                                        .replace(/[^0-9. ]/g, '')
                                        .replace(/\s+/g, ' ')
                                        .trim().split(" ");
        const numericQuantityOfItemToBeAdded = parseInt(quantityOfItemToBeAddedGroup[0])
        await homePage.cartModal.cartCloseButton.click();

        await homePage.productCard.addItemToCart(position);
        await page.waitForLoadState('networkidle');

        await homePage.header.myCart.click();
        await homePage.waitForProductNameInCart(itemToBeAdded);

        const quantityOfItemAfterAddedGroup = (await cartItemToBeAddedDiv.productQuantity.textContent())
                                                .replace(/[^0-9. ]/g, '')
                                                .replace(/\s+/g, ' ')
                                                .trim().split(" ");
        const numericQuantityAfterAdded = parseInt(quantityOfItemAfterAddedGroup[0])

        // Quantity of the item added increased by 1
        await expect(numericQuantityAfterAdded).toBe(numericQuantityOfItemToBeAdded+1);

      })



    


})

