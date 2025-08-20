import { useState } from 'react';
import { useUserOrders } from '../hooks/useUserOrders';
import { OrderDetailsModal } from './OrderDetailsModal';
import { formatPrice } from '../../../shared/utils/formatPrice';
import { getStatusColor, formatOrderDate } from '../../../shared/utils/orderUtils';
import { Pagination } from '../../../shared/components/Pagination';

export const UserOrdersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const perPage = 10;

  const { data, isLoading, error } = useUserOrders(currentPage, perPage);
  const orders = data?.items || [];
  const pagination = data?.pagination || {};

  const handleOrderDetails = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-2xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-6 md:py-8">
        <div className="text-red-600 mb-4">
          <svg className="w-10 h-10 md:w-12 md:h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-600 font-light text-sm md:text-base">Ошибка загрузки заказов: {error.message}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 md:py-12">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 border-2 border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg md:text-xl font-light text-gray-900 mb-2">Пока нет заказов</h3>
        <p className="text-gray-600 font-light text-sm md:text-base mb-4 md:mb-6">Ваши заказы будут отображаться здесь</p>
        <a 
          href="/catalog" 
          className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300 rounded-2xl text-sm md:text-base"
        >
          Перейти в каталог
          <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 md:space-y-4">
        {orders.map(order => (
          <div 
            key={order.id} 
            className="group bg-white border border-gray-200 rounded-2xl p-4 md:p-6 hover:border-gray-300 transition-colors duration-300 cursor-pointer"
            onClick={() => handleOrderDetails(order.id)}
          >
            <div className="flex flex-col gap-3">
              {/* Верхняя строка: номер заказа и статус */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-base md:text-lg font-light text-gray-900">Заказ #{order.id}</h3>
                <span className={`inline-flex justify-center px-2 py-1 rounded-xl text-xs font-light ${getStatusColor(order.status)} w-fit`}>
                  {order.status}
                </span>
              </div>
              
              {/* Средняя строка: дата и цена */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-xs md:text-sm text-gray-600 font-light">
                  {formatOrderDate(order.created_at)}
                </div>
                <div className="text-lg md:text-xl font-light text-gray-900">
                  {formatPrice(order.total_price)}
                </div>
              </div>
              
              {/* Нижняя строка: кнопка подробнее */}
              <div className="flex justify-center sm:justify-end pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
                  <span>Подробнее</span>
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="mt-6 md:mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.pages || 1}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <OrderDetailsModal
        isOpen={!!selectedOrderId}
        onClose={closeModal}
        orderId={selectedOrderId}
      />
    </>
  );
};