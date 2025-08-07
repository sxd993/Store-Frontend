import api from '../client';

export const authApi = {
  // Регистрация
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Вход
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Выход
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Выход со всех устройств
  logoutAll: async () => {
    const response = await api.post('/auth/logout-all');
    return response.data;
  },

  // Получить данные текущего пользователя
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Обновить токен (обычно вызывается автоматически)
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  }
};