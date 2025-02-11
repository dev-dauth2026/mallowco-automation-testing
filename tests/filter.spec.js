import { test, expect } from '@playwright/test';
import { BrandsPage } from '../pages/components/shop_components/brands';
import { Countries, CountriesPage } from '../pages/components/Countries';
import { CategoriesPage } from '../pages/components/categoriesPage';
import { Home } from '../pages/home';
import { Shop } from '../pages/shop';
require('dotenv').config();

test.describe('Filter Functionality Tests', () => {
    
  test.beforeEach('Cookies Accept', async ({page})=>{
    const homePage = new Home(page);
    await homePage.gotoHomePage();
    await homePage.cookiesAccepted();
  })

  test('Filter Categories', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    const brandsPage = new BrandsPage(page);
    const countriesPage = new CountriesPage(page);

    // Browse various categories
    await categoriesPage.browseCategory('entertainments');
    await categoriesPage.browseCategory('clothes');
    await categoriesPage.browseCategory('kitchen');
    await categoriesPage.browseCategory('sweets');
    await categoriesPage.browseCategory('wine');
    await categoriesPage.browseCategory('fruits');
    await categoriesPage.browseCategory('thai');
    await categoriesPage.browseCategory('comboPack');
    await categoriesPage.browseCategory('festive');
    await categoriesPage.browseCategory('dailyNeeds');
    await categoriesPage.browseCategory('sugarTea');
    await categoriesPage.browseCategory('dairy');
    await categoriesPage.browseCategory('frozenFoods');
    await categoriesPage.browseCategory('nutsOil');
    await categoriesPage.browseCategory('riceFlour');
    await categoriesPage.browseCategory('pickleChutney');
    await categoriesPage.browseCategory('snacks');
    await categoriesPage.browseCategory('spices');
    await categoriesPage.browseCategory('groceries');

    // Set price filter
    await categoriesPage.setMaxPrice('5');
    await categoriesPage.clearMaxPrice();

    // Toggle countries
    await countriesPage.viewAllCountries();

    await countriesPage.toggleCountry('australia');
    await countriesPage.toggleCountry('china');
    await countriesPage.toggleCountry('india');
    await countriesPage.toggleCountry('maldives');
    await countriesPage.toggleCountry('mexico');
    await countriesPage.toggleCountry('nepal');
    await countriesPage.toggleCountry('pakistan');
    await countriesPage.toggleCountry('philippines');
    await countriesPage.toggleCountry('southKorea');
    await countriesPage.toggleCountry('sriLanka');
    await countriesPage.toggleCountry('thailand');
    await countriesPage.toggleCountry('turkey');
    await countriesPage.toggleCountry('uae');
    await countriesPage.toggleCountry('uk');
    await countriesPage.toggleCountry('usa');

    // Toggle brands
    await brandsPage.viewAllBrands();

    await brandsPage.toggleBrand('godrej');
    await brandsPage.toggleBrand('dettol');
    await brandsPage.toggleBrand('waiWai');
    await brandsPage.toggleBrand('silka');
    await brandsPage.toggleBrand('colgate');
    await brandsPage.toggleBrand('sensodyne');
    await brandsPage.toggleBrand('patanjali');
    await brandsPage.toggleBrand('pepsodent');
    await brandsPage.toggleBrand('siso');
    await brandsPage.toggleBrand('vip');
    await brandsPage.toggleBrand('fogg');
    await brandsPage.toggleBrand('neha');
  });

  test('Filter Countries', async ({ page }) => {
    let searchKeyword = 'in';
    let selectedCountry = 'India';
    let checkedCountry = null; // Ensure it's defined

    const homePage = new Home(page);
    const shop = new Shop(page);

    // Apply country filter
    await homePage.filterCountries(searchKeyword, selectedCountry);

    // View all countries filter
    await shop.viewAllLink.nth(1).click();

    const countriesWithCheckBox = shop.countriesWithCheckBox;
    await countriesWithCheckBox.last().waitFor({ state: 'visible' });

    // Count total checkboxes
    const countriesCount = await countriesWithCheckBox.count();
    console.log('Countries Count:', countriesCount);

    // Loop through checkboxes
    for (let i = 0; i < countriesCount; i++) {
        const country = shop.countriesWithCheckBox.nth(i);

        if (await country.isChecked()) { //Ensure checkbox is checked
            checkedCountry = await country.locator('..').locator('.form-check-label').textContent();
            break; //Stop loop after finding the checked one
        }
    }

    // Debugging Output
    console.log('Checked Country:', checkedCountry);

    // Ensure checkedCountry is not null before calling trim()
    expect(checkedCountry).not.toBeNull();
    expect(checkedCountry.trim()).toBe(selectedCountry);
    });
});
