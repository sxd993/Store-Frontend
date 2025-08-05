import {client} from '../client';

export const CatalogApi = async ({ page = 1, per_page = 20 } = {}) => {
  const response = await client.get('/catalog', {
    params: { page, per_page },
  });
  return response.data.data;
};