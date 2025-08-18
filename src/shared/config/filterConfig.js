export const FILTER_CONFIG = [
  {
    key: 'category',
    title: 'Категория',
    type: 'radio',
    dataKey: 'category',
    defaultValue: 'all',
    showInMobile: true
  },
  {
    key: 'brand',
    title: 'Бренд',
    type: 'dropdown',
    dataKey: 'brand',
    defaultValue: 'all',
    showInMobile: true
  },
  {
    key: 'model',
    title: 'Модель',
    type: 'dropdown',
    dataKey: 'model',
    defaultValue: 'all',
    showInMobile: false
  },
  {
    key: 'memory',
    title: 'Память',
    type: 'radio',
    dataKey: 'memory',
    defaultValue: 'Любая',
    showInMobile: true
  },
  {
    key: 'color',
    title: 'Цвет',
    type: 'radio',
    dataKey: 'colors',
    defaultValue: 'Любой',
    showInMobile: false
  }
];

export const getDefaultFilterValues = () => {
  return FILTER_CONFIG.reduce((acc, filter) => {
    acc[filter.key] = filter.defaultValue;
    return acc;
  }, {});
};

export const DISPLAY_NAMES = {
  category: {
    'телефон': 'Телефоны',
    'наушники': 'Наушники',
    'ноутбук': 'Ноутбуки',
    'часы': 'Часы'
  }
};

export const getDisplayName = (filterKey, value) => {
  if (DISPLAY_NAMES[filterKey] && DISPLAY_NAMES[filterKey][value]) {
    return DISPLAY_NAMES[filterKey][value];
  }
  return value;
};