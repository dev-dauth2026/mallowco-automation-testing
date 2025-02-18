import { HeaderComponent } from './components/HeaderComponent';
import { FooterComponent } from './components/FooterComponent';
export class BasePage {
    constructor(page) {
        this.page = page;

        // Ensure that `page` is correctly assigned
        if (!this.page) {
            throw new Error("Page object is undefined. Make sure you are passing 'page' when creating the page object.");
        }

        this.header = new HeaderComponent(page);
        this.footer = new FooterComponent(page);
        
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

    

}