import { memo } from "react";
import { InputField } from "../../../../shared/ui/InputFields";
import { ImageManager } from '../../utils/ImageManager';

export const EditItem = memo(({ 
  item, 
  onClose, 
  images,
  onImagesChange,
  onSubmit,
  register,
  formState,
  isLoading = false,
  error = null
}) => {
  return (
    <div className="bg-white p-4">
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-light text-gray-900">Редактировать товар</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Форма */}
      <div className="space-y-4">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Категория */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Категория</h4>
            <p className="text-xs text-gray-500">Например: телефон, приставка, ноутбук</p>
            <InputField
              register={register}
              name="category"
              defaultValue={item.category}
              placeholder="Телефон"
              validation={{ required: 'Категория обязательна' }}
              error={formState.errors.category}
            />
          </div>

          {/* Бренд */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Бренд</h4>
            <p className="text-xs text-gray-500">Например: Apple, Samsung, Sony</p>
            <InputField
              register={register}
              name="brand"
              defaultValue={item.brand}
              placeholder="Apple"
              validation={{ required: 'Бренд обязателен' }}
              error={formState.errors.brand}
            />
          </div>

          {/* Модель */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Модель</h4>
            <p className="text-xs text-gray-500">Например: iPhone 15, Galaxy S24, PS5</p>
            <InputField
              register={register}
              name="model"
              defaultValue={item.model}
              placeholder="iPhone 15"
              validation={{ required: 'Модель обязательна' }}
              error={formState.errors.model}
            />
          </div>

          {/* Цена и количество */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Цена и количество</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                register={register}
                name="price"
                type="number"
                step="0.01"
                defaultValue={item.price}
                placeholder="Цена в рублях"
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
                defaultValue={item.stock_quantity}
                placeholder="Количество на складе"
                validation={{
                  required: 'Количество обязательно',
                  min: { value: 0, message: 'Количество не может быть отрицательным' }
                }}
                error={formState.errors.stock_quantity}
              />
            </div>
          </div>

          {/* Характеристики */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Характеристики</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <InputField
                register={register}
                name="color"
                defaultValue={item.color}
                placeholder="Цвет"
              />

              <InputField
                register={register}
                name="memory"
                defaultValue={item.memory}
                placeholder="Память (например: 128GB, 16GB)"
              />
            </div>
          </div>

          {/* Изображения */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Изображения товара</h4>
            <p className="text-xs text-gray-500">Добавьте изображения товара. Первое изображение будет главным.</p>
            <ImageManager images={images} onChange={onImagesChange} />
          </div>

          {/* Описание */}
          <div className="space-y-2">
            <h4 className="text-sm font-light text-gray-900">Описание товара</h4>
            <p className="text-xs text-gray-500">Подробное описание товара, характеристики, особенности</p>
            <InputField
              register={register}
              name="description"
              type="textarea"
              defaultValue={item.description}
              placeholder="Опишите товар подробно: основные характеристики, особенности, преимущества..."
              rows={4}
            />
          </div>

          {/* Кнопки */}
          <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 rounded-2xl"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl"
            >
              {isLoading ? 'Сохраняем...' : 'Сохранить изменения'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200">
            <p className="text-red-700 text-sm font-light">
              {error?.message || 'Не удалось сохранить изменения'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
});