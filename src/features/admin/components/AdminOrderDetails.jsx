import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { orderApi } from '../../orders/api/orderApi';
import { formatPrice } from '../../../shared/utils/formatPrice';

// Функция для определения цвета статуса
const getStatusColor = (status) => {
  const colors = {
    'Ожидает оплаты': 'bg-amber-50 text-amber-700 border-amber-200',
    'Оплачен': 'bg-sky-50 text-sky-700 border-sky-200',
    'Отправлен': 'bg-violet-50 text-violet-700 border-violet-200',
    'Доставлен': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Отменён': 'bg-rose-50 text-rose-700 border-rose-200'
  };
  return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200';
};

// Функция для получения иконки статуса
const getStatusIcon = (status) => {
  const icons = {
    'Ожидает оплаты': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Оплачен': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    'Отправлен': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    'Доставлен': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    'Отменён': (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };
  return icons[status] || (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

export const AdminOrderDetailsModal = ({ isOpen, onClose, orderId }) => {
  const { data: orderDetails, isLoading, error } = useQuery({
    queryKey: ['adminOrderDetails', orderId],
    queryFn: () => orderApi.getOrderDetails(orderId),
    enabled: !!orderId && isOpen,
    staleTime: 1000 * 60 * 5
  });

  // Блокируем скролл body когда модалка открыта
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Закрытие по ESC
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[95vh] md:max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                Заказ #{orderId}
              </h2>
              {orderDetails && (
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(orderDetails.status)}`}>
                    {getStatusIcon(orderDetails.status)}
                    {orderDetails.status}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {new Date(orderDetails.created_at).toLocaleDateString('ru-RU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
            </div>
            
            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          {orderDetails && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-2xl font-light text-gray-900">
                {formatPrice(orderDetails.total_price)}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 max-h-[calc(95vh-140px)] md:max-h-[calc(90vh-160px)] overflow-y-auto">
          {isLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
              <p className="text-gray-600 text-sm">Загрузка...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-rose-600 text-sm">{error.message || 'Ошибка загрузки'}</p>
            </div>
          )}

          {orderDetails && (
            <div className="space-y-6">
              {/* Информация о клиенте */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Клиент</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 min-w-[80px]">Имя:</span>
                    <span className="font-medium text-gray-900">{orderDetails.user?.name || 'Не указано'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 min-w-[80px]">Телефон:</span>
                    <span className="font-medium text-gray-900">{orderDetails.user?.phone || 'Не указан'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-gray-500 min-w-[80px]">ID:</span>
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">{orderDetails.user_id}</span>
                  </div>
                </div>
              </div>

              {/* Товары в заказе */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Товары ({orderDetails.stats?.total_items || 0})
                </h3>
                
                <div className="space-y-3">
                  {orderDetails.items?.map((item, index) => (
                    <AdminOrderItem key={index} item={item} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AdminOrderItem = ({ item }) => (
  <div className="bg-white border border-gray-200 p-3 rounded-lg">
    <div className="flex gap-3">
      {/* Изображение */}
      <div className="w-12 h-12 flex-shrink-0">
        {item.image ? (
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-full object-cover rounded border border-gray-200"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded flex items-center justify-center border border-gray-200">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Информация о товаре */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm mb-2">{item.name}</h4>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div>ID: {item.product_id}</div>
          <div>Категория: {item.category}</div>
          {item.color && <div>Цвет: {item.color}</div>}
          {item.memory && <div>Память: {item.memory}</div>}
        </div>
        
        {/* Информация о наличии */}
        <div className="mt-2">
          {item.is_available ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded text-xs border border-emerald-200">
              В наличии: {item.current_stock} шт.
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-700 rounded text-xs border border-rose-200">
              Недоступен
            </span>
          )}
        </div>
      </div>

      {/* Сумма */}
      <div className="text-right flex flex-col justify-between">
        <div className="text-lg font-medium text-gray-900">
          {formatPrice(item.subtotal)}
        </div>
        <div className="text-xs text-gray-500">
          {item.quantity} × {formatPrice(item.price_at_order)}
        </div>
      </div>
    </div>
  </div>
);