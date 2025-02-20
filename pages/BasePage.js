import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
import { CartModal } from './components/CartModal';
export class BasePage {
    constructor(page) {
        this.page = page;

        // Ensure that `page` is correctly assigned
        if (!this.page) {
            throw new Error("Page object is undefined. Make sure you are passing 'page' when creating the page object.");
        }

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);
        this.cartModal = new CartModal(page);

        // Cookies privacy
        this.cookiesCustomise = page.getByRole('button',{name:'Customise'});
        this.cookiesReject = page.getByRole('button',{name: 'Reject All'});
        this.cookiesAccept = page.getByRole('button',{name: 'Accept All'} );

        this.productCard = page.locator('.product')
        this.productName = '.product-name'
        this.addItemToCart = '.add-cart .cart-btn';

        
    }    

    // Go to Home Page
    async gotoHomePage() {
        await this.page.goto(process.env.TEST_URL);
      }

    // Cookies Privacy selection
    async cookiesAccepted(){
        await this.cookiesAccept.click();
    }

    async cookiesRejected(){
        await this.cookiesReject.click();
    }

    async cookiesCustomised(){
        await this.cookiesCustomise.click();
    }

    // Add Item to Cart for both Home Page and Shop Page product
    async addItemToCart(){
        const firstProductCard = await this.productCard.first();
        const firstProductName = await firstProductCard.locator(this.productName).textContent();
        const firstProductAddToCartButton = await firstProductCard.locator(this.addItemToCart)
        await this.firstProductAddToCartButton.click();

        return firstProductName;
    }

    

}