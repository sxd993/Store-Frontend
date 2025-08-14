import { Pagination } from "../../../shared/components/Pagination";
import { Link } from "react-router-dom";

export const OrderList = ({
    orders,
    pagination,
    isLoading,
    error,
    currentPage,
    onPageChange
}) => {
    if (isLoading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка загрузки заказов</p>;

    return (
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
                        <th className="p-2 border-b">Детали</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border-b">{order.id}</td>
                                <td className="p-2 border-b">{order.user_id}</td>
                                <td className="p-2 border-b">{order.total_price.toLocaleString()} ₽</td>
                                <td className="p-2 border-b">{order.status}</td>
                                <td className="p-2 border-b">{new Date(order.created_at).toLocaleString()}</td>
                                <td className="p-2 border-b">{new Date(order.updated_at).toLocaleString()}</td>
                                <td className="p-2 border-b">
                                    <Link to={`/order/${order.id}`}>
                                        Подробнее
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-4">
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
    );
};