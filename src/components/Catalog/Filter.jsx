import { useState } from "react";

export const FilterSideBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedStorage, setSelectedStorage] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  const allModels = [
    'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max', 'iPhone 12 mini',
    'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 13 mini',
    'iPhone 14', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 14 Plus',
    'iPhone 15', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 15 Plus',
    'iPhone 16', 'iPhone 16 Pro', 'iPhone 16 Pro Max', 'iPhone 16 Plus', 'iPhone 16e'
  ];

  const colors = ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium', 'Deep Purple', 'Blue', 'Pink', 'Purple', 'Sierra Blue'];
  const storages = ['128GB', '256GB', '512GB', '1TB'];

  const sortOptions = [
    { value: 'name', label: 'По названию' },
    { value: 'price-low', label: 'Цена: по возрастанию' },
    { value: 'price-high', label: 'Цена: по убыванию' },
    { value: 'rating', label: 'По рейтингу' }
  ];

  const resetFilters = () => {
    setSelectedModel('all');
    setSelectedColor('all');
    setSelectedStorage('all');
    setSearchTerm('');
  };
    return (
        <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white border-2 border-gray-200 p-6 md:p-8 rounded-lg">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-light text-gray-900">Фильтры</h3>
                    <button
                        onClick={resetFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 font-light underline transition-colors duration-300"
                    >
                        Сбросить
                    </button>
                </div>

                {/* Фильтр по Модели */}
                <div className="mb-8">
                    <h4 className="text-sm font-light text-gray-900 mb-4">Модель</h4>
                    <div className="relative">
                        <button
                            onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                            className="w-full flex items-center justify-between px-4 py-3 border-2 border-gray-200 bg-white text-left text-sm font-light text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-colors duration-300"
                        >
                            <span>{selectedModel === 'all' ? 'Все модели' : selectedModel}</span>
                            <svg
                                className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isModelDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isModelDropdownOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                                <div className="py-1">
                                    <button
                                        onClick={() => {
                                            setSelectedModel('all');
                                            setIsModelDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-light transition-colors duration-300 ${selectedModel === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                            }`}
                                    >
                                        Все модели
                                    </button>
                                    {allModels.map(model => (
                                        <button
                                            key={model}
                                            onClick={() => {
                                                setSelectedModel(model);
                                                setIsModelDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-light transition-colors duration-300 ${selectedModel === model ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                }`}
                                        >
                                            {model}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Фильтр по Цвету */}
                <div className="mb-8">
                    <h4 className="text-sm font-light text-gray-900 mb-4">Цвет</h4>
                    <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="color"
                                value="all"
                                checked={selectedColor === 'all'}
                                onChange={(e) => setSelectedColor(e.target.value)}
                                className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                            />
                            <span className="ml-3 text-sm text-gray-700 font-light">Все цвета</span>
                        </label>
                        {colors.map(color => (
                            <label key={color} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="color"
                                    value={color}
                                    checked={selectedColor === color}
                                    onChange={(e) => setSelectedColor(e.target.value)}
                                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                />
                                <span className="ml-3 text-sm text-gray-700 font-light">{color}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Фильтр по памяти */}
                <div className="mb-8">
                    <h4 className="text-sm font-light text-gray-900 mb-4">Память</h4>
                    <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="radio"
                                name="storage"
                                value="all"
                                checked={selectedStorage === 'all'}
                                onChange={(e) => setSelectedStorage(e.target.value)}
                                className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                            />
                            <span className="ml-3 text-sm text-gray-700 font-light">Любая память</span>
                        </label>
                        {storages.map(storage => (
                            <label key={storage} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="storage"
                                    value={storage}
                                    checked={selectedStorage === storage}
                                    onChange={(e) => setSelectedStorage(e.target.value)}
                                    className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
                                />
                                <span className="ml-3 text-sm text-gray-700 font-light">{storage}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Кнопка Сброса Фильтров */}
                <div className="pt-6 border-t border-gray-200">
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


