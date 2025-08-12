import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// API
import { ProductApi } from '../api/ProductApi';

// Компоненты
import { ProductImageGallery } from '../components/ProductImageGallery';
import { ProductLoading } from '../components/ProductLoading';
import { ProductError } from '../components/ProductError';

// Хуки
import { useCart } from '../../cart/hooks/useCart';
import { useAuth } from '../../auth/hooks/useAuth';

// Утилиты
import {
  getProductImages,
  getProductDisplayName,
  getProductSpecs,
  isProductAvailable
} from '../utils/prdouctUtils';

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToCart, isItemInCart, getItemQuantity } = useCart();

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Получаем данные товара через API
  const { data: currentProduct, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi(id),
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Проверяем, есть ли товар в корзине
  const inCart = currentProduct ? isItemInCart(currentProduct.id) : false;
  const cartQuantity = currentProduct ? getItemQuantity(currentProduct.id) : 0;

  // Обработчики действий
  const handleBuy = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: { pathname: `/catalog/${id}` },
          message: 'Для покупки необходимо войти в аккаунт'
        }
      });
      return;
    }
    // TODO: Логика быстрой покупки
    console.log('Покупка товара:', currentProduct);
  };

  const handleAddToCart = async () => {
    if (!currentProduct) return;

    setIsAddingToCart(true);

    try {
      const result = await addToCart(currentProduct, quantity);

      if (result.success) {
        // Показываем успешное уведомление (можно добавить toast)
        console.log('Товар добавлен в корзину');
        setQuantity(1); // Сбрасываем количество
      } else {
        console.error('Ошибка добавления в корзину:', result.error);
        // Показываем ошибку пользователю
        alert(result.error);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при добавлении товара в корзину');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  // Состояния загрузки
  if (isLoading) return <ProductLoading />;
  if (error) return <ProductError error={error} />;

  // Данные продукта
  const productImages = getProductImages(currentProduct);
  const productDisplayName = getProductDisplayName(currentProduct);
  const productSpecs = getProductSpecs(currentProduct);
  const productAvailable = isProductAvailable(currentProduct);

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Хлебные крошки */}
          <div className="mb-8">
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
              ← Назад к каталогу
            </Link>
          </div>

          {/* Основной контент */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Галерея изображений */}
            <div className="flex items-start justify-center">
              <ProductImageGallery
                images={productImages}
                productName={productDisplayName}
              />
            </div>

            {/* Информация о товаре */}
            <div className="space-y-8">
              {/* Заголовок */}
              <div>
                <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
                  {productDisplayName}
                </h1>
                <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                  {currentProduct?.description || 'Описание товара недоступно.'}
                </p>
              </div>

              {/* Характеристики */}
              {productSpecs.length > 0 && (
                <div>
                  <h2 className="text-xl font-light text-gray-900 mb-4">Характеристики</h2>
                  <div className="space-y-3">
                    {productSpecs.map((spec, index) => (
                      <p key={index} className="text-gray-600 font-light">
                        <span className="font-medium">{spec.label}:</span> {spec.value}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Цена */}
              <div>
                <p className="text-3xl font-light text-gray-900">
                  {currentProduct?.price?.toLocaleString() || 0} ₽
                </p>
              </div>

              {/* Количество (если товар доступен) */}
              {productAvailable && !inCart && (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-light">Количество:</span>
                  <div className="flex items-center border border-gray-300">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-light min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors"
                      disabled={quantity >= 10}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Информация о товаре в корзине */}
              {inCart && (
                <div className="bg-green-50 border border-green-200 p-4 rounded">
                  <p className="text-green-800 font-light">
                    ✓ В корзине: {cartQuantity} шт.
                  </p>
                </div>
              )}

              {/* Кнопки действий */}
              <div className="space-y-4">
                {/* Основные кнопки */}
                <div className="flex gap-4">
                  <button
                    onClick={handleBuy}
                    disabled={!productAvailable}
                    className="flex-1 px-8 py-4 border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {productAvailable ? 'Купить сейчас' : 'Нет в наличии'}
                  </button>

                  {productAvailable && (
                    inCart ? (
                      <button
                        onClick={handleGoToCart}
                        className="flex-1 px-8 py-4 border-2 border-green-600 bg-green-600 text-white hover:bg-green-700 font-light transition-colors duration-300"
                      >
                        Перейти в корзину
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className="flex-1 px-8 py-4 border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isAddingToCart ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
                            Добавление...
                          </div>
                        ) : (
                          'Добавить в корзину'
                        )}
                      </button>
                    )
                  )}
                </div>

                {/* Дополнительные гарантии */}
                <div className="text-xs text-gray-500 space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center gap-6">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-light">Гарантия качества</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v0M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m0 0V6a2 2 0 00-2-2H9.414a1 1 0 00-.707.293L7.293 5.707A1 1 0 006.586 6H5a2 2 0 00-2 2v0" />
                      </svg>
                      <span className="font-light">Быстрая доставка</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};