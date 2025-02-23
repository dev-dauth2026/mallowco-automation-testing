import { test, expect, request } from '@playwright/test';
import { Home } from '../../pages/Home';
import { Shop } from '../../pages/Shop';
import 'dotenv/config';
import { ProductDetail } from '../../pages/ProductDetail';

test.describe('Filter Functionality Tests', () => {

    let shopPage;
    let homePage;
    let productDetailPage;
    
  test.beforeEach('Cookies Accept', async ({page})=>{
    homePage = new Home(page);
    shopPage = new Shop(page);
    productDetailPage = new ProductDetail(page);
  
    await homePage.gotoHomePage();
    await homePage.cookiesAccepted();
    
  })

  // ** Filter products using countries origin search/dropdown countries
  test('Filter Countries', async ({ page }) => {
    let searchKeyword = 'in';
    let selectedCountry = 'India';
    let checkedCountry = null; // Ensure it's defined

    // Apply country filter
    await homePage.filterCountries(searchKeyword, selectedCountry);

    // View all countries filter
    await shopPage.viewAllLink.nth(1).click();

    const countriesWithCheckBox = shopPage.countriesWithCheckBox;
    await countriesWithCheckBox.last().waitFor({ state: 'visible' });

    // Count total checkboxes
    const countriesCount = await countriesWithCheckBox.count();
    console.log('Countries Count:', countriesCount);

    // Loop through checkboxes
    for (let i = 0; i < countriesCount; i++) {
        const country = shopPage.countriesWithCheckBox.nth(i);

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

  //** */ Filter products using dropdown categories  
  test('Filter Categories Dropdown', async ({ page }) => {

    const categoriesCount = await shopPage.categoriesDropdownList.count();

    // Now iterate over the CategoryNames
    for (let i=0; i<categoriesCount;i++) {
        const displayName = await shopPage.categoriesDropdownList.nth(i).textContent();
        console.log(displayName);

        // 1. Select this category from the dropdown
        await shopPage.selectCategoryByName(displayName);

        await expect(page).toHaveURL(/shop/);

        await shopPage.product_name.first().click();

        await page.waitForLoadState('networkidle');

        const selectedProductCategory = await productDetailPage.productCategory.first().textContent();

        await expect(selectedProductCategory.trim()).toBe(displayName.trim())

      
    }

  });

  //** Filter categories using category checkbox */
  test('Filter by single category checkbox', async () => {
    await shopPage.navigateToShop();
    await page.waitForLoadState('networkidle');

    const categoryWithCheckBoxCount = await shopPage.categoriesWithCheckBox.count();

    for(let i=0; i< categoryWithCheckBoxCount; i++){
        const checkedCategory = await shopPage.categoriesWithCheckBox.nth(i).textContent();
        await shopPage.categoriesWithCheckBox.nth(i).click();

        expect(await shopPage.categoriesWithCheckBox.isChecked()).toBeTruthy();

        await shopPage.product_name.first().click();
        const productDetailCategory = await productDetailPage.productCategory.first().textContent()

        await expect(productDetailCategory.trim()).toBe(checkedCategory.trim());

    }

  });

  //** Filter products using price range */
  test('Filter by Price', async()=>{
    let minPrice = 5;
    let maxPrice = 15;
    await shopPage.navigateToShop();
    await page.waitForLoadState('networkidle');

    // Set maxprice filter
    await shopPage.setMaxPrice(maxPrice);
    // maxPrice Assertion
    const firstProductMaxPrice =  (shopPage.product_price.first()).split(" ");
    const firstProductMaxPriceNumber = firstProductMaxPrice[2];
    expect(firstProductMaxPriceNumber).toBeLessThanOrEqual(maxPrice);
    // clear the maxPrice input
    await shopPage.clearMaxPrice();

    // set minPrice filter
    await shopPage.setMinPrice(minPrice);
    // minPrice Assertion
    const firstProductMinPrice =  (shopPage.product_price.first()).split(" ");
    const firstProductMinPriceNumber = firstProductMinPrice[2];
    expect(firstProductMinPriceNumber).toBeGreaterThanOrEqual(minPrice);

    // clear the minPrice input
    await shopPage.clearMinPrice();

    // set minPrice and maxPrice at a same time
    await shopPage.setMinMaxPrice(minPrice,maxPrice);
    // both min and max price assertion
    const firstProductMinMaxPrice =  (shopPage.product_price.first()).split(" ");
    const firstProductMinMaxPriceNumber = firstProductMinMaxPrice[2];
    expect(firstProductMinMaxPriceNumber).toBeGreaterThanOrEqual(minPrice);
    expect(firstProductMinMaxPriceNumber).toBeLessThanOrEqual(minPrice);
    // clear the min and max price input field

    await shopPage.clearMaxPrice();
  })

  //** Filter products using country checkbox */
  test('Filter by Country with checkbox', async()=>{
    await shopPage.navigateToShop();
    await page.waitForLoadState('networkidle');

    const countriesWithCheckBoxCount = await shopPage.countriesWithCheckBox.count();

    for(let i=0; i< countriesWithCheckBoxCount; i++){
        const checkedCategory = await shopPage.countriesWithCheckBox.nth(i).textContent();
        await shopPage.countriesWithCheckBox.nth(i).click();

        expect(await shopPage.countriesWithCheckBox.isChecked()).toBeTruthy();

        await shopPage.product_name.first().click();
        const productDetailCategory = await productDetailPage.productCategory.first().textContent()

        await expect(productDetailCategory.trim()).toBe(checkedCategory.trim());

    }
    
  })

  //** Filter product using brand checkbox */
  test('Filter by Brand with checkbox', async()=>{
    await shopPage.navigateToShop();
    await page.waitForLoadState('networkidle');

    const brandWithCheckBoxCount = await shopPage.brandWithCheckBox.count();

    for(let i=0; i< brandWithCheckBoxCount; i++){
        const checkedBrand = await shopPage.brandWithCheckBox.nth(i).textContent();
        await shopPage.brandWithCheckBox.nth(i).click();

        expect(await shopPage.brandWithCheckBox.isChecked()).toBeTruthy();

        await shopPage.product_name.first().click();
        const productDetailBrand = await productDetailPage.productBrand.textContent()

        await expect(productDetailBrand.trim()).toBe(checkedBrand.trim());

    }
    
  })

  
});
