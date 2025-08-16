// src/features/catalog/api/filters.jsx
import { client } from '../../../shared/api/client';

export const GetFilterCategory = async (appliedFilters = {}) => {
  console.log('GetFilterCategory вызван с фильтрами:', appliedFilters);
  
  // Передаем текущие примененные фильтры для получения динамических опций
  const params = {};
  
  Object.entries(appliedFilters).forEach(([key, value]) => {
    if (value && 
        value !== 'all' && 
        value !== 'Все категории' && 
        value !== 'Все бренды' &&
        value !== 'Любой' &&
        value !== 'Любая') {
      params[key] = value;
    }
  });

  console.log('Отправляем параметры на сервер:', params);

  const response = await client.get('/catalog/filters', { params });
  
  console.log('Получен ответ от сервера:', response.data.data);
  
  // Преобразуем формат данных для совместимости с UI компонентами
  const data = response.data.data;
  
  return {
    category: data.category || [],
    brand: data.brand || [],
    model: data.model || [],
    colors: data.colors || [],
    memory: data.memory || []
  };
};