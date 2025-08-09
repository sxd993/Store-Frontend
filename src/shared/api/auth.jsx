import { client } from './client';

export const LoginApi = async (credentials) => {
  const response = await client.post('/auth/login', credentials);
  return response.data.data;
};

export const RegisterApi = async (userData) => {
  const response = await client.post('/auth/register', userData);
  return response.data.data;
};

export const GetProfileApi = async () => {
  const response = await client.get('/auth/me');
  return response.data.data;
};

export const LogoutApi = async () => {
  const response = await client.post('/auth/logout');
  return response.data.data;
};