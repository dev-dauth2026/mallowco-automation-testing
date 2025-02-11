// pages/base.page.js
export class BasePage {
    constructor(page) {
        this.page = page;

        // Ensure that `page` is correctly assigned
        if (!this.page) {
            throw new Error("Page object is undefined. Make sure you are passing 'page' when creating the page object.");
        }
        
        // Header Contact Info
        this.phoneNumber = page.locator('[href="tel:0341501318"]');
        this.email = page.locator('[href="mailto:admin@mallowco.com.au"]');
        this.location = page.locator('text=Brisbane, Queensland, Australia');
        
        // Logo and Search
        this.logo = page.locator('.header-logo a');  

        //Country Dropdown
        this.countrySelector = page.locator('.select2-container--default');
        this.countrySelectorInputField = page.locator('.select2-search__field')
        this.countrySelectDropdown = page.locator('.select2-results__options')
        this.countrySelectOption = page.locator('.select2-results__option');

        //Search
        this.searchInput = page.locator('input[placeholder="Search Keywords to search..."]');
        this.searchButton = page.locator('.fa-search'); 
        
        // User Navigation
        this.welcomeDropdown = page.locator('text=Welcome Hen');
        this.cartIcon = page.locator('text=My Cart');
        this.cartCount = page.locator('.cart-count');  // Update with actual cart count selector
        
        // Main Navigation
        this.categoriesDropdown = page.locator('text=Categories');
        this.navLinks = {
            home: 'text=Home',
            shop: 'text=Shop',
            special: 'text=Special',
            flashDeal: 'text=Flash Deal',
            aboutUs: 'text=About Us',
            contactUs: 'text=Contact Us'
        };

        // Cookies privacy
        this.cookiesCustomise = page.getByRole('button',{name:'Customise'});
        this.cookiesReject = page.getByRole('button',{name: 'Reject All'});
        this.cookiesAccept = page.getByRole('button',{name: 'Accept All'} );
        
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

    // Navigation Methods
    async navigateToHome() {
        await this.page.click(this.navLinks.home);
    }

    // Filter countries
    async filterCountries(searchKeyword,selectedCountry){
        await this.countrySelector.first().click();
        await this.countrySelectorInputField.pressSequentially(searchKeyword,{delay:100})
         // Wait for the dropdown options to load
        await this.countrySelectDropdown.waitFor({state:'visible'});
        // Get all country options count
        const countrySelectOptionsCount = await this.countrySelectOption.count();

         // Loop through the options
        for(let i =0; i< countrySelectOptionsCount; i++){
            const option = this.countrySelectOption.nth(i);
            await option.waitFor({ state: 'visible' }); 
            const text = await option.textContent();

            if(text && text.trim() === selectedCountry){
                await option.hover();
                await option.click();
                break;
            }


        }

        await this.searchButton.click();

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