import { test } from '@playwright/test';
import { CategoriesPage } from '../pages/categoriesPage';
import { BrandsPage } from '../pages/brands';
import { CountriesPage } from '../pages/countries';

test.describe('Filter Functionality Tests', () => {
  test('Filter Categories', async ({ page }) => {
    const categoriesPage = new CategoriesPage(page);
    const brandsPage = new BrandsPage(page);
    const countriesPage = new CountriesPage(page);

    // Go to homepage
    await categoriesPage.gotoHomePage();

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
});
