import { useState } from 'react';
import { useUserOrderDetails } from '../hooks/useUserOrders';
import { formatPrice } from '../../../shared/utils/formatPrice';
import { getStatusColor } from '../../../shared/utils/orderUtils';
import { Modal } from '../../../shared/ui/Modal';

export const OrderDetailsModal = ({ isOpen, onClose, orderId }) => {
  const { data: orderDetails, isLoading, error } = useUserOrderDetails(orderId);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Заказ #${orderId}`}>
      <div className="space-y-6">
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
            {/* Общая информация */}
            <div className="bg-white border border-gray-200 p-4 rounded-2xl">
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
                    {new Date(orderDetails.created_at).toLocaleDateString('ru-RU')}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Товаров:</span>
                  <span className="ml-2 font-medium">{orderDetails.stats.total_quantity} шт.</span>
                </div>
                <div>
                  <span className="text-gray-600">Общая стоимость:</span>
                  <span className="ml-2 font-medium">{formatPrice(orderDetails.total_price)}</span>
                </div>
              </div>
            </div>

            {/* Товары в заказе */}
            <div>
              <h3 className="text-lg font-medium mb-4">Товары в заказе</h3>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <OrderItem key={index} item={item} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

const OrderItem = ({ item }) => (
  <div className="flex gap-4 p-3 border border-gray-200 rounded-2xl">
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
      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
      <div className="text-sm text-gray-600 mt-1">
        {item.color && <span>Цвет: {item.color}</span>}
        {item.memory && <span className="ml-2">Память: {item.memory}</span>}
      </div>
      <div className="text-sm text-gray-500 mt-1">
        Количество: {item.quantity} × {formatPrice(item.price_at_order)}
      </div>
      
      {/* Статус доступности */}
      {!item.is_available && (
        <div className="text-xs text-red-600 mt-1 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          Товар больше не доступен
        </div>
      )}
    </div>

    {/* Сумма */}
    <div className="text-right">
      <div className="font-medium">{formatPrice(item.subtotal)}</div>
    </div>
  </div>
);