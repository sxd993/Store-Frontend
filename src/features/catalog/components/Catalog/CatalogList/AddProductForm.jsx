import { useState } from 'react';
import { useAddProductForm } from '../../hooks/useAddProductForm.jsx';
import { InputField } from '../../../../shared/ui/InputFields.jsx';
import { ImageManager } from '../../utils/ImageManager';

export const AddProductForm = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const { handleSubmit, register, formState, mutation } = useAddProductForm(onClose, images);

  return (
    <div className="p-4">
      {/* Компактный заголовок в стиле фильтров */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
          <h3 className="text-base font-light text-gray-900">Добавить товар</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300 p-1 hover:bg-gray-100 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Контент формы */}
      <div className="space-y-3">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Основное */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField
              register={register}
              name="category"
              placeholder="Категория"
              validation={{ required: 'Категория обязательна' }}
              error={formState.errors.category}
            />
            <InputField
              register={register}
              name="brand"
              placeholder="Бренд"
              validation={{ required: 'Бренд обязателен' }}
              error={formState.errors.brand}
            />
            <InputField
              register={register}
              name="model"
              placeholder="Модель"
              validation={{ required: 'Модель обязательна' }}
              error={formState.errors.model}
            />
          </div>

          {/* Цена и количество */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              register={register}
              name="price"
              type="number"
              step="0.01"
              placeholder="Цена"
              validation={{
                required: 'Цена обязательна',
                min: { value: 0.01, message: 'Цена должна быть больше 0' }
              }}
              error={formState.errors.price}
            />
            <InputField
              register={register}
              name="stock_quantity"
              type="number"
              placeholder="Количество"
              validation={{
                required: 'Количество обязательно',
                min: { value: 0, message: 'Количество не может быть отрицательным' }
              }}
              error={formState.errors.stock_quantity}
            />
          </div>

          {/* Характеристики */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField register={register} name="color" placeholder="Цвет" />
            <InputField register={register} name="memory" placeholder="Память" />
          </div>

          {/* Изображения */}
          <ImageManager images={images} onChange={setImages} />

          {/* Описание */}
          <InputField
            register={register}
            name="description"
            type="textarea"
            placeholder="Описание товара"
            rows={3}
          />

          {/* Кнопки в стиле фильтров */}
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-3 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 text-sm rounded-2xl"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="flex-1 px-3 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-sm disabled:opacity-50 rounded-2xl"
            >
              {mutation.isLoading ? 'Добавляем...' : 'Добавить'}
            </button>
          </div>
        </form>

        {mutation.isError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-700 text-sm">
              {mutation.error?.message || 'Ошибка добавления товара'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};