import { BasePage } from "./BasePage";

export class Cart extends BasePage {
  constructor(page) {
    super(page)
     
    this.shop_link = page
      .getByRole("banner")
      .getByRole("link", { name: "Shop" });
    this.product = page.locator(".product-header > a").first();
    this.add_to_cart_button = page.getByRole("button", { name: "Add to cart" });
    this.email_input = page.getByLabel("E-Mail Address *");
    this.password_input = page.locator("#login_password");
    this.login_button = page.getByRole("button", { name: "Login" });
    this.cart_details_link = page.getByRole("link", {
      name: "login image My Cart",
    });
    this.cart_close = page.getByRole("button", { name: "Close" });
    this.cart_item = page.locator(".cart-item");
  }

  

  async closePage() {
    await this.page.close();
  }


  

  async addToCart(email, password) {
    // 1. Navigate and add a product
    await this.shop_link.click();
    await this.product.click();
    await this.add_to_cart_button.click();

    // 2. Login
    await this.email_input.fill(email);
    await this.password_input.fill(password);
    await this.login_button.click();

    // 3. Open cart & close it
    await this.cart_details_link.click();
    await this.cart_close.click();

    // 4. Add product again (if desired) & open cart
    await this.add_to_cart_button.click();
    await this.cart_details_link.click();

    // --- Debugging: Check initial count properly ---
    await this.cart_item.last().waitFor({ state: "visible" });

    await this.cart_item.

    console.log('Total cart item', await this.cart_item.count());
    await this.page.pause();
    while ((await this.cart_item.count()) > 0) {
      console.log("Current Count", await this.cart_item.count());

      // Remove first cart item
      await this.cart_item.locator(".js-remove-cart-item").first().click();

      // Optionally wait for the first item to be detached or the cart to update
      await this.cart_item
        .first()
        .waitFor({ state: "detached" })
        .catch(() => {});

    
    // If cart is empty, break
    if ((await this.cart_item.count()) === 1) {
        break;
      }
    }

    await this.cart_close.click();
    await this.cart_details_link.click();
  }
};
