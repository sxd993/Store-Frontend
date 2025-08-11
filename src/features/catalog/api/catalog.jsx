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
  return transformCatalogResponse(response.data.data);
};

export const AddProductApi = async (productData) => {
  const response = await client.post('/catalog', productData);
  return transformProductResponse(response.data.data);
};

export const EditProductApi = async (productId, productData) => {
  const response = await client.put(`/catalog/${productId}`, productData);
  return transformProductResponse(response.data.data);
};

function transformProductResponse(product) {
  if (!product) return product;
  
  return {
    ...product,
    images: product.images || [],
    image: getMainImage(product)
  };
}

function transformCatalogResponse(catalogData) {
  if (!catalogData || !catalogData.items) return catalogData;
  
  return {
    ...catalogData,
    items: catalogData.items.map(transformProductResponse)
  };
}

function getMainImage(product) {
  if (product.images && product.images.length > 0) {
    const primaryImage = product.images.find(img => img.is_primary);
    if (primaryImage) return primaryImage.url;
    return product.images[0].url || product.images[0];
  }
  return product.image || null;
}