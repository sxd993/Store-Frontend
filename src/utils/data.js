export const featuredProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: '149999 ₽',
    originalPrice: '169999 ₽',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    discount: '12%',
    isNew: true,
    storage: '256 ГБ',
    rating: 4.9,
    reviews: 127,
    colors: ['Титановый', 'Черный', 'Белый'],
    inStock: true
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: '119999 ₽',
    originalPrice: '139999 ₽',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    discount: '14%',
    isNew: true,
    storage: '128 ГБ',
    rating: 4.8,
    reviews: 89,
    colors: ['Титановый', 'Черный', 'Белый'],
    inStock: true
  },
  {
    id: 3,
    name: 'iPhone 15',
    price: '89999 ₽',
    originalPrice: '99999 ₽',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    discount: '10%',
    isNew: false,
    storage: '128 ГБ',
    rating: 4.7,
    reviews: 156,
    colors: ['Черный', 'Белый', 'Розовый', 'Голубой'],
    inStock: true
  },
  {
    id: 4,
    name: 'iPhone 14 Pro',
    price: '109999 ₽',
    originalPrice: '129999 ₽',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    discount: '15%',
    isNew: false,
    storage: '256 ГБ',
    rating: 4.6,
    reviews: 203,
    colors: ['Темно-фиолетовый', 'Золотой', 'Серебряный'],
    inStock: false
  }
];

export const categories = [
  { 
    name: 'iPhone 15 Pro', 
    icon: '📱', 
    count: '24 товара',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
    path: '/iphone-15-pro'
  },
  { 
    name: 'iPhone 15', 
    icon: '📱', 
    count: '18 товаров',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
    path: '/iphone-15'
  },
  { 
    name: 'iPhone 14 Pro', 
    icon: '📱', 
    count: '16 товаров',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
    path: '/iphone-14-pro'
  },
  { 
    name: 'Чехлы', 
    icon: '📱', 
    count: '89 товаров',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=200&h=200&fit=crop',
    path: '/cases'
  },
  { 
    name: 'Стекла', 
    icon: '🖥️', 
    count: '67 товаров',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=200&h=200&fit=crop',
    path: '/screen-protectors'
  },
  { 
    name: 'Аксессуары', 
    icon: '🔌', 
    count: '45 товаров',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=200&h=200&fit=crop',
    path: '/accessories'
  }
];

export const brands = [
  { name: 'Apple', logo: '🍎', featured: true },
  { name: 'Spigen', logo: '🛡️', featured: true },
  { name: 'OtterBox', logo: '📦', featured: true },
  { name: 'Case-Mate', logo: '💎', featured: false },
  { name: 'UAG', logo: '🛡️', featured: false },
  { name: 'Mous', logo: '🖱️', featured: false },
  { name: 'Caudabe', logo: '📱', featured: false },
  { name: 'Pitaka', logo: '🧲', featured: false }
];

export const features = [
  {
    icon: '🚚',
    title: 'Быстрая доставка',
    description: 'Доставляем по всей России в течение 1-3 дней',
    color: 'blue'
  },
  {
    icon: '🛡️',
    title: 'Официальная гарантия',
    description: 'Гарантия Apple на все iPhone и аксессуары',
    color: 'green'
  },
  {
    icon: '💰',
    title: 'Лучшие цены',
    description: 'Регулярные скидки на iPhone и аксессуары',
    color: 'yellow'
  },
  {
    icon: '🔄',
    title: 'Возврат 14 дней',
    description: 'Возврат товара в течение 14 дней без вопросов',
    color: 'purple'
  }
];

export const accessories = [
  {
    id: 1,
    name: 'Чехол Spigen Ultra Hybrid',
    price: '2999 ₽',
    originalPrice: '3999 ₽',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&h=400&fit=crop',
    discount: '25%',
    isNew: false,
    type: 'Чехол',
    rating: 4.8,
    reviews: 234,
    inStock: true
  },
  {
    id: 2,
    name: 'Стекло 9H защитное',
    price: '1499 ₽',
    originalPrice: '1999 ₽',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&h=400&fit=crop',
    discount: '25%',
    isNew: false,
    type: 'Стекло',
    rating: 4.6,
    reviews: 189,
    inStock: true
  },
  {
    id: 3,
    name: 'Чехол OtterBox Defender',
    price: '5999 ₽',
    originalPrice: '6999 ₽',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&h=400&fit=crop',
    discount: '14%',
    isNew: true,
    type: 'Чехол',
    rating: 4.9,
    reviews: 156,
    inStock: true
  },
  {
    id: 4,
    name: 'Стекло Privacy',
    price: '2499 ₽',
    originalPrice: '2999 ₽',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400&h=400&fit=crop',
    discount: '17%',
    isNew: false,
    type: 'Стекло',
    rating: 4.7,
    reviews: 98,
    inStock: false
  }
];

export const banners = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max',
    subtitle: 'Титановый дизайн. Чип A17 Pro.',
    description: 'Самый мощный iPhone в истории',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=400&fit=crop',
    buttonText: 'Купить сейчас',
    buttonLink: '/iphone-15-pro-max',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 2,
    title: 'Защита премиум',
    subtitle: 'Чехлы и стекла',
    description: 'Защитите свой iPhone стильно',
    image: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&h=400&fit=crop',
    buttonText: 'Смотреть аксессуары',
    buttonLink: '/accessories',
    color: 'from-green-600 to-blue-600'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Александр Петров',
    rating: 5,
    text: 'Отличный магазин! Купил iPhone 15 Pro, доставка быстрая, гарантия официальная.',
    avatar: '👨‍💼'
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    rating: 5,
    text: 'Очень довольна покупкой. Качество товара на высоте, цены приятные.',
    avatar: '👩‍💼'
  },
  {
    id: 3,
    name: 'Дмитрий Козлов',
    rating: 4,
    text: 'Хороший сервис, но хотелось бы больше аксессуаров в наличии.',
    avatar: '👨‍💻'
  }
]; 