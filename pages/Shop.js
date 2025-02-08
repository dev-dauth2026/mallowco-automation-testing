exports.Shop = class Shop{
    constructor(page){
        this.page = page;
        this.shop_link = this.page.getByRole('banner').getByRole('link', { name: 'Shop' });
        this.select_country = this.page.getByRole('textbox', { name: 'Select Country' });
        this.search_input = this.page.getByPlaceholder('Search Keywords to search...');
        this.search_button = this.page.getByLabel('Search Products', { exact: true });
        this.product = this.page.locator('.product');
        this.product_img = this.page.locator('.product-header > a');
        this.product_name = this.page.locator('.product-name > a');
        this.product_price = this.page.locator('.product-price js-price_after_offer');
        this.product_verity = this.page.locator('.product-verity js-product_quantity');
        this.product_quantity_decrement_button = this.page.locator('minus');
        this.product_quantity_increment_button = this.page.locator('plus');
        this.add_to_cart = this.page.getByRole("button",{name: "Add"});
        this.cart_detail = this.page.locator('.login-section .cart-btn > a');
        this.number_of_cart_items = this.page.locator('.cart-btn .cart-value')
    }

    async addFirstProductToCart1() {
        // Navigate to Shop page
        await this.shop_link.click();

      }
      
      async addFirstProductToCart2() {


        // Capture the name of the FIRST product BEFORE adding
        const firstProductName = await this.product_name.first().textContent();

        //old cart item value
        const oldCount = parseInt(await this.page.locator('.cart-value').textContent(), 10);

        // Add first product to cart
        await this.add_to_cart.first().click();

        // Wait for cart count to increment
        await this.page.waitForFunction(
            async (old) => {
            const el = document.querySelector('.cart-value');
            if (!el) return false;
            const newCount = parseInt(el.textContent, 10);
            return newCount === old + 1;
            },
            oldCount
        );
        
        // 4. Return the product name so the test can compare it later
        return firstProductName.trim();
      }

    async showCartDetail(){
        await this.cart_detail.click();
    }

    


}