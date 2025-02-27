import { BasePage } from "./BasePage";

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

    async verifyPreFilledBillingDetails(expectedData) {
        await expect(this.locators.billingFirstName).toHaveValue(expectedData.firstName);
        await expect(this.locators.billingLastName).toHaveValue(expectedData.lastName);
        await expect(this.locators.billingPhoneNumber).toHaveValue(expectedData.phoneNumber);
        await expect(this.locators.billingFullAddress).toHaveValue(expectedData.fullAddress);
    }
}