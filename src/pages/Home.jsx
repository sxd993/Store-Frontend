import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Categories from '../features/marketing/components/Categories/Categories.jsx';
import { BestOffers } from '../features/marketing/components/BestOffers/BestOffers.jsx';
import { Reviews } from '../features/marketing/components/Reviews.jsx';
import { GetFilterCategory } from '../features/catalog/api/filters.jsx';
import { CatalogApi } from '../features/catalog/api/catalog.jsx';

export const Home = () => {
  const queryClient = useQueryClient();

  // Предзагрузка данных для каталога
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['filterOptions'],
      queryFn: GetFilterCategory,
      staleTime: 1000 * 60 * 30,
    });

    queryClient.prefetchQuery({
      queryKey: ['catalog', 1, {}],
      queryFn: () => CatalogApi({ page: 1, per_page: 12 }),
      staleTime: 1000 * 60 * 5,
    });
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-4">
        <BestOffers />
        <Categories />
        <Reviews />
      </div>
    </div>
  );
};