import { useState } from 'react';
import { useAddProductForm } from '../../hooks/useAddProductForm.jsx';
import { InputField } from '../../../../shared/ui/InputFields.jsx';
import { ImageManager } from '../../utils/ImageManager';

export const AddProductForm = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const { handleSubmit, register, formState, mutation } = useAddProductForm(onClose, images);

  return (
    <div className="bg-white p-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-light text-gray-900">Добавить товар</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

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

        {/* Кнопки */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded disabled:opacity-50"
          >
            {mutation.isLoading ? 'Добавляем...' : 'Добавить'}
          </button>
        </div>
      </form>

      {mutation.isError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-700 text-sm">
            {mutation.error?.message || 'Ошибка добавления товара'}
          </p>
        </div>
      )}
    </div>
  );
};