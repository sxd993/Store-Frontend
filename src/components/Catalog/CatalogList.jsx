import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { CatalogApi } from '../../api/Catalog/CatalogApi';
import { formatPrice } from '../../utils/formatPrice'

export const CatalogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog', currentPage],
    queryFn: () => CatalogApi({ page: currentPage, per_page: perPage }),
    staleTime: 1000 * 60 * 5
  });

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 font-light">Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-600 font-light mb-4">Ошибка загрузки товаров</p>
        <p className="text-sm text-gray-500 font-light">{error.message}</p>
      </div>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-light text-gray-900">Товары не найдены</h3>
        <p className="mt-2 text-gray-500 font-light">Попробуйте изменить параметры поиска</p>
      </div>
    );
  }

  return (
    <>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {data.items.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="group block">
            <div className="bg-white border-2 border-gray-200 hover:border-gray-300 p-6 md:p-8 text-center transition-colors duration-300 h-full">
              <div className="mb-6 md:mb-8 flex items-center justify-center">
                <img className='max-w-[250px] max-h-[250px]' src={product.image}></img>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <h3 className="font-light text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                  {product?.name} {product?.color} {product?.memory}GB
                </h3>
                <div className="space-y-2">
                  <p className="text-sm md:text-base text-gray-500 font-light">
                    В наличии: {product.stock_quantity} шт.
                  </p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <p className="text-2xl md:text-3xl font-light text-gray-900">{formatPrice(product.price)}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Добавить в корзину:', product.name, 'ID:', product.id);
                    }}
                    className="flex-1 border-2 border-gray-900 bg-white text-gray-900 px-6 py-3 font-light hover:bg-gray-900 hover:text-white transition-colors duration-300"
                  >
                    В корзину
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="flex-1 border-2 border-gray-200 bg-gray-50 text-gray-700 px-6 py-3 font-light hover:bg-gray-100 transition-colors duration-300"
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {data.pagination && data.pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 font-light hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            ←
          </button>

          {[...Array(Math.min(5, data.pagination.pages))].map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border-2 font-light transition-colors duration-300 ${currentPage === page
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, data.pagination.pages))}
            disabled={currentPage === data.pagination.pages}
            className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 font-light hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            →
          </button>
        </div>
      )}
    </>
  );
};