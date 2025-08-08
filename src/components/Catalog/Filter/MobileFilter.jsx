import { Modal } from '../../../ui/Modal/Modal';
import { DropDownFilter } from '../../../ui/Filter/DropDownFilter';
import { RadioFilter } from '../../../ui/Filter/RadioFilter';

export const MobileFilter = ({ 
  data, 
  selectedCategory, 
  setSelectedCategory,
  selectedBrand, 
  setSelectedBrand,
  selectedModel, 
  setSelectedModel,
  selectedColor, 
  setSelectedColor,
  selectedStorage, 
  setSelectedStorage,
  onApply,
  onReset,
  isOpen,
  onClose
}) => {
  const FilterContent = () => (
    <div className="space-y-6">
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

      {/* Кнопки */}
      <div className="flex justify-center gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={onReset}
          className="px-6 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
        >
          Сбросить
        </button>
        <button
          onClick={onApply}
          className="px-6 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300"
        >
          Применить
        </button>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white p-6 max-h-[90vh] overflow-y-auto max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-light text-gray-900">Фильтры</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <FilterContent />
      </div>
    </Modal>
  );
};
