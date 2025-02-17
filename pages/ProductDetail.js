import { BasePage } from './BasePage';
import { expect } from '@playwright/test';
// productPage.js

export class ProductDetail extends BasePage {
  constructor(page) {
    super(page)

    // Locators: Identify core elements on the product page
    this.productTitle = page.locator('.product-title h2'); 
    this.stockStatus = page.locator('.stock-status');
    this.productCategory = page.locator('.product-properties div');
    this.productBrand = page.locator('.product-properties div').nth(2);
    this.addToCartBtn = page.locator('.cart-button .js-add-to-cart');
    this.buyNowBtn = page.locator('.cart-button .js-add-to-cart-n-go');
    this.quantityInput = page.locator('.product-quantity .quantity input.qty');
    this.plusButton = page.locator('.product-quantity .quantity .plus');
    this.minusButton = page.locator('.product-quantity .quantity .minus');
    this.packSizeOptions = page.locator('.pack-size-list .form-check-input'); 
    this.totalAmountText = page.locator('#total-price-section'); 
  }



  /**
   * Confirm product title is correct
   */
  async expectProductTitle(title) {
    await expect(this.productTitle).toHaveText(title, { timeout: 5000 });
  }

  /**
   * Check the stock status (e.g., "In stock" vs. "Out of stock")
   */
  async expectInStock() {
    await expect(this.stockStatus).toContainText('In stock', { timeout: 5000 });
  }

  /**
   * Select a particular pack size by label text or index
   */
  async selectPackSizeByIndex(index) {
    // If multiple pack sizes are listed as radio inputs or checkboxes
    // We'll select by index in the locator n-th item
    await this.packSizeOptions.nth(index).check();
    // Wait for any dynamic price change or assertion if needed
    await this.page.waitForTimeout(500); 
  }

  /**
   * Increase the quantity by clicking the plus button n times
   * or pass negative n to click minus
   */
  async changeQuantity(n) {
    if (n > 0) {
      for (let i = 0; i < n; i++) {
        await this.plusButton.click();
      }
    } else {
      for (let i = 0; i < Math.abs(n); i++) {
        await this.minusButton.click();
      }
    }
  }

  /**
   * Get the current quantity as a number
   */
  async getQuantityValue() {
    const val = await this.quantityInput.inputValue();
    return parseInt(val, 10);
  }

  /**
   * Fetch the total amount text (e.g., "AU $ 9.98")
   */
  async getTotalAmount() {
    return await this.totalAmountText.innerText();
  }

  /**
   * Click "Add to cart" button
   */
  async addToCart() {
    await this.addToCartBtn.click();
  }

  /**
   * Click "Buy now" button
   */
  async buyNow() {
    await this.buyNowBtn.click();
  }

  /**
   * Open the categories dropdown from the main navbar
   */
  async openCategoriesDropdown() {
    await this.categoriesDropdown.click();
  }

  /**
   * Example: if you had a map of category links
   */
  async selectCategory(catName) {
    const catLink = this.page.locator(`.category-dropdown a:has-text("${catName}")`);
    await catLink.click();
  }
}

