import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../../shared/api/catalog';

export const useBestOffers = (ids) => {
    return useQuery({
      queryKey: ['bestOffers', ids],
      queryFn: async () => {
        if (!ids || ids.length === 0) return [];
        
        // Используем ProductApi функцию для каждого ID лучших предложений
        const productPromises = ids.map(id => 
          ProductApi(id).catch(() => null) // Возвращаем null для неуспешных запросов
        );
        
        const results = await Promise.all(productPromises);
        return results.filter(Boolean); // Фильтруем null значения
      },
      enabled: !!ids && ids.length > 0,
      staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
      cacheTime: 10 * 60 * 1000, // 10 минут в кэше
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
    });
  };
