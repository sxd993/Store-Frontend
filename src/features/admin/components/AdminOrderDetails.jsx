import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../orders/api/orderApi';
import { formatPrice } from '../../../shared/utils/formatPrice';
import { Modal } from '../../../shared/ui/Modal';

export const AdminOrderDetailsModal = ({ isOpen, onClose, orderId }) => {
  const { data: orderDetails, isLoading, error } = useQuery({
    queryKey: ['adminOrderDetails', orderId],
    queryFn: () => orderApi.getOrderDetails(orderId),
    enabled: !!orderId && isOpen,
    staleTime: 1000 * 60 * 5
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Заказ #${orderId} (Админ)`}>
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
            {/* Информация о клиенте */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">Информация о клиенте</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Имя:</span>
                  <span className="ml-2 font-medium">{orderDetails.user.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">Email:</span>
                  <span className="ml-2 font-medium">{orderDetails.user.email}</span>
                </div>
                <div>
                  <span className="text-gray-600">Телефон:</span>
                  <span className="ml-2 font-medium">{orderDetails.user.phone}</span>
                </div>
                <div>
                  <span className="text-gray-600">ID пользователя:</span>
                  <span className="ml-2 font-medium">{orderDetails.user_id}</span>
                </div>
              </div>
            </div>

            {/* Общая информация о заказе */}
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
                  <span className="text-gray-600">Дата создания:</span>
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
                <div>
                  <span className="text-gray-600">Последнее обновление:</span>
                  <span className="ml-2 font-medium">
                    {new Date(orderDetails.updated_at).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Товаров:</span>
                  <span className="ml-2 font-medium">{orderDetails.stats.total_quantity} шт.</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Общая стоимость:</span>
                  <span className="ml-2 font-bold text-xl text-green-600">
                    {formatPrice(orderDetails.total_price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Товары в заказе */}
            <div>
              <h3 className="text-lg font-medium mb-4">Товары в заказе ({orderDetails.stats.total_items})</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <AdminOrderItem key={index} item={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const AdminOrderItem = ({ item }) => (
  <div className="flex gap-4 p-3 border border-gray-200 rounded-lg">
    {/* Изображение */}
    <div className="w-16 h-16 flex-shrink-0">
      {item.image ? (
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      ) : (
        <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>

    {/* Информация о товаре */}
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-gray-900">{item.name}</h4>
      <div className="text-sm text-gray-600 mt-1">
        <div>ID товара: {item.product_id}</div>
        <div>Категория: {item.category}</div>
        {item.color && <span>Цвет: {item.color}</span>}
        {item.memory && <span className="ml-2">Память: {item.memory}</span>}
      </div>
      <div className="text-sm text-gray-700 mt-1">
        <div>Цена на момент заказа: {formatPrice(item.price_at_order)}</div>
        <div>Количество: {item.quantity}</div>
      </div>
      
      {/* Информация о наличии */}
      <div className="text-xs mt-2">
        {item.is_available ? (
          <div className="text-green-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            В наличии: {item.current_stock} шт.
          </div>
        ) : (
          <div className="text-red-600 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Товар больше не доступен
          </div>
        )}
      </div>
    </div>

    {/* Сумма */}
    <div className="text-right">
      <div className="font-bold text-lg">{formatPrice(item.subtotal)}</div>
      <div className="text-xs text-gray-500">
        {item.quantity} × {formatPrice(item.price_at_order)}
      </div>
    </div>
  </div>
);

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