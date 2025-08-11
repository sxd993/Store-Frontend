import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

// API
import { ProductApi } from '../api/ProductApi';

// Компоненты
import { ProductImageGallery } from '../components/ProductImageGallery';
import { ProductLoading } from '../components/ProductLoading';
import { ProductError } from '../components/ProductError';

// Утилиты
import { 
  getProductImages, 
  getProductDisplayName, 
  getProductSpecs,
  isProductAvailable 
} from '../utils/prdouctUtils';

export const ProductPage = () => {
  const { id } = useParams();

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

  // Обработчики действий
  const handleBuy = () => {
    console.log('Покупка товара:', currentProduct);
    // TODO: Логика покупки
  };

  const handleAddToCart = () => {
    console.log('Добавление в корзину:', currentProduct);
    // TODO: Логика добавления в корзину
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

              {/* Цена и кнопки */}
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-light text-gray-900">
                    {currentProduct?.price || 0} ₽
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handleBuy}
                    disabled={!productAvailable}
                    className="flex-1 px-8 py-4 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {productAvailable ? 'Купить' : 'Нет в наличии'}
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    disabled={!productAvailable}
                    className="flex-1 px-8 py-4 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Добавить в корзину
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};