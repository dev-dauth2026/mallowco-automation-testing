exports.SearchPage = class SearchPage {
    constructor(page) {
      this.page = page;
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
    }
  
    async gotoHomePage() {
      await this.page.goto('https://mallowco.com.au/');
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
      await this.page.locator('.product-header > a').first().click();
    }
  };
  