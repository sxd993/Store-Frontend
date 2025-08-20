import { useState } from 'react';
import { Pagination } from "../../../shared/components/Pagination";
import { ORDER_STATUSES } from "../utils/StatuConst";
import { AdminOrderDetailsModal } from '../components/AdminOrderDetails';

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

export const OrderList = ({
    orders,
    pagination,
    isLoading,
    error,
    currentPage,
    onPageChange,
    updateOrder,
    statusPending
}) => {
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    if (isLoading) {
        return (
            <div className="space-y-6">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-100 h-28 rounded-xl"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-16">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">Ошибка загрузки</h3>
                <p className="text-gray-600">{error.message || 'Не удалось загрузить заказы'}</p>
            </div>
        );
    }

    const handleDetailsClick = (orderId) => {
        setSelectedOrderId(orderId);
    };

    const closeDetailsModal = () => {
        setSelectedOrderId(null);
    };

    return (
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
            {/* Заголовок */}
            <div className="text-center mb-12">
                <h1 className="text-3xl font-light text-gray-900 mb-4">Управление заказами</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Просмотр и управление всеми заказами пользователей</p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Всего заказов</p>
                            <p className="text-2xl font-light text-gray-900">{orders.length}</p>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-xl">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Ожидают оплаты</p>
                            <p className="text-2xl font-light text-gray-900">
                                {orders.filter(o => o.status === 'Ожидает оплаты').length}
                            </p>
                        </div>
                        <div className="p-3 bg-amber-50 rounded-xl">
                            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Отправлены</p>
                            <p className="text-2xl font-light text-gray-900">
                                {orders.filter(o => o.status === 'Отправлен').length}
                            </p>
                        </div>
                        <div className="p-3 bg-violet-50 rounded-xl">
                            <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Доставлены</p>
                            <p className="text-2xl font-light text-gray-900">
                                {orders.filter(o => o.status === 'Доставлен').length}
                            </p>
                        </div>
                        <div className="p-3 bg-emerald-50 rounded-xl">
                            <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Список заказов */}
            {orders.length > 0 ? (
                <div className="space-y-5 mb-10">
                    {orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onShowDetails={handleDetailsClick}
                            updateOrder={updateOrder}
                            statusPending={statusPending}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 10a2 2 0 01-2 2H8a2 2 0 01-2-2L5 9z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-3">Заказов пока нет</h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">Когда пользователи будут делать заказы, они появятся здесь</p>
                </div>
            )}

            {/* Пагинация */}
            {pagination && pagination.pages && pagination.pages > 1 && (
                <div className="flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={pagination.pages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}

            {/* Модальное окно с деталями */}
            <AdminOrderDetailsModal
                isOpen={!!selectedOrderId}
                onClose={closeDetailsModal}
                orderId={selectedOrderId}
            />
        </div>
    );
};

const OrderCard = ({ order, onShowDetails, updateOrder, statusPending }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Основная информация */}
            <div className="lg:col-span-2">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-light text-gray-900 mb-2">
                            Заказ #{order.id}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status}
                            </span>
                            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                ID пользователя: {order.user_id}
                            </span>
                        </div>
                    </div>
                    <div className="text-right ml-4 flex-shrink-0">
                        <div className="text-2xl font-light text-gray-900 mb-1">
                            {order.total_price.toLocaleString()} ₽
                        </div>
                        <div className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="text-gray-500 font-medium block mb-2">Создан:</span>
                        <div className="font-medium text-gray-900">
                            {new Date(order.created_at).toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <span className="text-gray-500 font-medium block mb-2">Обновлён:</span>
                        <div className="font-medium text-gray-900">
                            {new Date(order.updated_at).toLocaleString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Управление статусом */}
            <div className="flex flex-col justify-between">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Статус заказа
                    </label>
                    <select
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        value={order.status}
                        onChange={(e) => updateOrder({ orderId: order.id, status: e.target.value })}
                        disabled={statusPending}
                        aria-label={`Изменить статус заказа #${order.id}`}
                    >
                        {ORDER_STATUSES.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={() => onShowDetails(order.id)}
                    className="w-full mt-4 px-8 py-4 text-gray-500 hover:text-gray-700 transition-colors text-base font-medium flex items-center justify-center gap-4 group"
                >
                    <span>Подробнее</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
);