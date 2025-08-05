import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductPage = () => {
  const { id } = useParams();

  // База данных товаров (в реальном приложении это будет API запрос)
  const productsData = {
    1: {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      category: 'pro',
      storage: '128GB',
      color: 'Natural Titanium',
      rating: 4.8,
      reviews: 1247,
      description: 'Титан. Очень прочный. Очень лёгкий. Очень айвон. Очень 15. Очень Pro. Очень Max.',
      features: [
        'A17 Pro chip',
        'Titanium design',
        'Pro camera system',
        'Action button',
        'USB-C connector'
      ]
    },
    2: {
      id: 2,
      name: 'iPhone 15',
      price: 799,
      category: 'regular',
      storage: '128GB',
      color: 'Black',
      rating: 4.6,
      reviews: 892,
      description: 'Новый iPhone 15 с революционным дизайном и мощным чипом A16 Bionic.',
      features: [
        'A16 Bionic chip',
        'Dynamic Island',
        'Advanced camera system',
        'USB-C connector',
        'Ceramic Shield'
      ]
    },
    3: {
      id: 3,
      name: 'iPhone 14 Pro',
      price: 899,
      category: 'pro',
      storage: '256GB',
      color: 'Deep Purple',
      rating: 4.7,
      reviews: 1563,
      description: 'iPhone 14 Pro с чипом A16 Bionic и профессиональной камерой.',
      features: [
        'A16 Bionic chip',
        'Pro camera system',
        'Dynamic Island',
        'Always-On display',
        'Emergency SOS'
      ]
    },
    4: {
      id: 4,
      name: 'iPhone 14',
      price: 699,
      category: 'regular',
      storage: '128GB',
      color: 'Blue',
      rating: 4.5,
      reviews: 743,
      description: 'Классический iPhone 14 с отличным соотношением цена-качество.',
      features: [
        'A15 Bionic chip',
        'Advanced camera system',
        'Ceramic Shield',
        '5G capable',
        'MagSafe compatible'
      ]
    },
    5: {
      id: 5,
      name: 'iPhone 13',
      price: 599,
      category: 'regular',
      storage: '128GB',
      color: 'Pink',
      rating: 4.4,
      reviews: 621,
      description: 'Проверенный iPhone 13 с надежным чипом A15 Bionic.',
      features: [
        'A15 Bionic chip',
        'Advanced camera system',
        'Cinematic mode',
        'Ceramic Shield',
        'MagSafe compatible'
      ]
    },
    6: {
      id: 6,
      name: 'iPhone 15 Pro Max',
      price: 1199,
      category: 'pro',
      storage: '256GB',
      color: 'Natural Titanium',
      rating: 4.9,
      reviews: 2341,
      description: 'Максимальная версия iPhone 15 Pro с увеличенным экраном и лучшей камерой.',
      features: [
        'A17 Pro chip',
        'Titanium design',
        'Pro camera system with 5x zoom',
        'Action button',
        'USB-C connector',
        'Largest Pro display'
      ]
    }
  };

  // Получаем данные товара по ID
  const product = productsData[id] || {
    id: id,
    name: 'Товар не найден',
    price: 0,
    category: 'unknown',
    storage: 'N/A',
    color: 'N/A',
    rating: 0,
    reviews: 0,
    description: 'Товар с таким ID не найден.',
    features: []
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-8">
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              ← Назад к каталогу
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            {product.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            {product.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Изображение товара */}
          <div className="aspect-square bg-gray-50 flex items-center justify-center">
            <svg className="h-32 w-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Информация о товаре */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Характеристики</h2>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Память:</span> {product.storage}</p>
                <p className="text-gray-600"><span className="font-medium">Цвет:</span> {product.color}</p>
                <p className="text-gray-600"><span className="font-medium">Категория:</span> {product.category}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Особенности</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-gray-900 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Рейтинг</h2>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-gray-900' : 'text-gray-200'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-3 text-gray-600 font-light">{product.rating} ({product.reviews} отзывов)</span>
              </div>
            </div>

            {/* Цена и кнопки */}
            <div className="space-y-6">
              <div>
                <p className="text-3xl font-light text-gray-900">${product.price}</p>
                <p className="text-sm text-gray-500 font-light">или $99/мес</p>
              </div>
              
              <div className="flex gap-4">
                <button className="flex-1 border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300">
                  Купить
                </button>
                <button className="flex-1 border-2 border-gray-200 bg-gray-50 text-gray-700 px-8 py-4 font-medium hover:bg-gray-100 transition-colors duration-300">
                  Добавить в корзину
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 