import { PriceDisplay } from '../../../shared/ui/PriceDisplay';
import { useCart } from '../hooks/useCart';

export const CartSummary = ({ className = '' }) => {
  const { calculations } = useCart();

  const {
    subtotal,
    shipping,
    discount,
    total,
    totalItems,
    hasDiscount,
    hasFreeShipping
  } = calculations;

  return (
    <div className={`bg-white border border-gray-200 p-6 ${className}`}>
      <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-6">
        Итого
      </h2>

      <div className="space-y-4 mb-6">
        {/* Количество товаров */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="font-light">
            Товаров: {totalItems} шт.
          </span>
        </div>

        {/* Подытог */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-light">Сумма товаров</span>
          <PriceDisplay price={subtotal} size="medium" />
        </div>

        {/* Скидка */}
        {hasDiscount && (
          <div className="flex justify-between items-center text-green-600">
            <span className="font-light">Скидка</span>
            <span className="font-light">-<PriceDisplay price={discount} size="medium" /></span>
          </div>
        )}

        {/* Доставка */}
        <div className="flex justify-between items-center">
          <span className="text-gray-600 font-light">Доставка</span>
          {hasFreeShipping ? (
            <span className="text-green-600 font-light">Бесплатно</span>
          ) : (
            <PriceDisplay price={shipping} size="medium" />
          )}
        </div>

        {/* Информация о бесплатной доставке */}
        {!hasFreeShipping && subtotal > 0 && (
          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
            <span className="font-light">
              Бесплатная доставка от <PriceDisplay price={3000} size="small" />
            </span>
          </div>
        )}

        {/* Разделитель */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg md:text-xl font-light text-gray-900">К оплате</span>
            <PriceDisplay
              price={total}
              size="xl"
              className="font-medium text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      {subtotal > 0 && (
        <div className="text-xs text-gray-500 space-y-2">
          <p className="font-light">
            • Цены указаны с учетом всех налогов
          </p>
          <p className="font-light">
            • Доставка в пределах МКАД
          </p>
          {hasDiscount && (
            <p className="font-light text-green-600">
              • Применена скидка за объем покупки
            </p>
          )}
        </div>
      )}
    </div>
  );
};