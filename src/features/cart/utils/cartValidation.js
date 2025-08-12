/**
 * Валидация товара для добавления в корзину
 */
export const validateCartItem = (item) => {
    const errors = [];
  
    if (!item) {
      errors.push('Товар не определен');
      return { isValid: false, errors };
    }
  
    if (!item.id || typeof item.id !== 'number') {
      errors.push('Некорректный ID товара');
    }
  
    if (!item.name || typeof item.name !== 'string') {
      errors.push('Название товара обязательно');
    }
  
    if (item.price === undefined || item.price === null || isNaN(Number(item.price))) {
      errors.push('Некорректная цена товара');
    }
  
    if (Number(item.price) < 0) {
      errors.push('Цена не может быть отрицательной');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  /**
   * Валидация количества товара
   */
  export const validateQuantity = (quantity, maxQuantity = 99) => {
    const errors = [];
    const qty = Number(quantity);
  
    if (isNaN(qty)) {
      errors.push('Количество должно быть числом');
      return { isValid: false, errors };
    }
  
    if (!Number.isInteger(qty)) {
      errors.push('Количество должно быть целым числом');
    }
  
    if (qty < 1) {
      errors.push('Количество должно быть больше 0');
    }
  
    if (qty > maxQuantity) {
      errors.push(`Максимальное количество: ${maxQuantity}`);
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      validQuantity: Math.max(1, Math.min(qty, maxQuantity))
    };
  };
  
  /**
   * Валидация всей корзины
   */
  export const validateCart = (cartItems) => {
    const errors = [];
  
    if (!Array.isArray(cartItems)) {
      errors.push('Корзина должна быть массивом');
      return { isValid: false, errors };
    }
  
    if (cartItems.length === 0) {
      errors.push('Корзина пуста');
      return { isValid: false, errors };
    }
  
    // Проверяем каждый товар
    cartItems.forEach((item, index) => {
      const itemValidation = validateCartItem(item);
      if (!itemValidation.isValid) {
        errors.push(`Товар ${index + 1}: ${itemValidation.errors.join(', ')}`);
      }
  
      const quantityValidation = validateQuantity(item.quantity);
      if (!quantityValidation.isValid) {
        errors.push(`Товар ${index + 1}: ${quantityValidation.errors.join(', ')}`);
      }
    });
  
    // Проверка на дубликаты
    const ids = cartItems.map(item => item.id);
    const uniqueIds = new Set(ids);
    if (ids.length !== uniqueIds.size) {
      errors.push('В корзине есть дублированные товары');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };
  
  /**
   * Валидация данных для оформления заказа
   */
  export const validateCheckoutData = (data) => {
    const errors = [];
  
    // Проверяем корзину
    const cartValidation = validateCart(data.cartItems);
    if (!cartValidation.isValid) {
      errors.push(...cartValidation.errors);
    }
  
    // Проверяем контактные данные (если переданы)
    if (data.contactInfo) {
      const { name, phone, email } = data.contactInfo;
  
      if (!name || name.trim().length < 2) {
        errors.push('Имя должно содержать минимум 2 символа');
      }
  
      if (!phone || !/^\+7\d{10}$/.test(phone.replace(/\s/g, ''))) {
        errors.push('Некорректный формат телефона');
      }
  
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Некорректный формат email');
      }
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  };