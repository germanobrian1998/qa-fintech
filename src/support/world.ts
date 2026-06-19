import { World, WorldParameters, setWorldConstructor } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export interface QAWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

class CustomWorld extends World implements QAWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(options: { parameters: WorldParameters }) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);