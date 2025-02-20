// Cart.js
export class CartModal {
    constructor(page) {
      this.page = page;

      this.cartItems = page.locator(".side-cart-items .cart-item");
      this.cartItemName = page.locator(".side-cart-items .cart-item  h4");
      this.noCartItemText = page.locator(".cart-text", { hasText: "You don't have any items in your cart." });
      this.cartStartShoppingbutton = page.locator(".carts-btn", { hasText: "Start Shopping" });
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
};
  