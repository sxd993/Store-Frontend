export const FILTER_CONFIG = [
  {
    key: 'category',
    title: 'Категории',
    type: 'radio',
    dataKey: 'category',
    defaultValue: 'Все категории'
  },
  {
    key: 'brand',
    title: 'Бренды',
    type: 'dropdown',
    dataKey: 'brand',
    defaultValue: 'Все бренды'
  },
  {
    key: 'model',
    title: 'Модели',
    type: 'dropdown',
    dataKey: 'model',
    defaultValue: 'all'
  },
  {
    key: 'color',
    title: 'Цвет',
    type: 'dropdown',
    dataKey: 'colors',
    defaultValue: 'Любой'
  },
  {
    key: 'memory',
    title: 'Память',
    type: 'dropdown',
    dataKey: 'memory',
    defaultValue: 'Любая'
  }
];

export const getDefaultFilterValues = () => {
  return FILTER_CONFIG.reduce((acc, filter) => {
    acc[filter.key] = filter.defaultValue;
    return acc;
  }, {});
};

export const hasActiveFilters = (filterValues) => {
  return FILTER_CONFIG.some(filter => {
    const value = filterValues[filter.key];
    return value && 
           value !== filter.defaultValue && 
           value !== 'all' &&
           value !== 'Все категории' &&
           value !== 'Все бренды' &&
           value !== 'Любой' &&
           value !== 'Любая';
  });
};