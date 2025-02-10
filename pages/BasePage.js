// pages/base.page.js
export class BasePage {
    constructor(page) {
        this.page = page;
        
        // Header Contact Info
        this.phoneNumber = '[href="tel:0341501318"]';
        this.email = '[href="mailto:admin@mallowco.com.au"]';
        this.location = 'text=Brisbane, Queensland, Australia';
        
        // Logo and Search
        this.logo = '.MallowCo';  // Update with actual logo selector
        this.countrySelector = 'text=Select Country';
        this.searchInput = 'input[placeholder="Search Keywords to search..."]';
        this.searchButton = 'button.search-button';  // Update with actual search button selector
        
        // User Navigation
        this.welcomeDropdown = 'text=Welcome Hen';
        this.cartIcon = 'text=My Cart';
        this.cartCount = '.cart-count';  // Update with actual cart count selector
        
        // Main Navigation
        this.categoriesDropdown = 'text=Categories';
        this.navLinks = {
            home: 'text=Home',
            shop: 'text=Shop',
            special: 'text=Special',
            flashDeal: 'text=Flash Deal',
            aboutUs: 'text=About Us',
            contactUs: 'text=Contact Us'
        };

        // Cookies privacy
        this.cookiesCustomise = 'button.cky-btn-customize';
        this.cookiesReject = 'button.cky-btn-reject';
        this.cookiesAccept = 'button.cky-btn-accept';
        
    }

    // Go to Home Page
    async gotoHomePage() {
        await this.page.goto(process.env.TEST_URL);
      }

    // Cookies Privacy selection
    async cookiesAccepted(){
        await this.page.click(this.cookiesAccept);
    }

    async cookiesRejected(){
        await this.page.click(this.cookiesReject);
    }

    async cookiesCustomised(){
        await this.page.click(this.cookiesCustomise);
    }

    // Navigation Methods
    async navigateToHome() {
        await this.page.click(this.navLinks.home);
    }

    async navigateToShop() {
        await this.page.click(this.navLinks.shop);
    }

    async navigateToSpecial() {
        await this.page.click(this.navLinks.special);
    }

    async navigateToFlashDeal() {
        await this.page.click(this.navLinks.flashDeal);
    }

    async navigateToAboutUs() {
        await this.page.click(this.navLinks.aboutUs);
    }

    async navigateToContactUs() {
        await this.page.click(this.navLinks.contactUs);
    }

    // Search functionality
    async searchProduct(searchText) {
        await this.page.fill(this.searchInput, searchText);
        await this.page.click(this.searchButton);
    }

    // Country selection
    async selectCountry(countryName) {
        await this.page.click(this.countrySelector);
        await this.page.click(`text=${countryName}`);
    }

    // Cart related methods
    async openCart() {
        await this.page.click(this.cartIcon);
    }

    async getCartCount() {
        const countElement = this.page.locator(this.cartCount);
        return await countElement.textContent();
    }

    // User account related methods
    async openUserMenu() {
        await this.page.click(this.welcomeDropdown);
    }

    // Contact information verification methods
    async getPhoneNumber() {
        return await this.page.textContent(this.phoneNumber);
    }

    async getEmailAddress() {
        return await this.page.textContent(this.email);
    }

    async getLocation() {
        return await this.page.textContent(this.location);
    }

    // Categories dropdown
    async openCategories() {
        await this.page.click(this.categoriesDropdown);
    }

    // Verification methods
    async isNavBarVisible() {
        for (const link of Object.values(this.navLinks)) {
            const isVisible = await this.page.isVisible(link);
            if (!isVisible) return false;
        }
        return true;
    }

    async getCurrentUrl() {
        return await this.page.url();
    }

    async getPageTitle() {
        return await this.page.title();
    }
}