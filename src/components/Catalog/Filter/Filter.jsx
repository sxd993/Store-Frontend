import { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { RadioFilter } from '../../../ui/Filter/RadioFilter'
import { DropDownFilter } from '../../../ui/Filter/DropDownFilter'
import { GetFilterCategory } from '../../../api/Catalog/FilterApi'

export const Filter = () => {
    const [selectedCategory, setSelectedCategory] = useState('Все категории');
    const [selectedBrand, setSelectedBrand] = useState('Все бренды');
    const [selectedModel, setSelectedModel] = useState('all');
    const [selectedColor, setSelectedColor] = useState('all');
    const [selectedStorage, setSelectedStorage] = useState('all');

    const { data, error, isLoading } = useQuery({
        queryKey: ['filterOptions'],
        queryFn: GetFilterCategory,
        staleTime: 1000 * 60 * 60,
    });

    const resetFilters = () => {
        setSelectedModel('all');
        setSelectedColor('all');
        setSelectedStorage('all');
        setSearchTerm('');
    };

    if (isLoading) {
        return <p>Загрузка фильтров</p>
    }
    if (error) {
        return <p>Ошибка загрузки фильтров: {error.message}</p>
    }

    return (
        <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border-2 border-gray-200 p-6 md:p-8 rounded-lg">
                <div className="flex items-center justify-center mb-8">
                    <h3 className="text-xl font-light text-gray-900">Фильтры</h3>
                </div>
                {/* Фильтр по Категории */}
                <DropDownFilter
                    title="Категории"
                    options={data.category}
                    selectedValue={selectedCategory}
                    onChange={setSelectedCategory}
                />
                {/* Фильтр по Бренду */}
                <DropDownFilter
                    title="Бренды"
                    options={data.brand}
                    selectedValue={selectedBrand}
                    onChange={setSelectedBrand}
                />
                {/* Фильтр по Модели */}
                <DropDownFilter
                    title="Модели"
                    options={data.model}
                    selectedValue={selectedModel}
                    onChange={setSelectedModel}
                />

                {/* Фильтр по Цвету */}
                <RadioFilter
                    title="Цвет"
                    options={data.colors}
                    selectedValue={selectedColor}
                    onChange={setSelectedColor}
                />

                {/* Фильтр по Памяти */}
                <RadioFilter
                    title="Память"
                    options={data.memory}
                    selectedValue={selectedStorage}
                    onChange={setSelectedStorage}
                />

                {/* Кнопкb */}
                <div className="pt-6 flex flex-col gap-5 border-t border-gray-200">
                    <button
                        onClick={() => { console.log('Применить фильтры') }}
                        className="w-full border-2 border-gray-400 bg-blue-200 text-gray-700 px-6 py-3 font-light hover:bg-blue-300 hover:border-gray-300 transition-colors duration-300"
                    >
                        Применить фильтры
                    </button>
                    <button
                        onClick={resetFilters}
                        className="w-full border-2 border-gray-200 bg-white text-gray-700 px-6 py-3 font-light hover:bg-gray-50 hover:border-gray-300 transition-colors duration-300"
                    >
                        Сбросить фильтры
                    </button>
                </div>
            </div>
        </div>
    )
}