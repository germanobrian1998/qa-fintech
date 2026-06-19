import { Page, expect } from "@playwright/test";

export class CartPage {
  constructor(private page: Page) {}

  // Locators
  private cartCounter = this.page.locator('[data-test="cart-quantity"]');
  private firstProductCard = this.page
    .locator('[data-test="product-name"]')
    .first();
  private secondProductCard = this.page
    .locator('[data-test="product-name"]')
    .nth(1);
  private addToCartButton = this.page.locator('[data-test="add-to-cart"]');
  private cartIcon = this.page.locator('[data-test="nav-cart"]');
  private removeButton = this.page.locator(".btn.btn-danger").first();
  private cartItems = this.page.locator(".ng-star-inserted");

  // Actions
  async navigateToHome() {
    await this.page.goto("https://practicesoftwaretesting.com", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await this.page.waitForSelector('[data-test="product-name"]', {
      timeout: 30000,
    });
  }

  async addFirstProductToCart() {
    await this.firstProductCard.waitFor({ state: "visible", timeout: 30000 });
    await this.firstProductCard.click();
    await this.page.waitForSelector('[data-test="add-to-cart"]', {
      timeout: 30000,
    });
    await this.addToCartButton.click();
    await this.page.goBack();
    await this.page.waitForSelector('[data-test="product-name"]', {
      timeout: 30000,
    });
  }

  async addSecondProductToCart() {
    await this.secondProductCard.waitFor({ state: "visible", timeout: 30000 });
    await this.secondProductCard.click();
    await this.page.waitForSelector('[data-test="add-to-cart"]', {
      timeout: 30000,
    });
    await this.addToCartButton.click();
    await this.page.goBack();
    await this.page.waitForSelector('[data-test="product-name"]', {
      timeout: 30000,
    });
  }

  async navigateToCart() {
    await this.cartIcon.click();
    await this.page.waitForURL(/checkout|cart/, { timeout: 30000 });
  }

  async removeFirstProduct() {
    await this.navigateToCart();
    await this.page.waitForSelector(".btn.btn-danger", { timeout: 30000 });
    await this.removeButton.waitFor({ state: "visible", timeout: 30000 });
    await this.removeButton.click();
  }

  // Assertions
  async expectCartCount(count: number) {
    await expect(this.cartCounter).toHaveText(String(count), {
      timeout: 30000,
    });
  }

  async expectCartEmpty() {
    await this.navigateToCart();
    const emptyMessage = this.page.locator("p.ng-star-inserted");
    await expect(emptyMessage).toBeVisible({ timeout: 30000 });
  }
}
