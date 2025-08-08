import { client } from '../client';

export const GetFilterCategory = async () => {
  const response = await client.get('/catalog/filters');
  return response.data.data;
};