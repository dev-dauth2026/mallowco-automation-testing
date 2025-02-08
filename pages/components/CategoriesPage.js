exports.CategoriesPage = class CategoriesPage {
    constructor(page) {
      this.page = page;
      this.categories_link = page.getByRole('banner').getByText('Categories')
      this.categories =  {
        entertainments: page.getByRole('banner').getByRole('link', { name: 'Entertainments & Fun' }),
        clothes: page.getByRole('banner').getByRole('link', { name: 'Clothes & Appearance' }),
        kitchen: page.getByRole('banner').getByRole('link', { name: 'Kitchen & Utensils' }),
        sweets: page.getByRole('banner').getByRole('link', { name: 'Sweets & Chocolate' }),
        wine: page.getByRole('banner').getByRole('link', { name: 'Wine & Alcohol' }),
        fruits: page.getByRole('link', { name: 'Fruits & Vegetables' }),
        organic: page.getByRole('banner').getByRole('link', { name: 'Organic Range' }),
        thai: page.getByRole('link', { name: 'Thai Special' }),
        comboPack: page.locator('li').filter({ hasText: 'Combo Pack' }),
        festive: page.getByRole('link', { name: 'Festive and Occasions' }),
        dailyNeeds: page.getByRole('link', { name: 'Daily Needs & Others' }),
        sugarTea: page.locator('li').filter({ hasText: 'Sugar & Tea' }),
        dairy: page.getByRole('link', { name: 'Dairy & Fresh Produce' }),
        frozenFoods: page.locator('li').filter({ hasText: 'Frozen & Fridge Foods' }),
        cosmetics: page.getByRole('banner').getByRole('link', { name: 'Cosmetics & Health' }),
        nutsOil: page.getByRole('link', { name: 'Nuts,Ghee & Oil' }),
        riceFlour: page.getByRole('link', { name: 'Rice & Flour' }),
        pickleChutney: page.getByRole('link', { name: 'Pickle & Chutney' }),
        snacks: page.getByRole('link', { name: 'Snacks & Biscuit' }),
        spices: page.getByRole('link', { name: 'Spices & Premix' }),
        groceries: page.getByRole('link', { name: 'Groceries' }),
      };
      this.priceFilter = page.getByPlaceholder('Max');
    }
  
    async gotoHomePage() {
      await this.page.goto('https://mallowco.com.au/');
    }
  
    async browseCategory(category) {

      await this.categories_link.click();  
      await this.categories[category].click();
    }
  
    async setMaxPrice(price) {
      await this.priceFilter.click();
      await this.priceFilter.fill(price);
      await this.page.getByRole('button', { name: '' }).click();
    }
  
    async clearMaxPrice() {
      await this.priceFilter.dblclick();
      await this.priceFilter.fill('');
    }
  };
  