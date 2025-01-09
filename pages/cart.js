exports.Cart = class Cart {
    constructor(page) {
      this.page = page;
      this.shop_link = page.getByRole('banner').getByRole('link', { name: 'Shop' });
      this.product = page.locator('.product-header > a').first();
      this.add_to_cart_button = page.getByRole('button', { name: 'Add to cart' });
      this.email_input = page.getByLabel("E-Mail Address *");
      this.password_input = page.locator("#login_password");
      this.login_button = page.getByRole("button", { name: "Login" });
      this.cart_details_link = page.getByRole('link', { name: 'login image My Cart' });
      this.add_to_cart_button2 = page.getByRole('button', { name: 'Add to cart' });
      this.cart_details_link2 = page.getByRole('link', { name: 'login image My Cart' });
      this.cart_item_deleted = page.locator('div:nth-child(6) > .cart-text > form > .cart-close-btn');
      this.cart_close = page.getByRole('button', { name: 'Close' });
      this.cart_details_link3 = page.getByRole('link', { name: 'login image My Cart' });
    }
  
    async gotoHomePage() {
      await this.page.goto("https://www.mallowco.com.au/");
    }
  
    async closePage() {
      await this.page.close();
    }
  
    async addToCart(email, password) {
      await this.shop_link.click();
      await this.product.click();
      await this.add_to_cart_button.click();
      await this.email_input.fill(email);
      await this.password_input.fill(password);
      await this.login_button.click();
      await this.cart_details_link.click();
      await this.add_to_cart_button2.click();
      await this.cart_details_link2.click();
      await this.cart_item_deleted.click();
      await this.cart_close.click();
      await this.cart_details_link3.click();
      

    }
  };
  