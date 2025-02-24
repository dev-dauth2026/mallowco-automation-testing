import { getNumericPriceValue, getNumericQuantityAndPriceValue } from "../utils/numericPriceUtil";

// Cart.js
export class CartModal {
    constructor(page) {
      this.page = page;

      this.cartItems = page.locator(".side-cart-items .cart-item");
      this.cartItemName = page.locator(".side-cart-items .cart-item  h4");
      this.cartItemVendor = page.locator(".side-cart-items .cart-item strong");
      this.cartItemSize = page.locator(".side-cart-items .cart-item .pckt-select");
      this.cartItemRemoveButton = page.locator('.js-remove-cart-item');
      this.priceWithQuantity = page.locator('.qty-group');
      this.totalCartItemsPrice = page.locator('..main-total-cart span');
      this.checkoutButton = page.getByRole('link',{name:'Checkout'});
      this.viewCartButton = page.getByRole('link',{name:'View Cart'});
      this.cartCloseButton = '.bs-canvas-close'



      //No products in cart
      this.noCartItemText = page.locator(".cart-text", { hasText: "You don't have any items in your cart." });
      this.cartStartShoppingbutton = page.locator(".carts-btn", { hasText: "Start Shopping" });
    }

    async getCartModalProductDetails(position) {
      return {
          name: await this.cartItemName.nth(position).textContent(),
          price: await getNumericQuantityAndPriceValue(this.priceWithQuantity.nth(position).textContent()).price,
          quantity: await getNumericQuantityAndPriceValue(this.priceWithQuantity.nth(position).textContent()).quantity,
      };
    }

    async removeCartModalItem(position,selectedProductName){
      await this.cartItemRemoveButton.nth(position).click()
      await expect(selectedProductName).toBeHidden();
    }

    async waitForProductNameInCart(name) {
        const itemLocator = this.page.locator(`.side-cart-items .cart-item h4:text("${name}")`);
        await itemLocator.waitFor({ state: "visible" });
    }
  
    
    async addedProductItemCheck() {
        // Wait specifically for the last item to be visible
        await this.cartItemName.last().waitFor({ state: "visible" });
    
        const lastCartItem = (await this.cartItemName.last().textContent()).trim();

      return lastCartItem;
    }

    async closeCartModal(){
      await this.cartCloseButton.click();
      await this.page.waitForTimeout(2000);
    }
};
  