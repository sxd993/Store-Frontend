import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Categories from '../components/Categories.jsx';
import { BestOffers } from '../components/BestOffers.jsx';
import { Testimonials } from '../components/Testimonials.jsx';
import { GetFilterCategory } from '../../catalog/api/filters.jsx';
import { CatalogApi } from '../../catalog/api/catalog.jsx';

export const Home = () => {
  const queryClient = useQueryClient();

  // Предзагрузка данных для каталога
  useEffect(() => {
    // Предзагружаем данные фильтров
    queryClient.prefetchQuery({
      queryKey: ['filterOptions'],
      queryFn: GetFilterCategory,
      staleTime: 1000 * 60 * 30, // 30 минут
    });

    // Предзагружаем первую страницу каталога
    queryClient.prefetchQuery({
      queryKey: ['catalog', 1, {}],
      queryFn: () => CatalogApi({ page: 1, per_page: 12 }),
      staleTime: 1000 * 60 * 5, // 5 минут
    });
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <BestOffers />
        <Categories />
        <Testimonials />
      </div>
    </div>
  );
};