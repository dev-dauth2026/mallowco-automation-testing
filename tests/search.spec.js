import { test } from '@playwright/test';
import { SearchPage } from '../pages/search';

test.describe('Search Functionality Tests', () => {
  test('Search and Browse Categories', async ({ page }) => {
    const searchPage = new SearchPage(page);

    // Go to homepage
    await searchPage.gotoHomePage();

    // Perform search and select the first product
    await searchPage.searchAndSelectFirstProduct('facewash');

    // Perform another search
    await searchPage.searchProduct('men facewash');

  });
});
