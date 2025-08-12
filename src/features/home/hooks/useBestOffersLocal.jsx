import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '../../auth/hooks/useAuth';

const STORAGE_KEY = 'bestOffers';
const DEFAULT_BEST_OFFERS = [51, 52, 53, 54];

export const useBestOffersLocal = () => {
  const { isAdmin } = useAuth();
  const [bestOfferIds, setBestOfferIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_BEST_OFFERS;
    } catch {
      return DEFAULT_BEST_OFFERS;
    }
  });

  // Синхронизация с localStorage при изменении
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bestOfferIds));
    } catch (error) {
      console.warn('Не удалось сохранить лучшие предложения:', error);
    }
  }, [bestOfferIds]);

  // Замена товара в конкретной позиции
  const updateProductAtIndex = useCallback((index, newProductId) => {
    if (!isAdmin) {
      throw new Error('Недостаточно прав');
    }

    const id = parseInt(newProductId);
    if (isNaN(id)) {
      throw new Error('Некорректный ID товара');
    }

    setBestOfferIds(prev => {
      const newIds = [...prev];
      newIds[index] = id;
      return newIds;
    });
  }, [isAdmin]);

  // Сброс к дефолтным значениям
  const resetToDefault = useCallback(() => {
    if (!isAdmin) {
      throw new Error('Недостаточно прав');
    }
    setBestOfferIds(DEFAULT_BEST_OFFERS);
  }, [isAdmin]);

  return {
    bestOfferIds,
    updateProductAtIndex,
    resetToDefault,
    canManage: isAdmin
  };
};