import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CatalogApi } from '../../api/Catalog/CatalogApi';

export const CatalogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  // Запрос товаров
  const { data, isLoading, error } = useQuery({
    queryKey: ['catalog', currentPage],
    queryFn: () => CatalogApi({ page: currentPage, per_page: perPage }),
    staleTime: 1000 * 60 * 5 // 5 минут
  });

  return (
    <div>
      {isLoading && <p>Загрузка...</p>}
      {error && <p>Ошибка загрузки товаров: {error.message}</p>}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {data.items.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p>Цена: {product.price} руб.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};