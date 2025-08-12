import { client } from '../../../shared/api/client';

export const getCartApi = async () => {
  const response = await client.get('/cart');
  return response.data.data;
};

export const addToCartApi = async ({ productId, quantity = 1 }) => {
  const response = await client.post('/cart/add', {
    product_id: productId,
    quantity
  });
  return response.data.data;
};

export const updateCartItemApi = async ({ productId, quantity }) => {
  const response = await client.put('/cart/update', {
    product_id: productId,
    quantity
  });
  return response.data.data;
};

export const removeFromCartApi = async (productId) => {
  const response = await client.delete(`/cart/remove/${productId}`);
  return response.data.data;
}
export const clearCartApi = async () => {
  const response = await client.delete('/cart/clear');
  return response.data.data;
};

/* Синхронизация корзины из LocalStorage с сервером */
export const syncCartApi = async (localCartItems) => {
  if (!Array.isArray(localCartItems) || localCartItems.length === 0) {
    return { success: true, message: 'Нет товаров для синхронизации' };
  }

  const response = await client.post('/cart/sync', {
    items: localCartItems.map(item => ({
      product_id: item.id,
      quantity: item.quantity
    }))
  });
  return response.data.data;
};