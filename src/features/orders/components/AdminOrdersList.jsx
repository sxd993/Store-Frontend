import { useState } from 'react';
import { useAdminOrders, useAdminOrderDetails } from '../hooks/useAdminOrders';
import { formatPrice } from '../../../shared/utils/formatPrice';
import { Pagination } from '../../../shared/components/Pagination';
import { Modal } from '../../../shared/ui/Modal';

// Функция для определения цвета статуса
const getStatusColor = (status) => {
  const colors = {
    'Ожидает оплаты': 'bg-yellow-100 text-yellow-800',
    'Оплачен': 'bg-blue-100 text-blue-800',
    'Отправлен': 'bg-purple-100 text-purple-800',
    'Доставлен': 'bg-green-100 text-green-800',
    'Отменён': 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const AdminOrdersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const perPage = 15;

  const { data, isLoading, error } = useAdminOrders(currentPage, perPage);
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
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Заказов пока нет</h3>
        <p className="text-gray-600">Заказы пользователей будут отображаться здесь</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {orders.map(order => (
          <AdminOrderCard 
            key={order.id} 
            order={order} 
            onShowDetails={handleOrderDetails}
          />
        ))}
      </div>

      {pagination.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.pages || 1}
          onPageChange={setCurrentPage}
        />
      )}

      <AdminOrderDetailsModal
        isOpen={!!selectedOrderId}
        onClose={closeModal}
        orderId={selectedOrderId}
      />
    </>
  );
};

const AdminOrderCard = ({ order, onShowDetails }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Основная информация о заказе */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-medium text-gray-900">Заказ #{order.id}</h3>
            <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Создан: {new Date(order.created_at).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</div>
            <div className="font-medium text-lg text-gray-900">
              {formatPrice(order.total_price)}
            </div>
          </div>
        </div>
  
        {/* Информация о клиенте - БЕЗ EMAIL */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Клиент</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{order.user?.name || 'Неизвестно'}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{order.user?.phone || 'Не указан'}</span>
            </div>
            <div className="text-xs text-gray-500">
              ID пользователя: {order.user_id}
            </div>
          </div>
        </div>
  
        {/* Действия */}
        <div className="flex flex-col justify-between">
          <div className="text-sm text-gray-600 mb-4">
            <div>Товаров: {order.stats?.total_quantity || 'неизвестно'}</div>
            <div>Обновлен: {new Date(order.updated_at).toLocaleDateString('ru-RU')}</div>
          </div>
          <button
            onClick={() => onShowDetails(order.id)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  );
  
  // Модальное окно деталей для админа - БЕЗ EMAIL
  const AdminOrderDetailsModal = ({ isOpen, onClose, orderId }) => {
    const { data: orderDetails, isLoading, error } = useAdminOrderDetails(orderId);
  
    if (!isOpen) return null;
  
    return (
      <Modal isOpen={isOpen} onClose={onClose} title={`Заказ #${orderId} - Детали`}>
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Загрузка деталей заказа...</p>
            </div>
          )}
  
          {error && (
            <div className="text-center py-8">
              <div className="text-red-600 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-600">{error.message || 'Ошибка загрузки деталей заказа'}</p>
            </div>
          )}
  
          {orderDetails && (
            <>
              {/* Информация о клиенте - БЕЗ EMAIL */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Информация о клиенте</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Имя:</span>
                    <span className="ml-2 font-medium">{orderDetails.user?.name || 'Не указано'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Телефон:</span>
                    <span className="ml-2 font-medium">{orderDetails.user?.phone || 'Не указан'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">ID пользователя:</span>
                    <span className="ml-2 font-medium">{orderDetails.user_id}</span>
                  </div>
                </div>
              </div>
  
              {/* Детали заказа */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Детали заказа</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Статус:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(orderDetails.status)}`}>
                      {orderDetails.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Создан:</span>
                    <span className="ml-2 font-medium">
                      {new Date(orderDetails.created_at).toLocaleDateString('ru-RU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Общая стоимость:</span>
                    <span className="ml-2 font-bold text-xl text-green-600">
                      {formatPrice(orderDetails.total_price)}
                    </span>
                  </div>
                </div>
              </div>
  
              {/* Товары */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Товары в заказе ({orderDetails.stats?.total_items || 0})
                </h3>
                <div className="space-y-3">
                  {orderDetails.items?.map((item, index) => (
                    <div key={index} className="flex gap-4 p-3 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                        ) : (
                          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <div className="text-sm text-gray-600 mt-1">
                          {item.color && <span>Цвет: {item.color} </span>}
                          {item.memory && <span>Память: {item.memory}</span>}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.quantity} × {formatPrice(item.price_at_order)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formatPrice(item.subtotal)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  };