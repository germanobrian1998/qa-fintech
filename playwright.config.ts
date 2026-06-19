import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports/playwright-report' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ]
});