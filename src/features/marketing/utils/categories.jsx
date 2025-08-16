export const categories = [
    {
        id: 'phones',
        name: 'Телефоны',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format',
        filterParams: { category: 'телефон' }
    },
    {
        id: 'headphones',
        name: 'Наушники',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format',
        filterParams: { category: 'наушники' }
    },
    {
        id: 'laptops',
        name: 'Ноутбуки',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format',
        filterParams: { category: 'ноутбук' }
    },
    {
        id: 'watches',
        name: 'Часы',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&auto=format',
        filterParams: { category: 'часы' }
    }
];

export const createCatalogUrl = (filterParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(filterParams).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  return `/catalog?${searchParams.toString()}`;
};
