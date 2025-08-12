import { PriceDisplay } from '../../../shared/ui/PriceDisplay';
import { useCart } from '../hooks/useCart';

export const CartSummary = ({ className = '' }) => {
  const { calculations } = useCart();

  const {
    subtotal,
    total,
    totalItems
  } = calculations;

  return (
    <div className={`bg-white border border-gray-200 p-6 ${className}`}>
      <h2 className="text-xl font-light text-gray-900 mb-6 text-center">
        Итого
      </h2>

      <div className="space-y-4 mb-6">
        {/* Количество товаров */}
        <div className="flex justify-between items-center text-sm text-gray-600 pb-3 border-b border-gray-100">
          <span className="font-light">
            Товаров: {totalItems} шт.
          </span>
        </div>

        {/* Подытог */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-light text-sm">Сумма товаров</span>
          <PriceDisplay price={subtotal} size="medium" />
        </div>

        {/* Доставка */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-light text-sm">Доставка</span>
          <span className="text-green-600 font-light text-sm">Бесплатно</span>
        </div>

        {/* Разделитель */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-light text-gray-900">К оплате</span>
            <PriceDisplay
              price={total}
              size="xl"
              className="font-medium text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  );
};