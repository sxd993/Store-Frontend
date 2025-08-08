import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import EditIcon from '@mui/icons-material/Edit';

export const ProductCard = ({ product, onEditClick }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative h-full">
      {/* Основная карточка товара */}
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="bg-white border border-gray-200 hover:border-gray-300 p-6 text-center transition-colors duration-300 h-full flex flex-col">

          {/* Изображение и кнопка редактирования */}
          <div className="mb-6 flex flex-col items-center justify-center relative flex-shrink-0">
            {/* Кнопка редактирования */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick(product);
              }}
              className='w-full flex items-end justify-end mb-2'
              type="button"
              aria-label={`Редактировать ${product.name}`}
            >
              <EditIcon className='text-gray-500 hover:text-gray-700 transition-colors duration-300' />
            </button>

            {/* Изображение товара */}
            <div className="w-full h-48 flex items-center justify-center">
              <img
                className='w-full h-full object-contain'
                src={product.image}
                alt={`${product?.name} ${product?.color}`}
                loading="lazy"
              />
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="flex flex-col flex-1 space-y-4">
            <h3 className="font-light text-lg text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
              {product?.brand} {product?.model} {product?.color} {product?.memory}GB
            </h3>

            {/* Количество в наличии */}
            <div className="flex-shrink-0">
              <p className="text-sm text-gray-500 font-light">
                В наличии: {product.stock_quantity} шт.
              </p>
            </div>

            {/* Цена */}
            <div className="flex-shrink-0">
              <p className="text-xl font-light text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-3 pt-4 flex-shrink-0 mt-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Добавить в корзину:', product.name, 'ID:', product.id);
                }}
                className="flex-1 px-4 py-3 border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 h-12"
              >
                В корзину
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}
                className="flex-1 px-4 py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 h-12"
              >
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};