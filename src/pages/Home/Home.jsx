import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Hero from '../../components/Home/Hero';
import Categories from '../../components/Home/Categories';
import { PopularOffers } from '../../components/Home/PopularOffers';
import Testimonials from '../../components/Home/Testimonials';
import { GetFilterCategory } from '../../api/Catalog/FilterApi';
import { CatalogApi } from '../../api/Catalog/CatalogApi';

const popularIds = [51, 52, 53];

const Home = () => {
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
        <Hero />
        <PopularOffers ids={popularIds} />
        <Categories />
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;