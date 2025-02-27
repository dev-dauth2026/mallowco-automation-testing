import { BasePage } from "./BasePage";

const { expect } = require('@playwright/test');

class ProfileDashboardPage extends BasePage {
    constructor(page) {
        super(page);
        
        this.locators = {
            // Navigation Tabs
            profileTab: page.getByRole('link', { name: 'Profile' }),
            orderHistoryTab: page.getByRole('link', { name: 'Order History' }),
            referralsTab: page.getByRole('link', { name: 'My Referrals' }),
            changePasswordTab: page.getByRole('link', { name: 'Change Password' }),
            accountDeleteTab: page.getByRole('link', { name: 'Account Delete' }),
            logoutButton: page.getByRole('link', { name: 'Logout' }),

            // Billing Information
            profileInfoList: page.locator('.profile-info li'),
            fullName: page.locator('.profile-info li', { hasText: 'Full name' }),
            address: page.locator('.profile-info li', { hasText: 'Address' }),
            email: page.locator('.profile-info li', { hasText: 'Email' }),
            phoneNumber: page.locator('.profile-info li', { hasText: 'Phone No.' }),
            city: page.locator('.profile-info li', { hasText: 'City' }),
            country: page.locator('.profile-info li', { hasText: 'Country' }),
            suburb: page.locator('.profile-info li', { hasText: 'Suburb' }),
            state: page.locator('.profile-info li', { hasText: 'State' }),
            postalCode: page.locator('.profile-info li', { hasText: 'Postal Code' }),

            // Email Verification Status
            emailVerifiedBadge: page.locator('.profile-info li img[src*="verified.png"]'),

            // Edit Profile Button
            editProfileButton: page.getByRole('link', { name: 'Edit Profile' }),
        };
    }

    // Navigate to Profile tab
    async goToProfile() {
        await this.locators.profileTab.click();
        await expect(this.page).toHaveURL(env.process.TEST_URL+'dashboard');
    }

    // Navigate to Order History tab
    async goToOrderHistory() {
        await this.locators.orderHistoryTab.click();
        await expect(this.page).toHaveURL(env.process.TEST_URL+'orders/history');
    }

    // Navigate to Referrals tab
    async goToReferrals() {
        await this.locators.referralsTab.click();
        await expect(this.page).toHaveURL(env.process.TEST_URL+'referrals');
    }

    // Navigate to Change Password tab
    async goToChangePassword() {
        await this.locators.changePasswordTab.click();
        await expect(this.page).toHaveURL(env.process.TEST_URL+'change-password');
    }

    // Navigate to Account Delete tab
    async goToAccountDelete() {
        await this.locators.accountDeleteTab.click();
        await expect(this.page).toHaveURL(env.process.TEST_URL+'account-delete');
    }

    // Perform logout
    async logout() {
        await this.locators.logoutButton.click();
        await expect(this.page).toHaveURL(/login/); // Verify redirection to login page
    }

    // Extract profile details dynamically and format them like getBillingDetails()
    async getProfileDetails() {
        const profileItems = await this.locators.profileInfoList.all();
        const profileData = {};

        for (const item of profileItems) {
            const text = await item.textContent();
            const parts = text.split(':'); // Splitting key-value pairs

            if (parts.length === 2) {
                const key = parts[0].trim().replace(/\s+/g, '_').toLowerCase(); // Convert labels to JSON keys
                const value = parts[1].trim();
                profileData[key] = value;
            }
        }

        // Format extracted data to match the structure of `getBillingDetails()`
        return {
            fullName: profileData.full_name || null,
            email: profileData.email || null,
            phoneNumber: profileData.phone_no || null,
            fullAddress: profileData.address || null,
            expectedAutoFill: {
                streetAddress: profileData.address || null,
                city: profileData.city || null,
                suburb: profileData.suburb || null,
                state: profileData.state || null,
                country: profileData.country || null,
                postcode: profileData.postal_code || null
            }
        };
    }

}

