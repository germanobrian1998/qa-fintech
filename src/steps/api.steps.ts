import { When, Then } from '@cucumber/cucumber';
import { QAWorld } from '../support/world';
import { ApiClient } from '../api/ApiClient';
import { ProductsResponse } from '../api/contracts/products.contract';
import { LoginResponse } from '../api/contracts/auth.contract';
import { expect } from '@playwright/test';

let apiClient: ApiClient;
let response: any;
let responseTime: number;

When('I send a GET request to {string}', async function (this: QAWorld, endpoint: string) {
  apiClient = new ApiClient();
  await apiClient.init();
  const start = Date.now();
  response = await apiClient.get(endpoint);
  responseTime = Date.now() - start;
});

When('I login via API with email {string} and password {string}', async function (
  this: QAWorld,
  email: string,
  password: string
) {
  apiClient = new ApiClient();
  await apiClient.init();
  response = await apiClient.post('/users/login', { email, password });
});

Then('the response status should be {int}', async function (this: QAWorld, status: number) {
  expect(response.status()).toBe(status);
});

Then('the response should contain a list of products', async function (this: QAWorld) {
  const body: ProductsResponse = await response.json();
  expect(body).toHaveProperty('data');
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);
});

Then('each product should have required fields', async function (this: QAWorld) {
  const body: ProductsResponse = await response.json();
  for (const product of body.data) {
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(typeof product.price).toBe('number');
  }
});

Then('the response should contain an access token', async function (this: QAWorld) {
  const body: LoginResponse = await response.json();
  expect(body).toHaveProperty('access_token');
  expect(typeof body.access_token).toBe('string');
  expect(body.access_token.length).toBeGreaterThan(0);
});

Then('the response time should be under {int} milliseconds', async function (
  this: QAWorld,
  limit: number
) {
  expect(responseTime).toBeLessThan(limit);
});