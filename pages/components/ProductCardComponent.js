export class ProductCardComponent{
    constructor(page){
        this.page = page;

        this.productCard = page.locator('.product');
        this.productName = '.product-name';
        this.productQuantityType = '.pckt-select .js-product-quantity';
        this.productQuantity = '.quantity input[type="text"][name="product_quantity"]';
        this.addItemToCart = '.add-cart .cart-btn';
    }

     // Add Item to Cart for both Home Page and Shop Page product
     async addItemToCart(){
        const firstProductCard = await this.productCard.first();
        const firstProductName = await firstProductCard.locator(this.productName).textContent();
        const firstProductAddToCartButton = await firstProductCard.locator(this.addItemToCart)
        await firstProductAddToCartButton.click();

        return firstProductName;
    }
}