import { client } from '../../../shared/api/client';

export const searchProducts = async (query) => {
  if (!query || query.trim().length < 1) {
    return [];
  }

  const response = await client.get('/api/search', {
    params: { q: query.trim() }
  });
  
  return response.data.data || [];
};