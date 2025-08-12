
import { client } from '../../../shared/api/client';

export const cartApi = {
  // Получить корзину
  getCart: async () => {
    const response = await client.get('/cart');
    return response.data.data;
  },

  // Добавить товар
  addItem: async ({ productId, quantity = 1 }) => {
    const response = await client.post('/cart/add', {
      product_id: productId,
      quantity
    });
    return response.data.data;
  },

  // Обновить количество
  updateQuantity: async ({ productId, quantity }) => {
    const response = await client.put('/cart/update', {
      product_id: productId,
      quantity
    });
    return response.data.data;
  },

  // Удалить товар
  removeItem: async (productId) => {
    const response = await client.delete(`/cart/remove/${productId}`);
    return response.data.data;
  },

  // Очистить корзину
  clearCart: async () => {
    const response = await client.delete('/cart/clear');
    return response.data.data;
  }
};