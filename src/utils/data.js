import { FaTruck, FaShieldAlt, FaDollarSign, FaUndo, FaUser, FaUserTie, FaUserGraduate } from 'react-icons/fa';

export const icons = {
  truck: FaTruck,
  shield: FaShieldAlt,
  money: FaDollarSign,
  refresh: FaUndo,
  user: FaUser,
  userTie: FaUserTie,
  userGraduate: FaUserGraduate
};

export const categories = [
  { 
    name: 'iPhone', 
    icon: '📱', 
    count: '24 товара',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
    path: '/iphone'
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
];

export const features = [
  {
    icon: 'truck',
    title: 'Быстрая доставка',
    description: 'Доставляем по всей России в течение 1-3 дней',
    color: 'blue'
  },
  {
    icon: 'shield',
    title: 'Официальная гарантия',
    description: 'Гарантия Apple на все iPhone и аксессуары',
    color: 'green'
  },
  {
    icon: 'money',
    title: 'Лучшие цены',
    description: 'Регулярные скидки на iPhone и аксессуары',
    color: 'yellow'
  },
  {
    icon: 'refresh',
    title: 'Возврат 14 дней',
    description: 'Возврат товара в течение 14 дней без вопросов',
    color: 'purple'
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
    name: 'Александр',
    rating: 5,
    text: 'Отличный магазин! Купил iPhone 15 Pro, доставка быстрая, гарантия официальная.',
    avatar: 'userTie'
  },
  {
    id: 2,
    name: 'Мария',
    rating: 5,
    text: 'Очень довольна покупкой. Качество товара на высоте, цены приятные.',
    avatar: 'user'
  },
  {
    id: 3,
    name: 'Дмитрий',
    rating: 4,
    text: 'Хороший сервис, но хотелось бы больше аксессуаров в наличии.',
    avatar: 'userGraduate'
  }
]; 