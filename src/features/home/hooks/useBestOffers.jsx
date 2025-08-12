import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductApi } from '../../product/api/ProductApi';

export const useBestOffers = () => {
  const [bestOfferIds, setBestOfferIds] = useState(() => {
    try {
      const stored = localStorage.getItem('bestOffers');
      return stored ? JSON.parse(stored) : [51, 52, 53, 54];
    } catch {
      return [51, 52, 53, 54];
    }
  });

  useEffect(() => {
    localStorage.setItem('bestOffers', JSON.stringify(bestOfferIds));
  }, [bestOfferIds]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['bestOffers', bestOfferIds],
    queryFn: async () => {
      const productPromises = bestOfferIds.map(async (id) => {
        try {
          return await ProductApi(id);
        } catch (error) {
          return null;
        }
      });
      return Promise.all(productPromises);
    },
    staleTime: 1000 * 60 * 5
  });

  const handleProductChange = (index, newProductId) => {
    setBestOfferIds(prev => {
      const newIds = [...prev];
      newIds[index] = parseInt(newProductId);
      return newIds;
    });
  };

  return {
    bestOfferIds,
    products,
    isLoading,
    handleProductChange
  };
};