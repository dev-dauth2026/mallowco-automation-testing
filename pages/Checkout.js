import { BasePage } from "./BasePage";
import { selectDropdownAddress } from "./utils/selectDropdownAddress";

export class CheckoutPage extends BasePage{
    constructor(page){
        super(page)

        this.checkoutPageHeader = page.locator('.stepper-header')
        // Step Navigation Tabs
        this.shippingAddressTab = page.getByRole('link', { name: 'Shipping Address' });
        this.shippingMethodsTab = page.getByRole('link', { name: 'Shipping Methods' });
        this.paymentsTab = page.getByRole('link', { name: 'Payments' });

        // Shipping Address Fields
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.phoneNumber = page.locator('#phone_number');
        this.companyName = page.locator('#company_name');

        this.fullAddress = page.locator('#full_address');
        // Dropdown options for address auto-fill
        this.dropdownOptions = page.locator('.pac-item');

        this.streetAddress = page.locator('#street_address');
        this.unit = page.locator('#unit');
        this.city = page.locator('#city');
        this.suburb = page.locator('#suburb');
        this.state = page.locator('#state');
        this.country = page.locator('#country');
        this.postcode = page.locator('#postcode');
        this.differentShippingCheckbox = page.locator('#shipping-ads');

        // Cart Summary
        this.cartSubtotal = page.locator('#total_sub_total');
        this.totalShippingCost = page.locator('#total_shipping_cost');
        this.additionalShippingCost = page.locator('#additional_shipping_cost');
        this.totalAmount = page.locator('#total_amount');

        // Coupon Section
        this.couponInput = page.locator('#coupon_code');
        this.applyCouponButton = page.locator('#js-apply-coupon');
        this.couponError = page.locator('#js-coupon-code-error');

        // Next Step Button
        this.nextButton = page.locator('.btn.om-btn', { hasText: 'Next' });


    }

    async goToCheckout() {
        await this.page.goto(env.process.TEST_URL+'checkout');
        await this.page.waitForLoadState('networkidle');
    }

    async getPreFilledBillingDetails() {

        return {
            fullNamae: await this.fullName.inputValue(),
            phoneNumber: await this.phoneNumber.inputValue(),
            companyName: await this.companyName.inputValue(),
            fullAddress: await this.fullAddress.inputValue(),
            expectedAutoFill:{
                streetAddress: await this.streetAddress.inputValue(),
                unit: await this.unit.inputValue(),
                city: await this.city.inputValue(),
                suburb: await this.suburb.inputValue(),
                state: await this.state.inputValue(),
                country: await this.country.inputValue(),
                postcode: await this.postcode.inputValue()
            }
        }
    }

    async fillShippingDetails(newShippingDetails) {
        await this.firstName.fill(newShippingDetails.firstName);
        await this.lastName.fill(newShippingDetails.lastName);
        await this.phoneNumber.fill(newShippingDetails.phone);
        await this.fullAddress.fill(newShippingDetails.fullAddress);

        // Ensure the correct address option appears and select it
        const dropdownOptions = await this.dropdownOptions.allTextContents();
        await selectDropdownAddress(dropdownOptions, newDetails);
    }

    async proceedToNextStep() {
        await this.nextButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async applyCouponCode(couponCode) {
        await this.couponInput.fill(couponCode);
        await this.applyCouponButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getTotalAmount() {
        return  parseFloat((await this.totalAmount.textContent()).trim());
    }
}