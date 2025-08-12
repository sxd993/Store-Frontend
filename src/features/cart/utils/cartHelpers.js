import { formatPrice } from '../../../shared/utils/formatPrice';

/**
 * Найти товар в корзине по ID
 */
export const findCartItem = (cartItems, productId) => {
  if (!Array.isArray(cartItems)) return null;
  return cartItems.find(item => item.id === Number(productId)) || null;
};

/**
 * Проверить есть ли товар в корзине
 */
export const isItemInCart = (cartItems, productId) => {
  return findCartItem(cartItems, productId) !== null;
};

/**
 * Получить количество товара в корзине
 */
export const getItemQuantityInCart = (cartItems, productId) => {
  const item = findCartItem(cartItems, productId);
  return item ? item.quantity : 0;
};

/**
 * Отформатировать товар для отображения в корзине
 */
export const formatCartItem = (item) => {
  if (!item) return null;

  return {
    ...item,
    formattedPrice: formatPrice(item.price),
    formattedTotal: formatPrice(item.price * item.quantity),
    displayName: item.name,
    displaySpecs: [item.storage, item.color].filter(Boolean).join(' • ')
  };
};

/**
 * Отформатировать все товары корзины
 */
export const formatCartItems = (cartItems) => {
  if (!Array.isArray(cartItems)) return [];
  return cartItems.map(formatCartItem).filter(Boolean);
};

/**
 * Объединить товары из localStorage с серверными данными
 */
export const mergeCartData = (localCart, serverCart) => {
  if (!Array.isArray(localCart)) localCart = [];
  if (!Array.isArray(serverCart)) serverCart = [];

  const merged = new Map();

  // Добавляем товары с сервера
  serverCart.forEach(item => {
    merged.set(item.id, { ...item, source: 'server' });
  });

  // Добавляем/обновляем товары из localStorage
  localCart.forEach(localItem => {
    const existingItem = merged.get(localItem.id);
    if (existingItem) {
      // Суммируем количество
      merged.set(localItem.id, {
        ...existingItem,
        quantity: existingItem.quantity + localItem.quantity,
        source: 'merged'
      });
    } else {
      merged.set(localItem.id, { ...localItem, source: 'local' });
    }
  });

  return Array.from(merged.values());
};

/**
 * Очистить товары корзины от недоступных позиций
 */
export const filterAvailableItems = (cartItems, availableProducts) => {
  if (!Array.isArray(cartItems) || !Array.isArray(availableProducts)) {
    return cartItems;
  }

  const availableIds = new Set(availableProducts.map(p => p.id));
  
  return cartItems.filter(item => availableIds.has(item.id));
};

/**
 * Обновить цены товаров в корзине актуальными данными
 */
export const updateCartPrices = (cartItems, currentProducts) => {
  if (!Array.isArray(cartItems) || !Array.isArray(currentProducts)) {
    return cartItems;
  }

  const priceMap = new Map(currentProducts.map(p => [p.id, p.price]));

  return cartItems.map(item => {
    const currentPrice = priceMap.get(item.id);
    return currentPrice !== undefined 
      ? { ...item, price: currentPrice }
      : item;
  });
};

/**
 * Получить уникальные ID товаров из корзины
 */
export const getUniqueProductIds = (cartItems) => {
  if (!Array.isArray(cartItems)) return [];
  return [...new Set(cartItems.map(item => item.id))];
};

/**
 * Проверить изменилась ли корзина
 */
export const hasCartChanged = (oldCart, newCart) => {
  if (!Array.isArray(oldCart) || !Array.isArray(newCart)) return true;
  if (oldCart.length !== newCart.length) return true;

  const oldSorted = [...oldCart].sort((a, b) => a.id - b.id);
  const newSorted = [...newCart].sort((a, b) => a.id - b.id);

  return oldSorted.some((item, index) => {
    const newItem = newSorted[index];
    return item.id !== newItem.id || item.quantity !== newItem.quantity;
  });
};

/**
 * Создать краткое описание корзины для уведомлений
 */
export const getCartSummaryText = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 'Корзина пуста';
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return `${totalItems} товар(ов) на сумму ${formatPrice(totalPrice)}`;
};