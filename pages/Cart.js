import { BasePage } from "./BasePage";
import { getNumericPriceValue } from "../../pages/utils/numericPriceUtil";

export class Cart extends BasePage {
  constructor(page) {
    super(page)
    
    //product card locators
    this.cartItems = page.locator('.cart-list .cart-item .cart-text');
    this.cartItemName = this.cartItems.locator('h4');
    this.cartItemVendor = this.cartItems.locator('strong');
    this.cartItemQuantity = this.cartItems.locator('input[name="product_quantity"]');
    this.cartItemSize = this.cartItems.locator('.pckt-select');
    this.cartItemPrice = this.cartItems.locator('.price strong');
    this.cartItemRemoveButton = this.cartItems.locator('.cart-close-btn');
    this.quantityDecrementButton = this.cartItems.locator('.minus');
    this.quantityIncrementButton = this.cartItems.locator('.plus');

    // Cart Summary locators
    this.totalCartItemsPrice = page.locator('.total span');
    this.checkoutButton = page.getByRole('link',{name:'Proceed to Checkout'});

    // No Cart Item
    this.noCartItem = page.locator('.cards .no-result h3');

  }

  async goToCart() {
    await this.page.goto(process.env.TEST_URL + 'cart');
    await this.page.waitForLoadState('networkidle');
}

async getCartProductDetails(position) {
  return {
      name: await this.cartItemName.nth(position).textContent(),
      price: await getNumericPriceValue(this.cartItemPrice.nth(position)),
      quantity: parseInt(await this.cartItemQuantity.nth(position).inputValue()),
  };
}

async incrementQuantity(position) {
  await this.quantityIncrementButton.nth(position).click();
}

async decrementQuantity(position) {
  await this.quantityDecrementButton.nth(position).click();
}

async getTotalPrice() {
  return await getNumericPriceValue(this.totalCartItemsPrice);
}


};
