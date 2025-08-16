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
          <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-600">Ошибка загрузки заказов: {error.message}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Пока нет заказов</h3>
        <p className="text-gray-600">Ваши заказы будут отображаться здесь</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-medium text-gray-900">Заказ #{order.id}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {formatOrderDate(order.created_at)}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium text-lg mb-2">
                  {formatPrice(order.total_price)}
                </div>
                <button
                  onClick={() => handleOrderDetails(order.id)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Подробнее →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {pagination.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pages || 1}
          onPageChange={setCurrentPage}
        />
      )}

      <OrderDetailsModal
        isOpen={!!selectedOrderId}
        onClose={closeModal}
        orderId={selectedOrderId}
      />
    </>
  );
};