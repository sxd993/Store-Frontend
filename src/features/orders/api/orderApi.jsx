import { client } from '../../../shared/api/client';

export const orderApi = {
  // Получить заказы пользователя
  getUserOrders: async (page = 1, per_page = 10) => {
    const response = await client.get('/user/orders', {
      params: { page, per_page }
    });
    return response.data.data;
  },

  // Получить детали заказа пользователя
  getUserOrderDetails: async (orderId) => {
    const response = await client.get(`/user/orders/${orderId}`);
    return response.data.data;
  },

  // НОВЫЙ: Получить все заказы (только для админа)
  getAllOrdersForAdmin: async (page = 1, per_page = 20) => {
    const response = await client.get('/admin/orders/all', {
      params: { page, per_page }
    });
    return response.data.data;
  },

  // НОВЫЙ: Получить детали любого заказа (только для админа)
  getAnyOrderDetails: async (orderId) => {
    const response = await client.get(`/admin/orders/${orderId}/details`);
    return response.data.data;
  },

  // Админские функции (старые)
  getAllOrders: async (page = 1, per_page = 20) => {
    const response = await client.get('/orders', {
      params: { page, per_page }
    });
    return response.data.data;
  },

  getOrderDetails: async (orderId) => {
    const response = await client.get(`/orders/${orderId}`);
    return response.data.data;
  },

  updateOrderStatus: async (orderId, status) => {
    const response = await client.put(`/orders/${orderId}/status`, { status });
    return response.data.data;
  }
};