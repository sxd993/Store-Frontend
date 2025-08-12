const STORAGE_KEY = 'nnv_cart';

export const getLocalCart = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const cart = JSON.parse(stored);
    return Array.isArray(cart) ? cart.filter(item => 
      item && typeof item.id === 'number' && typeof item.quantity === 'number' && item.quantity > 0
    ) : [];
  } catch (error) {
    console.warn('Ошибка чтения localStorage:', error);
    return [];
  }
};

export const saveLocalCart = (cart) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn('Ошибка сохранения в localStorage:', error);
  }
};

export const addToLocalCart = (product, quantity) => {
  const cart = getLocalCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
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
  
  saveLocalCart(cart);
  return cart;
};

export const updateLocalCart = (productId, quantity) => {
  const cart = getLocalCart();
  const itemIndex = cart.findIndex(item => item.id === productId);
  
  if (itemIndex === -1) return cart;
  
  if (quantity <= 0) {
    cart.splice(itemIndex, 1);
  } else {
    cart[itemIndex].quantity = quantity;
  }
  
  saveLocalCart(cart);
  return cart;
};

export const clearLocalCart = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Ошибка очистки localStorage:', error);
  }
};