import { useAddProductForm } from '../../../hooks/Catalog/useAddProductForm';
import { InputField } from '../InputFields';

export const AddProductForm = ({ onClose }) => {
  const { handleSubmit, register, formState, mutation } = useAddProductForm(onClose);

  return (
    <div className="p-6">
      {/* Заголовок */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Добавить товар</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          register={register}
          name="name"
          placeholder="Название товара"
          validation={{ required: 'Название обязательно' }}
          error={formState.errors.name}
        />

        <div className="grid grid-cols-2 gap-4">
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

        <div className="grid grid-cols-2 gap-4">
          <InputField
            register={register}
            name="color"
            placeholder="Цвет"
          />

          <InputField
            register={register}
            name="memory"
            placeholder="Память"
          />
        </div>

        <InputField
          register={register}
          name="image"
          type="url"
          placeholder="Ссылка на изображение"
        />

        <InputField
          register={register}
          name="description"
          type="textarea"
          placeholder="Описание товара"
          rows={3}
        />

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="flex-1 py-2 text-white bg-black hover:bg-neutral-900 rounded-lg disabled:opacity-50"
          >
            {mutation.isLoading ? 'Добавляем...' : 'Добавить'}
          </button>
        </div>
      </form>

      {mutation.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-sm">
            Ошибка: {mutation.error?.message || 'Не удалось добавить товар'}
          </p>
        </div>
      )}
    </div>
  );
};