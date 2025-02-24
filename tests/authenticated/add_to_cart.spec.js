import {test,expect} from "@playwright/test"
import { CartModal } from "../../pages/components/CartModal";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Shop } from "../../pages/Shop";
import { Cart } from "../../pages/Cart";
import 'dotenv/config';
import { authFile } from "../setup/auth.setup";
import { getNumericPriceValue } from "../../pages/utils/numericPriceUtil";

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


    test('Should add item after login when add to cart button clicked without logged in from home page', async({page})=>{
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
        await context.storageState({ path: authFile });
        
        await homePage.header.showMyCartDetails();
        await homePage.waitForProductNameInCart(productAddedToCartName);

        const cartItemNameList = homePage.cartModal.cartItemName;
        const cartItemsCount = await homePage.cartModal.cartItemNameList.count();   // Other cart item may already exist in the cart before adding a product to the cart.
        const cartItemInCart = cartItemNameList.nth[cartItemsCount-1];

        await expect(cartItemInCart).toContainText(productAddedToCartName);
        
    })

    test('Should  bypass login and add item to cart and quantity number should increased by 1 not existed in the cart', async ({ page }) => {
        let position = 2;
        let isProductInCart;

        // Login successful verify
        await expect(page.getByRole('link',{name: `Welcome ${process.env.FIRSTNAME} `})).toBeVisible();

        const cartCountLocator = homePage.header.cartCount;
        const cartCountBeforeAddToCart = parseInt(await cartCountLocator.textContent());
        const productSelectedToAddToCartName = (await homePage.productCard.productName.nth(position).textContent()).trim();

        await homePage.header.showMyCartDetails();
        await expect(homePage.cartModal.totalCartItemsPrice).toBeVisible();

        //Check whether there is any item in the cart
        if(cartCountBeforeAddToCart>0){
            for(let i=0;i<cartCountBeforeAddToCart;i++){
                const cartItemName = (await homePage.cartModal.cartItemName.nth(i).textContent()).trim();
                (cartItemName == productSelectedToAddToCartName)?isProductInCart=true:false;
            }
        }else{
            isProductInCart = false;
        }
        // Now perform the add-to-cart action without being redirected to login
        await homePage.productCard.addItemToCart(position);
        await homePage.waitForProductNameInCart(productSelectedToAddToCartName);
         // Validate that we're not redirected to the login page
        await expect(page).not.toHaveURL(/login/);

        const cartCountAfterAddToCart = parsenInt(await cartCountLocator.textContent());

        //If the product is already in the cart and validate the increment of cart item accordingly
       (isProductInCart==true)? await expect(cartCountAfterAddToCart).toBe(cartCountBeforeAddToCart): 
                                await expect(cartCountAfterAddToCart).toBe(cartCountBeforeAddToCart + 1)

        
        await expect(homePage.cartModal.totalCartItemsPrice).toBeVisible();
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

    test('Should contain same cart items in both Cart Modal and Cart Page', async ({page})=>{
    
        // Navigate to cart page directly
        await page.goto(env.process.TEST_URL+'cart') ;
        await page.waitForLoadState('networkidle');

        // open cart modal
        await cartPage.header.myCart.click();
        await expect(cartPage.cartModal.totalCartItemsPrice).toBeVisible();

        const cartModalItemList = cartPage.cartModal.cartItems;
        const cartPageItemList = cartPage.cartItems;
        const cartModalItemCount = await cartModalItemList.count();
        const cartPageItemCount = await cartPageItemList.count();
        
        //Check item number are same in cart modal and cart page
        expect(cartPageItemCount).toEqual(cartModalItemCount);

        for (let i=0;i<cartModalItemCount; i++){
            //Cart Modal Item Values
            const cartModalItemName = (await cartPage.cartModal.cartItemName.nth(i).textContent()).trim();
            const cartModalItemVendor = (await cartPage.cartModal.cartItemVendor.nth(i).textContent()).trim();
            const cartModalItemQuantityGroup = (await cartPage.cartModal.priceWithQuantity.textContent())
                                                .replace(/[^0-9. ]/g, '')
                                                .replace(/\s+/g, ' ')
                                                .trim().split(" ");
            const cartModalItemQuantity = parseInt(cartModalItemQuantityGroup[0]);
            const cartModalItemPrice = parseFloat(cartModalItemQuantityGroup[1]);
            const cartModalItemSize = (await cartPage.cartModal.cartItemSize.textContent())?.trim() ?? '';

            //Cart Page Item Values
            const cartPageItemName = (await cartPage.cartItemName.nth(i).textContent()).trim();
            const cartPageItemVendor = (await cartPage.cartItemVendor.nth(i).textContent()).trim();
            const cartPageItemQuantity = parseInt(await cartPage.cartItemQuantity.textContent());
            const cartPageItemPrice = parseFloat(await cartPage.priceWithQuantity.textContent())
                                        .replace(/[^0-9. ]/g, '')
                                        .replace(/\s+/g, ' ')
                                        .trim();
            const cartPageItemSize = (await cartPage.cartItemSize.textContent())?.trim() ?? '';

            // Checking values are same for each items in cart Modal and cart page
            expect(cartModalItemName).toBe(cartPageItemName);
            expect(cartModalItemVendor).toBe(cartPageItemVendor);
            expect(cartModalItemQuantity).toBe(cartPageItemQuantity);
            expect(cartModalItemPrice).toBe(cartPageItemPrice);
            expect(cartModalItemSize).toBe(cartPageItemSize);


        }


    })

    test('Should be able to increase or decrease the cart item quantity and total price change in the cart page', async({page})=>{
        let cartProductProductPostition = 1;

        // Navigate to Cart Page
        await cartPage.goToCart();

        // Get initial product details
        const initialProduct = await cartPage.getCartProductDetails(cartProductPosition);
        const initialTotalPrice = await cartPage.getTotalPrice();

        // Increment Quantity
        await cartPage.incrementQuantity(cartProductPosition);
        await expect(cartPage.cartItemQuantity.nth(cartProductPosition)).toHaveValue(String(initialProduct.quantity + 1));

        // Validate total price update
        const totalPriceAfterIncrement = await cartPage.getTotalPrice();
        expect(totalPriceAfterIncrement).toBe(initialTotalPrice + initialProduct.price);

        // Decrement Quantity
        await cartPage.decrementQuantity(cartProductPosition);
        await expect(cartPage.cartItemQuantity.nth(cartProductPosition)).toHaveValue(String(initialProduct.quantity));

        // Validate total price update
        const totalPriceAfterDecrement = await cartPage.getTotalPrice();
        expect(totalPriceAfterDecrement).toBe(initialTotalPrice);

    })

    test('Should be able to remove the cart item ', async({page})=>{
        
    })

    test("Should display 'You don't have any items in your cart.' if no item added to cart", async({page})=>{

        const cartCount = parseInt(await homePage.header.cartCount.textContent()).trim();

        await page.goto(env.process.TEST_URL+'cart');

        const noCartItem =(await cartPage.noCartItem.textContent()).trim();
        //if no item in the cart
        if(cartCount==0){
            expect(noCartItem).toBeVisible();
        }else{
            expect(noCartItem).toBeHidden();
        }


    })
})

