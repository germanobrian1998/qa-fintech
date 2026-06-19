import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Locators
  private emailInput = this.page.locator('[data-test="email"]');
  private passwordInput = this.page.locator('[data-test="password"]');
  private loginButton = this.page.locator('[data-test="login-submit"]');
  private errorMessage = this.page.locator('[data-test="login-error"]');
  private fullName = this.page.locator('[data-test="nav-menu"]');

  // Actions
  async navigate() {
    await this.page.goto('/auth/login');
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  // Assertions
  async expectDashboardVisible() {
    await expect(this.page).toHaveURL(/account/);
  }

  async expectFullName(name: string) {
    await expect(this.fullName).toContainText(name);
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectValidationErrorFor(field: string) {
    const fieldLocator = this.page.locator(`[data-test="${field}-error"]`);
    await expect(fieldLocator).toBeVisible();
  }
}