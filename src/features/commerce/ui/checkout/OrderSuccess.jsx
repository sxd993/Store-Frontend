import { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../../shared/utils/formatPrice';

export const OrderSuccess = memo(({ order }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Иконка успеха */}
          <div className="w-20 h-20 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Заголовок */}
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Заказ успешно создан!
          </h1>

          {/* Информация о заказе */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <span className="text-gray-600 font-light">Номер заказа:</span>
                <div className="font-medium text-lg text-gray-900">#{order.id}</div>
              </div>
              <div className="text-left md:text-right">
                <span className="text-gray-600 font-light">Сумма заказа:</span>
                <div className="font-medium text-lg text-gray-900">
                  {formatPrice(order.total_price)}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 text-left">
              <span className="text-gray-600 font-light">Статус:</span>
              <span className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                {order.status || 'Ожидает оплаты'}
              </span>
            </div>
          </div>

          {/* Описание */}
          <p className="text-gray-600 mb-8 text-base leading-relaxed font-light max-w-lg mx-auto">
            Мы отправили подтверждение заказа на ваш телефон. 
            Наш менеджер свяжется с вами в ближайшее время для уточнения деталей доставки.
          </p>

          {/* Действия */}
          <div className="space-y-3 max-w-sm mx-auto">
            <Link
              to={`/orders/${order.id}`}
              className="w-full block px-8 py-3 bg-gray-900 text-white text-center rounded-2xl hover:bg-gray-800 transition-colors duration-300 font-light"
            >
              Посмотреть заказ
            </Link>
            
            <Link
              to="/catalog"
              className="w-full block px-8 py-3 border border-gray-200 text-gray-700 text-center rounded-2xl hover:bg-gray-50 transition-colors duration-300 font-light"
            >
              Продолжить покупки
            </Link>
            
            <Link
              to="/orders"
              className="w-full block px-8 py-3 border border-gray-200 bg-gray-50 text-gray-700 text-center rounded-2xl hover:bg-gray-100 transition-colors duration-300 font-light"
            >
              Все мои заказы
            </Link>
          </div>

          {/* Дополнительная информация */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-2xl text-left">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Что дальше?</h4>
                <ul className="text-sm text-blue-700 space-y-1 font-light">
                  <li>• Менеджер свяжется с вами в течение 1 часа</li>
                  <li>• Уточним детали доставки и способ оплаты</li>
                  <li>• Доставим заказ в течение 1-3 рабочих дней</li>
                  <li>• Отправим SMS с трек-номером для отслеживания</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});