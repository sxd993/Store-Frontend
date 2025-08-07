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
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center mb-8">
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              ← Назад к каталогу
            </Link>
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600 font-light">Загрузка товара...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center mb-8">
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              ← Назад к каталогу
            </Link>
          </div>
          <div className="text-center py-16">
            <p className="text-lg text-gray-600 font-light mb-4">Ошибка загрузки товара</p>
            <p className="text-sm text-gray-500 font-light">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex">
          <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
            ← Назад к каталогу
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Изображение товара */}
          <img src={currentProduct.image} alt="Изображение телефона" />
          {/* Информация о товаре */}
          <div className="space-y-8">
            {/* Заголовок */}
            <section className="w-full bg-white border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 py-4">

                <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
                  {currentProduct?.brand} {currentProduct?.model}
                </h1>
                <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
                  {currentProduct?.description || 'Описание товара недоступно.'}
                </p>
              </div>
            </section>
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-4">Характеристики</h2>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Память:</span> {currentProduct?.memory} GB</p>
                <p className="text-gray-600"><span className="font-medium">Цвет:</span> {currentProduct?.color}</p>
                {currentProduct?.stock_quantity && (
                  <p className="text-gray-600"><span className="font-medium">В наличии:</span> {currentProduct.stock_quantity} шт.</p>
                )}
              </div>
            </div>


            {/* Цена и кнопки */}
            <div className="space-y-6">
              <div>
                <p className="text-3xl font-light text-gray-900">{currentProduct?.price || 0} ₽</p>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 font-light hover:bg-gray-900 hover:text-white transition-colors duration-300">
                  Купить
                </button>
                <button className="flex-1 border-2 border-gray-200 bg-gray-50 text-gray-700 px-8 py-4 font-light hover:bg-gray-100 transition-colors duration-300">
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