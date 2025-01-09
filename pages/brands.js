exports.BrandsPage = class BrandsPage {
    constructor(page) {
      this.page = page;
      this.viewAllBrandsButton = page.locator('.filter-section:has-text("Brands") .view-all-btn');;
      this.brands = {
        godrej: page.getByLabel('Godrej'),
        dettol: page.getByLabel('Dettol'),
        waiWai: page.getByLabel('Wai Wai'),
        silka: page.getByLabel('Silka'),
        colgate: page.getByLabel('Colgate'),
        sensodyne: page.getByLabel('Sensodyne'),
        patanjali: page.getByLabel('Patanjali'),
        pepsodent: page.getByLabel('Pepsodent'),
        siso: page.getByLabel('Siso'),
        vip: page.getByLabel('Vip'),
        fogg: page.getByLabel('Fogg'),
        neha: page.getByLabel('Neha'),
      };
    }

    async viewAllBrands(){
        await this.viewAllBrandsButton.click();
    }
  
    async toggleBrand(brandName) {
      const brand = this.brands[brandName];
      await brand.check();
      await brand.uncheck();
    }
  };
  