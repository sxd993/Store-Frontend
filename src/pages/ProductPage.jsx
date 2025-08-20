import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// API
import { ProductApi } from '../features/catalog/api/ProductApi';

// Компоненты
import { ProductImageGallery } from '../features/catalog/ui/Product/ProductImageGallery';
import { ProductLoading } from '../features/catalog/ui/Product/states/ProductLoading';
import { ProductError } from '../features/catalog/ui/Product/states/ProductError';

// Хуки
import { useCart } from '../features/cart/hooks/useCart';
import { useAuth } from '../features/auth/hooks/useAuth';

// Утилиты
import {
  getProductImages,
  getProductDisplayName,
  getProductSpecs,
  isProductAvailable
} from '../features/catalog/utils/productUtils';

export const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    addItem,
    isInCart,
    getQuantity,
    isAdding
  } = useCart();

  const [quantity, setQuantity] = useState(1);

  // Получаем данные товара
  const { data: currentProduct, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => ProductApi(id),
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Кол-во в корзине и проверка наличия
  const inCart = currentProduct ? isInCart(currentProduct.id) : false;
  const cartQuantity = currentProduct ? getQuantity(currentProduct.id) : 0;
  const productAvailable = currentProduct && isProductAvailable(currentProduct);

  // Быстрая покупка
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
    console.log('Покупка товара:', currentProduct);
  };

  // Добавление в корзину
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: { pathname: `/catalog/${id}` },
          message: 'Для покупки необходимо войти в аккаунт'
        }
      });
      return;
    }

    if (!currentProduct) return;

    addItem(
      { productId: currentProduct.id, quantity },
      {
        onSuccess: () => {
          console.log('Товар добавлен в корзину');
          setQuantity(1);
        },
        onError: (err) => {
          console.error('Ошибка добавления в корзину:', err);
        }
      }
    );
  };

  // Переход в корзину
  const handleGoToCart = () => {
    navigate('/cart');
  };

  // Состояния загрузки
  if (isLoading) return <ProductLoading />;
  if (error) return <ProductError error={error} />;

  // Данные для отображения
  const productImages = getProductImages(currentProduct);
  const productDisplayName = getProductDisplayName(currentProduct);
  const productSpecs = getProductSpecs(currentProduct);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Галерея */}
            <div className="flex items-start justify-center">
              <ProductImageGallery
                images={productImages}
                productName={productDisplayName}
              />
            </div>

            {/* Инфо */}
            <div className="space-y-6">
              {/* Название */}
              <div>
                <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
                  {productDisplayName}
                </h1>
              </div>

              {/* Цена */}
              <div className="border-b border-gray-100 pb-4">
                <p className="text-4xl font-light text-gray-900">
                  {currentProduct?.price?.toLocaleString() || 0} ₽
                </p>
              </div>

              {/* Характеристики */}
              {productSpecs.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-light text-gray-900">Характеристики</h2>
                  <div className="space-y-2">
                    {productSpecs.map((spec, index) => (
                      <div key={index} className="flex justify-between py-1.5 border-b border-gray-50">
                        <span className="text-gray-600 font-light">{spec.label}</span>
                        <span className="text-gray-900 font-light">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Описание */}
              {currentProduct?.description && (
                <div className="space-y-3">
                  <h2 className="text-lg font-light text-gray-900">Описание</h2>
                  <div className="space-y-2">
                    <div className="py-1.5 border-b border-gray-50">
                      <p className="text-gray-600 font-light leading-relaxed">
                        {currentProduct.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Количество и кнопки */}
              <div className="pt-4">
                {productAvailable && (
                  inCart ? (
                    <button
                      onClick={handleGoToCart}
                      className="w-full px-4 py-3 border border-blue-400 text-blue-600 rounded-2xl hover:bg-blue-50 transition-colors duration-300 font-light"
                    >
                      Перейти в корзину
                    </button>
                  ) : (
                    <div className="flex flex-row gap-10">
                      <div className="flex items-center border border-gray-200 rounded-2xl">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-6 py-2 font-light min-w-[60px] text-center border-x border-gray-200">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(10, quantity + 1))}
                          className="px-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-300"
                          disabled={quantity >= 10}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="flex-1 px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 rounded-2xl font-light disabled:opacity-50"
                      >
                        {isAdding ? 'Добавление...' : 'Добавить в корзину'}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
