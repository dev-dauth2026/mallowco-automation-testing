export class FooterComponent {
    constructor(page) {
        this.page = page;

        // Newsletter Subscription
        this.newsletterInput = page.locator('input[placeholder="Email Address"]');
        this.newsletterButton = page.locator('#js-subscribe-newsletter');
        this.newsletterError = page.locator('#newsletter_error');

        //Footer Quick Links
        this.footerLinks = {
            shop: page.locator('.footer-menu').getByText('Shop'),
            aboutUs: page.locator('.footer-menu').getByText('About Us'),
            privacyPolicy: page.getByRole('link', { name: 'Privacy Policy' }),
            termsConditions: page.getByRole('link', { name: 'Terms and Conditions' }),
            contactUs: page.locator('.footer-menu').getByText('Contact Us')
        };

        //Popular Categories
         this.popularCategories = {
            cosmetics: page.locator('.footer-menu').getByText('Cosmetics & Health'),
            organic: page.locator('.footer-menu').getByText('Organic Range'),
            wine: page.locator('.footer-menu').getByText('Wine & Alcohol'),
            sweets: page.locator('.footer-menu').getByText('Sweets & Chocolate'),
            kitchen: page.locator('.footer-menu').getByText('Kitchen & Utensils'),
            clothes: page.locator('.footer-menu').getByText('Clothes & Appearance'),
            entertainment: page.locator('.footer-menu').getByText('Entertainments & Fun')
        };

        //Contact Information
        this.address = page.locator('.footer-contact p:nth-child(2)');
        this.phoneNumber = page.locator('.footer-contact p:nth-child(3)');
        this.email = page.locator('.footer-contact p:nth-child(4) a');

        //Social Media Links
        this.socialLinks = {
            facebook: page.locator('a[aria-label="facebook"]'),
            instagram: page.locator('a[aria-label="instagram"]')
        };

        //Payment Options
        this.paymentOptions = {
            paypal: page.locator('img[alt="paypal"]'),
            visa: page.locator('img[alt="credit/debit card"]')
        };

        //Download App
        this.downloadApp = {
            googlePlay: page.locator('a[href*="play.google.com"]'),
            appStore: page.locator('a[href*="apps.apple.com"]')
        };

        //Bottom Footer
        this.bottomFooterText = page.locator('.bottom-footer p');
    }

    //Subscribe to Newsletter
    async subscribeNewsletter(email) {
        await this.newsletterInput.fill(email);
        await this.newsletterButton.click();
    }

    //Verify Newsletter Error Message
    async getNewsletterErrorMessage() {
        return await this.newsletterError.textContent();
    }

    //Navigate to Footer Links
    async navigateToFooterLink(link) {
        await link.click();
    }

    async navigateToPrivacyPolicy() {
        await this.navigateToFooterLink(this.footerLinks.privacyPolicy);
    }

    async navigateToContactUs() {
        await this.navigateToFooterLink(this.footerLinks.contactUs);
    }

    //Get Contact Details
    async getContactDetails() {
        return {
            address: await this.address.textContent(),
            phone: await this.phoneNumber.textContent(),
            email: await this.email.textContent()
        };
    }

    //Verify Social Media Links are Visible
    async areSocialLinksVisible() {
        return {
            facebook: await this.socialLinks.facebook.isVisible(),
            instagram: await this.socialLinks.instagram.isVisible()
        };
    }

    //Verify Payment Options Visibility
    async arePaymentOptionsVisible() {
        return {
            paypal: await this.paymentOptions.paypal.isVisible(),
            visa: await this.paymentOptions.visa.isVisible()
        };
    }

    //Get Footer Copyright Text
    async getFooterText() {
        return await this.bottomFooterText.textContent();
    }
}


