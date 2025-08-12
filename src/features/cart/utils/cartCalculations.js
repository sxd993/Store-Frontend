/**
 * Рассчитать общую стоимость товаров в корзине
 */
export const calculateSubtotal = (cartItems) => {
    if (!Array.isArray(cartItems)) return 0;
    
    return cartItems.reduce((total, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return total + (price * quantity);
    }, 0);
  };
  
  /**
   * Рассчитать общее количество товаров
   */
  export const calculateTotalItems = (cartItems) => {
    if (!Array.isArray(cartItems)) return 0;
    
    return cartItems.reduce((total, item) => {
      const quantity = Number(item.quantity) || 0;
      return total + quantity;
    }, 0);
  };
  
  /**
   * Рассчитать стоимость доставки
   */
  export const calculateShipping = (subtotal, shippingRules = {}) => {
    const {
      freeShippingThreshold = 3000, // Бесплатная доставка от 3000 руб
      standardShippingCost = 300    // Стандартная доставка 300 руб
    } = shippingRules;
  
    if (subtotal >= freeShippingThreshold) {
      return 0;
    }
  
    return standardShippingCost;
  };
  
  /**
   * Рассчитать скидку (если есть)
   */
  export const calculateDiscount = (subtotal, discountRules = {}) => {
    const {
      threshold = 5000,  // Скидка от 5000 руб
      percentage = 5     // 5% скидка
    } = discountRules;
  
    if (subtotal >= threshold) {
      return (subtotal * percentage) / 100;
    }
  
    return 0;
  };
  
  /**
   * Рассчитать итоговую сумму заказа
   */
  export const calculateTotal = (cartItems, shippingRules = {}, discountRules = {}) => {
    const subtotal = calculateSubtotal(cartItems);
    const shipping = calculateShipping(subtotal, shippingRules);
    const discount = calculateDiscount(subtotal, discountRules);
    
    return Math.max(0, subtotal + shipping - discount);
  };
  
  /**
   * Получить детальный расчет корзины
   */
  export const getCartCalculations = (cartItems, shippingRules = {}, discountRules = {}) => {
    const subtotal = calculateSubtotal(cartItems);
    const totalItems = calculateTotalItems(cartItems);
    const shipping = calculateShipping(subtotal, shippingRules);
    const discount = calculateDiscount(subtotal, discountRules);
    const total = subtotal + shipping - discount;
  
    return {
      subtotal,
      totalItems,
      shipping,
      discount,
      total: Math.max(0, total),
      hasDiscount: discount > 0,
      hasFreeShipping: shipping === 0 && subtotal > 0
    };
  };