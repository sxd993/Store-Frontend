export const categories = [
    {
        id: 'phones',
        name: 'Телефоны',
        description: 'iPhone, Samsung, Google',
        count: '24 товара',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&auto=format',
        filterParams: { category: 'телефон' }
    },
    {
        id: 'headphones',
        name: 'Наушники',
        description: 'AirPods, Sony, Bose',
        count: '18 товаров',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&auto=format',
        filterParams: { category: 'наушники' }
    },
    {
        id: 'laptops',
        name: 'Ноутбуки',
        description: 'MacBook, Dell, Lenovo',
        count: '32 товара',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&auto=format',
        filterParams: { category: 'ноутбук' }
    },
    {
        id: 'watches',
        name: 'Часы',
        description: 'Apple Watch, Samsung',
        count: '12 товаров',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&auto=format',
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
