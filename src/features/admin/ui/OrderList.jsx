import { useState } from 'react';
import { Pagination } from "../../../shared/components/Pagination";
import { Link } from "react-router-dom";
import { ORDER_STATUSES } from "../utils/StatuConst";
import { AdminOrderDetailsModal } from '../components/AdminOrderDetails';

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

    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка загрузки заказов</p>;

    const handleDetailsClick = (orderId) => {
        setSelectedOrderId(orderId);
    };

    const closeDetailsModal = () => {
        setSelectedOrderId(null);
    };

    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-5 text-center">Список заказов</h2>
                <table className="w-full border border-gray-200 p-2">
                    <thead>
                        <tr className="bg-gray-100 text-center">
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Пользователь</th>
                            <th className="p-2 border-b">Сумма</th>
                            <th className="p-2 border-b">Статус</th>
                            <th className="p-2 border-b">Создан</th>
                            <th className="p-2 border-b">Обновлён</th>
                            <th className="p-2 border-b">Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50 text-center">
                                    <td className="p-2 border-b">{order.id}</td>
                                    <td className="p-2 border-b">{order.user_id}</td>
                                    <td className="p-2 border-b">{order.total_price.toLocaleString()} ₽</td>
                                    <td className="p-2 border-b">
                                        <select
                                            className="border border-gray-300 rounded-md px-2 py-1 text-sm disabled:opacity-60"
                                            value={order.status}
                                            onChange={(e) => updateOrder({ orderId: order.id, status: e.target.value })}
                                            disabled={statusPending}
                                            aria-label={`Изменить статус заказа #${order.id}`}
                                        >
                                            {ORDER_STATUSES.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="p-2 border-b">{new Date(order.created_at).toLocaleString()}</td>
                                    <td className="p-2 border-b">{new Date(order.updated_at).toLocaleString()}</td>
                                    <td className="p-2 border-b">
                                        <button
                                            onClick={() => handleDetailsClick(order.id)}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Подробнее
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    Заказы не найдены
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Пагинация */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.pages || 1}
                    onPageChange={onPageChange}
                />
            </div>

            {/* Модальное окно с деталями */}
            <AdminOrderDetailsModal
                isOpen={!!selectedOrderId}
                onClose={closeDetailsModal}
                orderId={selectedOrderId}
            />
        </>
    );
};