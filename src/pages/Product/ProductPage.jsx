import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../api/Catalog/CatalogApi';
import { useEffect } from 'react';

const ProductPage = () => {
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

  if (isLoading) {
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
                ← Назад к каталогу
              </Link>
            </div>
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-8"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
                ← Назад к каталогу
              </Link>
            </div>
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-6">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
              Ошибка загрузки
            </h1>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {error.message}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Основной контент */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Изображение товара */}
            <div className="flex items-center justify-center">
              <img 
                src={currentProduct.image} 
                alt={`${currentProduct?.brand} ${currentProduct?.model}`}
                className="w-full h-auto max-h-110 object-contain"
              />
            </div>

            {/* Информация о товаре */}
            <div className="space-y-8">
              {/* Заголовок */}
              <div>
                <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
                  {currentProduct?.brand} {currentProduct?.model}
                </h1>
                <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
                  {currentProduct?.description || 'Описание товара недоступно.'}
                </p>
              </div>

              {/* Характеристики */}
              <div>
                <h2 className="text-xl font-light text-gray-900 mb-4">Характеристики</h2>
                <div className="space-y-3">
                  <p className="text-gray-600 font-light">
                    <span className="font-medium">Память:</span> {currentProduct?.memory} GB
                  </p>
                  <p className="text-gray-600 font-light">
                    <span className="font-medium">Цвет:</span> {currentProduct?.color}
                  </p>
                  {currentProduct?.stock_quantity && (
                    <p className="text-gray-600 font-light">
                      <span className="font-medium">В наличии:</span> {currentProduct.stock_quantity} шт.
                    </p>
                  )}
                </div>
              </div>

              {/* Цена и кнопки */}
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-light text-gray-900">
                    {currentProduct?.price || 0} ₽
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-8 py-4 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300">
                    Купить
                  </button>
                  <button className="flex-1 px-8 py-4 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300">
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

export default ProductPage; 