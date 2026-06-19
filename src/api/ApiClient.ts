import { APIRequestContext, APIResponse, request } from '@playwright/test';

export class ApiClient {
  private baseURL = 'https://api.practicesoftwaretesting.com';
  private token: string | null = null;
  private context: APIRequestContext | null = null;

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.context!.post('/users/login', {
      data: { email, password }
    });
    const body = await response.json();
    this.token = body.access_token;
    return this.token!;
  }

  async get(endpoint: string, auth = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return this.context!.get(endpoint, { headers });
  }

  async post(endpoint: string, data: object, auth = false): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (auth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return this.context!.post(endpoint, { data, headers });
  }

  async dispose() {
    await this.context?.dispose();
  }
}