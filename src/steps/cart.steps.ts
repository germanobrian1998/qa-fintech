import { Given, When, Then } from '@cucumber/cucumber';
import { QAWorld } from '../support/world';
import { CartPage } from '../pages/CartPage';

let cartPage: CartPage;

Given('I am on the home page', async function (this: QAWorld) {
  cartPage = new CartPage(this.page);
  await cartPage.navigateToHome();
});

Given('I have 1 product in the cart', async function (this: QAWorld) {
  cartPage = new CartPage(this.page);
  await cartPage.navigateToHome();
  await cartPage.addFirstProductToCart();
});

When('I add the first product to the cart', async function (this: QAWorld) {
  await cartPage.addFirstProductToCart();
});

When('I add the second product to the cart', async function (this: QAWorld) {
  await cartPage.addSecondProductToCart();
});

When('I remove the product from the cart', async function (this: QAWorld) {
  await cartPage.removeFirstProduct();
});

When('I navigate to the home page', async function (this: QAWorld) {
  await cartPage.navigateToHome();
});

Then('the cart counter should show {int}', async function (this: QAWorld, count: number) {
  await cartPage.expectCartCount(count);
});

Then('the cart should be empty', async function (this: QAWorld) {
  await cartPage.expectCartEmpty();
});