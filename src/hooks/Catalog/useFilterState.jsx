import { useState } from 'react';

export const useFilterState = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [selectedBrand, setSelectedBrand] = useState('Все бренды');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedStorage, setSelectedStorage] = useState('all');

  const values = {
    selectedCategory,
    selectedBrand,
    selectedModel,
    selectedColor,
    selectedStorage
  };

  const setters = {
    setSelectedCategory,
    setSelectedBrand,
    setSelectedModel,
    setSelectedColor,
    setSelectedStorage
  };

  const resetAll = () => {
    setSelectedCategory('Все категории');
    setSelectedBrand('Все бренды');
    setSelectedModel('all');
    setSelectedColor('all');
    setSelectedStorage('all');
  };

  return {
    values,
    setters,
    resetAll
  };
};