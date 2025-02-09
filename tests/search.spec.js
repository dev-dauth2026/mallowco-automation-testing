import { test,expect } from '@playwright/test';
import { SearchPage } from '../pages/search';
require('dotenv').config();

test.describe('Search Functionality Tests', () => {
  
  test.beforeEach('Homa page',async ({page})=>{
    const searchPage = new SearchPage(page);
    // Go to homepage
    await searchPage.gotoHomePage();

    // Cookies Accept 
    await searchPage.cookiesAccepted();
  })

  test('Search, select and detail page test', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Perform search and select the first product and check the detail page title is same or not
    const selectedProduct = await searchPage.searchAndSelectFirstProduct('facewash');
    console.log('Console Log***');
    console.log('Selected product**', selectedProduct);
    console.log('Expected',await searchPage.productDetailTitle.textContent())
    expect(await searchPage.productDetailTitle.textContent()).toContain(selectedProduct)
   
  });

  test('Search and match the search keywords', async({page})=>{
    const searchPage = new SearchPage(page);

    // Perform another search
    await searchPage.searchProduct('men facewash');

    //If there's a list of products, wait for the last one
    const lastProduct = searchPage.product.last();
    await lastProduct.waitFor({ state: 'visible' });

    // Returns the number of matching elements
    // console.log('search text first',await page.getByText(/men\s*\w*\s*face\s*wash/i).first().textContent());

    const matchesCount = await page.getByText(/men\s*\w*\s*face\s*wash/i).count();

    console.log('match count', matchesCount);

    // Now do a numeric comparison:
    expect(matchesCount).toBeGreaterThan(0);
  })
});
