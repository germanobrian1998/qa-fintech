import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { QAWorld } from './world';

BeforeAll(async function () {
  // Setup global si es necesario
});

Before(async function (this: QAWorld) {
  this.browser = await chromium.launch({ headless: true });
  this.context = await this.browser.newContext({
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com'
  });
  this.page = await this.context.newPage();
});

After(async function (this: QAWorld, scenario) {
  if (scenario.result?.status === 'FAILED') {
    await this.page.screenshot({
      path: `reports/screenshots/${scenario.pickle.name}.png`
    });
  }
  await this.context.close();
  await this.browser.close();
});

AfterAll(async function () {
  // Teardown global si es necesario
});