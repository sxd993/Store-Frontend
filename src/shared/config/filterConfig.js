export const FILTER_CONFIG = [
    {
      key: 'category',
      title: 'Категории',
      type: 'dropdown',
      defaultValue: 'Все категории',
      dataKey: 'category'
    },
    {
      key: 'brand', 
      title: 'Бренды',
      type: 'dropdown',
      defaultValue: 'Все бренды',
      dataKey: 'brand'
    },
    {
      key: 'model',
      title: 'Модели', 
      type: 'dropdown',
      defaultValue: 'Все модели',
      dataKey: 'model'
    },
    {
      key: 'color',
      title: 'Цвет',
      type: 'radio',
      defaultValue: 'Все цвета',
      dataKey: 'colors'
    },
    {
      key: 'memory',
      title: 'Память',
      type: 'radio', 
      defaultValue: 'Любая',
      dataKey: 'memory'
    }
  ];
  
  // Функция для получения значений по умолчанию
  export const getDefaultFilterValues = () => {
    return FILTER_CONFIG.reduce((acc, filter) => {
      acc[filter.key] = filter.defaultValue;
      return acc;
    }, {});
  };
  
  // Функция проверки активных фильтров
  export const hasActiveFilters = (values) => {
    return FILTER_CONFIG.some(filter => 
      values[filter.key] !== filter.defaultValue
    );
  };