import { client } from '../../../shared/api/client';

/**
 * Получить корзину пользователя с сервера
 */
export const getCartApi = async () => {
  const response = await client.get('/cart');
  return response.data.data;
};

/**
 * Добавить товар в корзину на сервере
 */
export const addToCartApi = async ({ productId, quantity = 1 }) => {
  const response = await client.post('/cart/add', {
    product_id: productId,
    quantity
  });
  return response.data.data;
};

/**
 * Обновить количество товара в корзине
 */
export const updateCartItemApi = async ({ productId, quantity }) => {
  const response = await client.put('/cart/update', {
    product_id: productId,
    quantity
  });
  return response.data.data;
};

/**
 * Удалить товар из корзины
 */
export const removeFromCartApi = async (productId) => {
  const response = await client.delete(`/cart/remove/${productId}`);
  return response.data.data;
};

/**
 * Очистить всю корзину
 */
export const clearCartApi = async () => {
  const response = await client.delete('/cart/clear');
  return response.data.data;
};

/**
 * Синхронизировать корзину с localStorage при авторизации
 * Отправляет товары из localStorage на сервер
 */
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

/**
 * Получить информацию о товарах в корзине
 * (расширенная информация с ценами, доступностью и тд)
 */
export const getCartItemsInfoApi = async (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return [];
  }

  const productIds = cartItems.map(item => item.id);
  const response = await client.post('/cart/items-info', {
    product_ids: productIds
  });
  
  return response.data.data;
};

/**
 * Оформить заказ (для авторизованных пользователей)
 */
export const checkoutApi = async (orderData) => {
  const response = await client.post('/orders/create', orderData);
  return response.data.data;
};

/**
 * Получить стоимость доставки
 */
export const getShippingCostApi = async (cartItems, address = null) => {
  const response = await client.post('/cart/shipping-cost', {
    items: cartItems,
    address
  });
  return response.data.data;
};