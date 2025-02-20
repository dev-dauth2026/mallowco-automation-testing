import { BasePage } from "./BasePage";

export class Shop extends BasePage{
    constructor(page){
        super(page);

        this.product = this.page.locator('.product');
        this.product_img = this.page.locator('.product-header > a');
        this.product_name = this.page.locator('.product-name > a');
        this.product_price = this.page.locator('.product-price .js-price_after_offer');
        this.product_verity = this.page.locator('.product-verity js-product_quantity');
        this.product_quantity_decrement_button = this.page.locator('minus');
        this.product_quantity_increment_button = this.page.locator('plus');

        this.cart_detail = this.page.locator('.login-section .cart-btn > a');
        this.number_of_cart_items = this.page.locator('.cart-btn .cart-value')

        //categories label with checkbox
        this.categoriesWithCheckBox = this.page.locator('input[type="checkbox"][name="categories[]"]')

        //filter price label
        this.min_price = this.page.locator('input[name="min_price"][type="number"');
        this.max_price = this.page.locator('input[name="max_price"][type="number"]');
        this.price_filter_button = this.page.locator('price-submit button');

        //countris label with checkbox
        this.countriesWithCheckBox = this.page.locator('input[type="checkbox"][name="countries[]"]')

        //countris label with checkbox
        this.brandWithCheckBox = this.page.locator('input[type="checkbox"][name="brands[]"]')

        //View All links
        this.viewAllLink = this.page.getByRole('link',{name:'View All'});
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


    async browseCategory(category) {

        await this.categories_link.click();  
        await this.categories[category].click();
      }

    async selectCategory(category){

    }
    
    async setMaxPrice(price) {
        await this.max_price.click();
        await this.max_price.fill(price);
        await this.price_filter_button.click();
    }

    async setMinPrice(price){
        await this.min_price.click();
        await this.min_price.fill(price);
        await this.price_filter_button.click();
    }

    async setMinMaxPrice(minPrice, maxPrice){
        await this.min_price.click();
        await this.max.fill(price);
        await this.max_price.click();
        await this.max_price.fill(price);
        await this.price_filter_button.click();
    }

    
    async clearMaxPrice() {
        await this.max_price.dblclick();
        await this.priceFilter.fill('');
    }

    async clearMinPrice() {
        await this.min_price.dblclick();
        await this.priceFilter.fill('');
    }

    


}