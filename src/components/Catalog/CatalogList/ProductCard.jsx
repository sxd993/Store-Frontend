import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';
import EditIcon from '@mui/icons-material/Edit';

export const ProductCard = ({ product, onEditClick }) => {
  const navigate = useNavigate();

  return (
    <div className="group relative">
      {/* Основная карточка товара */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white border-2 border-gray-200 hover:border-gray-300 p-6 md:p-8 text-center transition-colors duration-300 h-full">

          {/* Изображение и кнопка редактирования */}
          <div className="mb-6 md:mb-8 flex flex-col items-center justify-center relative">
            {/* Кнопка редактирования */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEditClick(product);
              }}
              className='w-full flex items-end justify-end'
              type="button"
              aria-label={`Редактировать ${product.name}`}
            >
              <EditIcon className='text-gray-500 hover:text-gray-700 transition-colors duration-300' />
            </button>

            {/* Изображение товара */}
            <img
              className='max-w-[250px] max-h-[250px] object-contain'
              src={product.image}
              alt={`${product?.name} ${product?.color}`}
              loading="lazy"
            />
          </div>

          {/* Информация о товаре */}
          <div className="space-y-4">
            <h3 className="font-light text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
              {product?.brand} {product?.model} {product?.color} {product?.memory}GB
            </h3>

            {/* Количество в наличии */}
            <div className="space-y-2">
              <p className="text-sm md:text-base text-gray-500 font-light">
                В наличии: {product.stock_quantity} шт.
              </p>
            </div>

            {/* Цена */}
            <div className="space-y-2">
              <p className="text-2xl md:text-3xl font-light text-gray-900">
                {formatPrice(product.price)}
              </p>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  console.log('Добавить в корзину:', product.name, 'ID:', product.id);
                }}
                className="flex-1 border-2 border-gray-900 bg-white text-gray-900 px-6 py-3 font-light hover:bg-gray-900 hover:text-white transition-colors duration-300"
              >
                В корзину
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  navigate(`/product/${product.id}`);
                }}
                className="flex-1 border-2 border-gray-200 bg-gray-50 text-gray-700 px-6 py-3 font-light hover:bg-gray-100 transition-colors duration-300"
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