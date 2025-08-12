const CART_STORAGE_KEY = 'nnv_cart';

// Структура товара в корзине
// {
//   id: number,
//   name: string,
//   price: number,
//   quantity: number,
//   image?: string,
//   storage?: string,
//   color?: string,
//   addedAt: string (ISO date)
// }

/**
 * Получить корзину из localStorage
 */
export const getCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];
    
    const cart = JSON.parse(stored);
    // Валидация структуры данных
    if (!Array.isArray(cart)) return [];
    
    return cart.filter(item => 
      item && 
      typeof item.id === 'number' && 
      typeof item.quantity === 'number' && 
      item.quantity > 0
    );
  } catch (error) {
    console.warn('Ошибка чтения корзины из localStorage:', error);
    return [];
  }
};

/**
 * Сохранить корзину в localStorage
 */
export const saveCartToStorage = (cart) => {
  try {
    const validCart = Array.isArray(cart) ? cart : [];
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(validCart));
    return true;
  } catch (error) {
    console.warn('Ошибка сохранения корзины в localStorage:', error);
    return false;
  }
};

/**
 * Добавить товар в корзину (localStorage)
 */
export const addItemToStorage = (product, quantity = 1) => {
  const cart = getCartFromStorage();
  const existingIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingIndex !== -1) {
    // Товар уже есть - увеличиваем количество
    cart[existingIndex].quantity += quantity;
  } else {
    // Новый товар
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      storage: product.storage,
      color: product.color,
      addedAt: new Date().toISOString()
    });
  }
  
  saveCartToStorage(cart);
  return cart;
};

/**
 * Обновить количество товара в корзине
 */
export const updateItemInStorage = (productId, quantity) => {
  const cart = getCartFromStorage();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex === -1) return cart;
  
  if (quantity <= 0) {
    // Удаляем товар если количество <= 0
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = quantity;
  }
  
  saveCartToStorage(cart);
  return cart;
};

/**
 * Удалить товар из корзины
 */
export const removeItemFromStorage = (productId) => {
  const cart = getCartFromStorage();
  const filteredCart = cart.filter(item => item.id !== productId);
  
  saveCartToStorage(filteredCart);
  return filteredCart;
};

/**
 * Очистить корзину
 */
export const clearStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn('Ошибка очистки корзины:', error);
    return false;
  }
};

/**
 * Получить количество товаров в корзине
 */
export const getCartItemsCount = () => {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Проверить есть ли товар в корзине
 */
export const isItemInCart = (productId) => {
  const cart = getCartFromStorage();
  return cart.some(item => item.id === productId);
};

/**
 * Получить количество конкретного товара в корзине
 */
export const getItemQuantity = (productId) => {
  const cart = getCartFromStorage();
  const item = cart.find(item => item.id === productId);
  return item ? item.quantity : 0;
};