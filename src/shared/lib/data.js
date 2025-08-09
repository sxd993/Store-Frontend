import { FaUser, FaUserTie, FaUserGraduate } from 'react-icons/fa';

export const icons = {
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