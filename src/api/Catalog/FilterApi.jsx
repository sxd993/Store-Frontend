export const GetFilterCategory = async () => {
  // Имитация задержки API для тестирования
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    category: ["Телефон", "Стекло"],
    brand: ["Apple", "Samsung"],
    model: [
      "iPhone 15", "iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 15 Plus",
      "iPhone 16", "iPhone 16 Pro", "iPhone 16 Pro Max", "iPhone 16 Plus", "iPhone 16e"
    ],
    colors: ["Белый", "Черный", "Синий", "Зеленый"],
    memory: ["128GB", "256GB", "512GB", "1TB"],
  };
};