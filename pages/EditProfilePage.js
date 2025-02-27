export class EditProfilePage extends BasePage {
    constructor(page) {
        super(page);

        this.email = page.locator('#email'),
        this.fullName = page.locator('#firstName'),
        this.phoneNumber = page.locator('#phone_no'),
        this.fullAddress = page.locator('#full_address'),
        this.address = page.locator('#address'),
        this.city = page.locator('#city'),
        this.suburb = page.locator('#suburb'),
        this.state = page.locator('#state'),
        this.country = page.locator('#country'),
        this.countryCode = page.locator('#country_code'),
        this.postalCode = page.locator('#postal_code'),
        this.submitButton = page.getByRole('button', { name: 'Submit' }),
        this.cancelButton = page.locator('a.om-btn-2');

        // Dropdown options for address auto-fill
        this.dropdownOptions = page.locator('.pac-item');

    }

    async gotoEditProfile() {
        await this.page.goto(env.process.TEST_URL+'profile');
        await this.page.waitForLoadState('networkidle');
    }

    async updateProfileDetails(newDetails) {
        await this.phoneNumber.fill(newDetails.phoneNumber);
        await this.fullAddress.fill(newDetails.addressInput);
        await this.page.waitForTimeout(2000); // Wait for dropdown to appear

        // Ensure the correct address option appears and select it
        const dropdownOptions = await this.dropdownOptions.allTextContents();
        let selected = false;
        for (let i = 0; i < dropdownOptions.length; i++) {
            if (dropdownOptions[i].includes(newDetails.expectedAutoFill.streetAddress) &&
                dropdownOptions[i].includes(newDetails.expectedAutoFill.city) &&
                dropdownOptions[i].includes(newDetails.expectedAutoFill.state)) {
                
                await this.locators.dropdownOptions.nth(i).click();
                selected = true;
                break;
            }
        }
        if (!selected) {
            throw new Error(`Address not found in dropdown: ${JSON.stringify(newDetails.expectedAutoFill)}`);
        }

        await this.page.waitForTimeout(3000); // Wait for auto-fill fields to update
    }

    async getBillingDetials() {
        return {
            fullName: await this.fullName.inputValue(),
            email: await this.email.inputValue(),
            phoneNumber: await this.phoneNumber.inputValue(),
            fullAddress: await this.fullAddress.inputValue(),
            expectedAutoFill: {
                streetAddress: await this.address.inputValue(),
                city: await this.city.inputValue(),
                suburb: await this.suburb.inputValue(),
                state: await this.state.inputValue(),
                country: await this.country.inputValue(),
                postcode: await this.postalCode.inputValue()
            }
         
        };
    }

    async submitForm() {
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }

}

