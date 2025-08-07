import axios from 'axios';

export const client = axios.create({
    baseURL: "http://localhost:8000/api/",
    withCredentials: true,
});

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true, // Автоматически отправляем cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Можно добавить дополнительные заголовки
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor для автоматического обновления токена
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Если получили 403 и это не повторный запрос
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Пытаемся обновить токен
        await api.post('/auth/refresh');
        
        // Повторяем оригинальный запрос
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh token тоже невалиден - перенаправляем на логин
        console.log('Refresh token expired, redirecting to login');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;