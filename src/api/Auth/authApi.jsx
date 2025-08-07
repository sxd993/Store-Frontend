class ApiClient {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(data.message || 'Ошибка сервера');
    }

    return data;
  }

  auth = {
    login: (credentials) => 
      this.request('/auth/login', {
        method: 'POST',
        body: credentials,
      }),
      
    register: (userData) =>
      this.request('/auth/register', {
        method: 'POST',
        body: userData,
      }),
      
    getProfile: () => this.request('/auth/me'),
    
    logout: () => this.request('/auth/logout', { method: 'POST' }),
  };
}

export const api = new ApiClient();
