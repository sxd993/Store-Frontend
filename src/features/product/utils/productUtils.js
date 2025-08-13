// Получение изображений из продукта
export const getProductImages = (product) => {
  if (!product) return [];
  
  // Если есть массив изображений из новой таблицы
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images.map(img => img.image_url || img.url || img);
  }
  
  // Если есть старое поле image
  if (product.image) {
    return [product.image];
  }
  
  return [];
};

// Получение отображаемого имени продукта
export const getProductDisplayName = (product) => {
  if (!product) return '';
  return `${product.brand || ''} ${product.model || ''}`.trim();
};

// Проверка доступности продукта
export const isProductAvailable = (product) => {
  return product && product.stock_quantity > 0;
};

// Форматирование характеристик продукта
export const getProductSpecs = (product) => {
  if (!product) return [];
  
  const specs = [];
  
  if (product.memory) {
    specs.push({ label: 'Память', value: `${product.memory} GB` });
  }
  
  if (product.color) {
    specs.push({ label: 'Цвет', value: product.color });
  }
  
  if (product.stock_quantity) {
    specs.push({ label: 'В наличии', value: `${product.stock_quantity} шт.` });
  }
  
  return specs;
};