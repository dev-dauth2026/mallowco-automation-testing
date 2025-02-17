import { BasePage } from "./BasePage";

export class SearchPage extends BasePage {
    constructor(page) {
      super(page);

      //Locators
      this.searchBox = page.getByPlaceholder('Search Keywords to search...');
      this.searchButton = page.getByLabel('Search Products', { exact: true });
      this.categories_link = page.getByRole('banner').getByText('Categories')
      this.categories = {
        entertainments: page.getByRole('link', { name: 'Entertainments & Electronics' }),
        clothes: page.getByRole('banner').getByRole('link', { name: 'Clothes & Appearance' }),
        kitchen: page.getByRole('banner').getByRole('link', { name: 'Kitchen & Utensils' }),
        sweets: page.getByRole('banner').getByRole('link', { name: 'Sweets & Chocolate' }),
        fruits: page.getByRole('link', { name: 'Fruits & Vegetables' }),
        dailyNeeds: page.getByRole('link', { name: 'Daily Needs & Others' }),
        sugarTea: page.getByRole('link', { name: 'Sugar & Tea' }),
      };
      this.product = page.locator('.product .product-name h3');
      this.productLink = page.locator('.product .product-name a');
      this.productDetailTitle = page.locator('.product-title h2');
    }
  
    async searchProduct(keyword) {
      await this.searchBox.click();
      await this.searchBox.fill(keyword);
      await this.searchBox.press('Enter');
      await this.searchButton.click();
    }
  
    async browseCategory(category) {

      await this.categories_link.click();  
      await this.categories[category].click();
    }
  
    async searchAndSelectFirstProduct(keyword) {
      await this.searchProduct(keyword);
      const selectedProduct = await this.product.first().textContent();
      await this.productLink.first().click();

      return selectedProduct;
    }
  };
  