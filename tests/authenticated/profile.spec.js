import {test,expect} from '@playwright/test';
import {EditProfilePage} from '../pages/editProfilePage';
import { BillingData } from '../../pages/data/billingData.json';
import { ProfileDashboardPage } from '../pages/profileDashboardPage';
import 'env/config';

test.describe("Profile Page Tests", async () => {
    let editProfilePage;

    test.beforeEach(async ({page}) => {
        editProfilePage = new EditProfilePage(page);
        profileDashboardPage = new ProfileDashboardPage(page);
        await editProfilePage.gotoProfile();
    });

    // Positive Test Case: Prefilled Billing Details from profile
    test('Full Name and Email should be prefilled', async ({page}) => {
        await expect(this.EditProfilePage.fullName).toHaveValue(env.process.FIRST_NAME+" "+env.process.LAST_NAME);
        await expect(this.EditProfilePage.email).toHaveValue(env.process.EMAIL);

    });

    // Positive Test Case: Update profile details with billing details
    test('Should update profile details with billing details', async ({page}) => {
       // Update profile details with billing details
        await editProfilePage.updateProfileDetails(BillingData.actualBillingAddress);

        const billingDetails = await editProfilePage.getBillingDetials();
        // Verify updated billing details with expected data
        expect(billingDetails).toEqual(BillingData.actualBillingAddress);

        await editProfilePage.submitForm();

        await expect(page).toHaveURL(/dashboard/);

        //Retrieve billing details from Profile Dashboard
        const dashboardBillingDetails = await profileDashboardPage.getProfileDetails();

        //Verify updated billing details are displayed correctly in Profile Dashboard
        expect(dashboardBillingDetails).toEqual(BillingData.actualBillingAddress);


    });
});