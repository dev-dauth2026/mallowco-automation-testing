// Cart.js
exports.CartModal = class CartModal {
    constructor(page) {
      this.page = page;

      this.cart_items = page.locator(".side-cart-items .cart-item");
      this.cart_item_name = page.locator(".side-cart-items .cart-item  h4");
    }

    async waitForProductNameInCart(name) {
        const itemLocator = this.page.locator(`.side-cart-items .cart-item h4:text("${name}")`);
        await itemLocator.waitFor({ state: "visible" });
    }
  
    
    async addedProductItemCheck() {
        // Wait specifically for the last item to be visible
        await this.cart_item_name.last().waitFor({ state: "visible" });
    
        const lastCartItem = (await this.cart_item_name.last().textContent()).trim();

      return lastCartItem;
    }
};
  