// src/features/cart/api/cartApi.js
import { client } from '../../../shared/api/client';

export const cartApi = {
  // === КОРЗИНА ===
  getCart: async () => {
    const response = await client.get('/cart');
    return response.data.data;
  },

  addItem: async ({ productId, quantity = 1 }) => {
    const response = await client.post('/cart/add', {
      product_id: productId,
      quantity
    });
    return response.data.data;
  },

  updateQuantity: async ({ productId, quantity }) => {
    const response = await client.put('/cart/update', {
      product_id: productId,
      quantity
    });
    return response.data.data;
  },

  removeItem: async (productId) => {
    const response = await client.delete(`/cart/remove/${productId}`);
    return response.data.data;
  },

  clearCart: async () => {
    const response = await client.delete('/cart/clear');
    return response.data.data;
  },

  // === СОЗДАНИЕ ЗАКАЗА ===
  createOrder: async (userId) => {
    const response = await client.post('/orders', {
      user_id: userId
    });
    return response.data.data;
  }
};