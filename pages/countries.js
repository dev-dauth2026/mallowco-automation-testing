exports.CountriesPage = class CountriesPage {
    constructor(page) {
      this.page = page;
      this.viewAllCountriesButton = page.locator('.filter-section:has-text("Country") .view-all-btn');
      this.countries = {
        australia: page.getByLabel('Australia', { exact: true }),
        china: page.getByLabel('China', { exact: true }),
        india: page.getByLabel('India', { exact: true }),
        maldives: page.getByLabel('Maldives', { exact: true }),
        mexico: page.getByLabel('Mexico', { exact: true }),
        nepal: page.getByLabel('Nepal', { exact: true }),
        pakistan: page.getByLabel('Pakistan', { exact: true }),
        philippines: page.getByLabel('Philippines', { exact: true }),
        southKorea: page.getByLabel('South Korea', { exact: true }),
        sriLanka: page.getByLabel('Sri Lanka', { exact: true }),
        thailand: page.getByLabel('Thailand', { exact: true }),
        turkey: page.getByLabel('Turkey', { exact: true }),
        uae: page.getByLabel('United Arab Emirates', { exact: true }),
        uk: page.getByLabel('United Kingdom', { exact: true }),
        usa: page.getByLabel('United States', { exact: true }),
      };
    }

    async viewAllCountries(){
        await this.viewAllCountriesButton.click();
    }
  
    async toggleCountry(countryName) {
      const country = this.countries[countryName];
      
      await country.check();
      await country.uncheck();
    }
  };
  