import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { RadioFilter } from '../../../ui/Filter/RadioFilter'
import { DropDownFilter } from '../../../ui/Filter/DropDownFilter'
import { GetFilterCategory } from '../../../api/Catalog/FilterApi'
import { MobileFilter } from './MobileFilter';

export const Filter = () => {
    const [selectedCategory, setSelectedCategory] = useState('Все категории');
    const [selectedBrand, setSelectedBrand] = useState('Все бренды');
    const [selectedModel, setSelectedModel] = useState('all');
    const [selectedColor, setSelectedColor] = useState('all');
    const [selectedStorage, setSelectedStorage] = useState('all');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const { data, error, isLoading } = useQuery({
        queryKey: ['filterOptions'],
        queryFn: GetFilterCategory,
        staleTime: 1000 * 60 * 60,
    });

    const resetFilters = () => {
        setSelectedCategory('Все категории');
        setSelectedBrand('Все бренды');
        setSelectedModel('all');
        setSelectedColor('all');
        setSelectedStorage('all');
    };

    const applyFilters = () => {
        console.log('Применить фильтры');
        setIsMobileFilterOpen(false);
    };

    // Проверяем, есть ли активные фильтры
    const hasActiveFilters = selectedModel !== 'all' || selectedColor !== 'all' || selectedStorage !== 'all';

    if (isLoading) {
        return (
            <div className="w-full">
                <div className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="w-full text-center">
                <p className="text-gray-600 font-light">Ошибка загрузки фильтров: {error.message}</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Десктопная версия */}
            <div className="hidden lg:block">
                <div className="bg-white border border-gray-200 p-6">
                    <div className="flex flex-row gap-6 items-start">
                        {/* Фильтр по Категории */}
                        <div className="flex-1">
                            <DropDownFilter
                                title="Категории"
                                options={data.category}
                                selectedValue={selectedCategory}
                                onChange={setSelectedCategory}
                            />
                        </div>
                        
                        {/* Фильтр по Бренду */}
                        <div className="flex-1">
                            <DropDownFilter
                                title="Бренды"
                                options={data.brand}
                                selectedValue={selectedBrand}
                                onChange={setSelectedBrand}
                            />
                        </div>
                        
                        {/* Фильтр по Модели */}
                        <div className="flex-1">
                            <DropDownFilter
                                title="Модели"
                                options={data.model}
                                selectedValue={selectedModel}
                                onChange={setSelectedModel}
                            />
                        </div>

                        {/* Фильтр по Цвету */}
                        <div className="flex-1">
                            <RadioFilter
                                title="Цвет"
                                options={data.colors}
                                selectedValue={selectedColor}
                                onChange={setSelectedColor}
                            />
                        </div>

                        {/* Фильтр по Памяти */}
                        <div className="flex-1">
                            <RadioFilter
                                title="Память"
                                options={data.memory}
                                selectedValue={selectedStorage}
                                onChange={setSelectedStorage}
                            />
                        </div>
                    </div>

                    {/* Кнопки по центру */}
                    <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            onClick={applyFilters}
                            className="px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
                        >
                            Применить
                        </button>
                        <button
                            onClick={resetFilters}
                            className="px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
                        >
                            Сбросить
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильная версия */}
            <div className="lg:hidden">
                <div className="bg-white border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                            </svg>
                            <span className="text-sm font-light text-gray-900">Фильтры</span>
                            {hasActiveFilters && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                        </div>
                        <button
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-sm"
                        >
                            Открыть
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильные фильтры */}
            <MobileFilter
                data={data}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedStorage={selectedStorage}
                setSelectedStorage={setSelectedStorage}
                onApply={applyFilters}
                onReset={resetFilters}
                isOpen={isMobileFilterOpen}
                onClose={() => setIsMobileFilterOpen(false)}
            />
        </div>
    )
}