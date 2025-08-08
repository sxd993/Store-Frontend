import { RadioFilter } from '../../../ui/Filter/RadioFilter';
import { DropDownFilter } from '../../../ui/Filter/DropDownFilter';

export const FilterContent = ({ data, filterState, onApply, onReset }) => {
  const { values, setters } = filterState;

  return (
    <div className="space-y-2">
      {/* Фильтр по Категории */}
      <DropDownFilter
        title="Категории"
        options={data?.category || []}
        selectedValue={values.selectedCategory}
        onChange={setters.setSelectedCategory}
      />
      
      {/* Фильтр по Бренду */}
      <DropDownFilter
        title="Бренды"
        options={data?.brand || []}
        selectedValue={values.selectedBrand}
        onChange={setters.setSelectedBrand}
      />
      
      {/* Фильтр по Модели */}
      <DropDownFilter
        title="Модели"
        options={data?.model || []}
        selectedValue={values.selectedModel}
        onChange={setters.setSelectedModel}
      />

      {/* Фильтр по Цвету */}
      <RadioFilter
        title="Цвет"
        options={data?.colors || []}
        selectedValue={values.selectedColor}
        onChange={setters.setSelectedColor}
      />

      {/* Фильтр по Памяти */}
      <RadioFilter
        title="Память"
        options={data?.memory || []}
        selectedValue={values.selectedStorage}
        onChange={setters.setSelectedStorage}
      />

      {/* Кнопки */}
      <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={onReset}
          className="px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-sm"
        >
          Сбросить
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-sm"
        >
          Применить
        </button>
      </div>
    </div>
  );
};