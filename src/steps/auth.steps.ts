import { Given, When, Then } from '@cucumber/cucumber';
import { QAWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';

let loginPage: LoginPage;

Given('I am on the login page', async function (this: QAWorld) {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('I enter email {string}', async function (this: QAWorld, email: string) {
  await loginPage.enterEmail(email);
});

When('I enter password {string}', async function (this: QAWorld, password: string) {
  await loginPage.enterPassword(password);
});

When('I click the login button', async function (this: QAWorld) {
  await loginPage.clickLoginButton();
});

Then('I should see my account dashboard', async function (this: QAWorld) {
  await loginPage.expectDashboardVisible();
});

Then('I should see my full name {string}', async function (this: QAWorld, name: string) {
  await loginPage.expectFullName(name);
});

Then('I should see the error message {string}', async function (this: QAWorld, message: string) {
  await loginPage.expectErrorMessage(message);
});

Then('I should see a validation error for {string}', async function (this: QAWorld, field: string) {
  await loginPage.expectValidationErrorFor(field);
});