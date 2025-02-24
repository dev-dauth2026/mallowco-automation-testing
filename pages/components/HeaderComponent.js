export class HeaderComponent {

    constructor(page) {
        this.page = page;

        // Header Contact Info
        this.phoneNumber = page.locator('[href="tel:0341501318"]');
        this.email = page.locator('[href="mailto:admin@mallowco.com.au"]');
        this.location = page.locator('text=Brisbane, Queensland, Australia');
        
        // Logo & Navigation
        this.logo = page.locator('.header-logo a');  
        this.countrySelector = page.locator('.select2-container--default');
        this.countrySelectorInputField = page.locator('.select2-search__field')
        this.countrySelectDropdown = page.locator('.select2-results__options')
        this.countrySelectOption = page.locator('.select2-results__option');
        this.searchInput = page.locator('input[placeholder="Search Keywords to search..."]');
        this.searchButton = page.locator('.fa-search'); 

        //User Account Links
        this.loginLink = page.locator('.login-btn .login');
        this.signupLink = page.locator('.login-btn .register');
        this.profileLink = page.getByRole('link', { name: `Welcome ${process.env.FIRSTNAME}` });

        // My cart link
        this.myCart = page.locator('.cart-btn a');
        this.cartCount = page.locator('.cart-value'); 
        
        // Main Navigation
        this.categoriesDropdown = page.locator('.cateogry-btn');
        this.categoriesDropdownList = page.locator('.category-dropdown li a')

        // Navbar links
        this.navContainer = page.locator('.navbar .menu-item')
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

    // Navigation Methods
    async navigateToHome() {
        await this.page.click(this.navLinks.home);
    }


    async navigateToShop() {
        await this.navContainer.locator(this.navLinks.shop).click();
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
        const cartCount = parseInt((await this.cartCount.textContent()).trim());
        return cartCount;
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

    // Categories Dropdown filter
    async selectCategoryByName(categoryDisplayName) {
        await this.categoriesDropdown.click();
        await this.page.getByRole('link', { name: categoryDisplayName }).click();
      }

    // Show My Cart Modal Detail
    async showMyCartDetails(){
        await this.myCart.click();
    }


}
