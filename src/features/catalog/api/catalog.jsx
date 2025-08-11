import {client} from '../../../shared/api/client';

export const CatalogApi = async ({ page = 1, per_page = 20, filters = {} } = {}) => {
  const params = { page, per_page };
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value && 
        value !== 'all' && 
        value !== 'Все категории' && 
        value !== 'Все бренды') {
      params[key] = value;
    }
  });

  const response = await client.get('/catalog', { params });
  return response.data.data;
};

export const ProductApi = async (productId) => {
  const response = await client.get(`/catalog/${productId}`);
  return response.data.data;
};

export const AddProductApi = async (productData) => {
  const response = await client.post('/catalog', productData);
  return response.data.data;
}

export const EditProductApi = async (productId, productData) => {
  const response = await client.put(`/catalog/${productId}`, productData);
  return response.data.data;
}