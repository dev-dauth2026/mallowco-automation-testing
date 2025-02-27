import { test, expect } from "@playwright/test";
import { CheckoutPage } from "../pages/checkout";
import { billingData } from "../data/billingData.json";

test.describe("Checkout Page Tests", () => {
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        profileDashboardPage = new ProfileDashboardPage(page);
        await checkoutPage.goToCheckout();
    });

    // Positive Test Case: Fill shipping address correctly
    test('Prefilled Billing Details from profile', async ({ page }) => {

        // Verify that billing details are auto-filled
        expect (await checkoutPage.getPreFilledBillingDetails()).toEqual(profileDashboardPage.getProfileDetails());
    
        // Change shipping address
        await checkoutPage.fillShippingDetails(billingData.changeBillingAddress);
    
        // Proceed to shipping method selection
        await checkoutPage.proceedToNextStep();
    
        // Verify redirection to the next step
        await expect(page).toHaveURL(/shipping/);
    });

    // Negative Test Case: Invalid phone number
    test("Should show an error for invalid phone number", async ({ page }) => {
        const invalidDetails = billingData.invalidBillingAddress;

        await checkoutPage.fillShippingDetails(invalidDetails);
        await checkoutPage.proceedToNextStep();

        // Check for error message
        await expect(checkoutPage.phoneError).toBeVisible();
        await expect(checkoutPage.phoneError).toHaveText("Please enter a valid phone number.");
    });

    // Negative Test Case: Missing required fields
    test("Should not proceed to next step if required fields are missing", async ({ page }) => {
        const missingDetails = billingData.missingBillingAddress;

        await checkoutPage.fillShippingDetails(missingDetails);
        await checkoutPage.proceedToNextStep();

        // Check for error message
        await expect(checkoutPage.phoneError).toBeVisible();
        await expect(checkoutPage.phoneError).toHaveText("Please enter a valid full address.");
    });

    // Positive Test Case: Apply a coupon successfully
    test("Should apply coupon successfully", async ({ page }) => {
        await checkoutPage.applyCouponCode(billingData.validCouponCode);
        await expect(checkoutPage.couponError).toBeHidden();
        await expect(checkoutPage.couponSuccessMessage).toBeVisible();
    });

    // Negative Test Case: Invalid coupon
    test("Should show error for invalid coupon", async ({ page }) => {
        await checkoutPage.applyCouponCode(billingData.invalidCouponCode);
        await expect(checkoutPage.couponError).toBeVisible();
        await expect(checkoutPage.couponError).toHaveText("Invalid coupon code.");
    });

    // Validate cart total calculation
    test("Should verify cart total", async ({ page }) => {

        await checkoutPage.header.showMyCartDetails()
        const expectedTotal = checkoutPage.cartModal.getTotalCartModalAmount();
        const actualTotal = parseFloat(await checkoutPage.getTotalAmount());

        // Using toBeCloseTo for floating point precision
        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    });

    // Test navigation to next step
    test("Should proceed to the next step", async ({ page }) => {
        await checkoutPage.proceedToNextStep();
        await expect(page).toHaveURL(/shipping-methods/);
    });

    // Test selecting a shipping method
    test("Should select a shipping method", async ({ page }) => {
       
    });

    // Test Payment Step Navigation
    test("Should navigate to payment step", async ({ page }) => {
       

        await expect(page).toHaveURL(/payments/);
    });

    // Test payment method selection
    test("Should select a payment method", async ({ page }) => {
       
    });

    // Test completing order
    test("Should complete the order successfully", async ({ page }) => {
     

        await checkoutPage.proceedToNextStep(); // Shipping
        await checkoutPage.selectShippingMethod("Express");
        await checkoutPage.proceedToNextStep(); // Payment
        await checkoutPage.selectPaymentMethod("Credit Card");
        await checkoutPage.completeOrder();

        // Validate order confirmation
        await expect(checkoutPage.orderConfirmationMessage).toBeVisible();
        await expect(checkoutPage.orderConfirmationMessage).toHaveText("Your order has been placed successfully!");
    });
});
