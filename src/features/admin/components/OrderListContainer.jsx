import { useState } from "react";
import { useAdminOrders } from "../hooks/useAdminOrdes";
import { OrderList } from "../ui/OrderList";

export const OrderListContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    // Получаем заказы с пагинацией
    const { allOrders, ordersError, ordersloading, updateOrder, statusPending } = useAdminOrders(currentPage, perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const orders = allOrders?.data?.items || [];
    const pagination = allOrders?.data?.pagination || {};

    if (ordersloading) {
        return <p>Загрузка</p>
    }
    return (
        <OrderList
            orders={orders}
            pagination={pagination}
            isLoading={ordersloading}
            error={ordersError}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            updateOrder={updateOrder}
            statusPending={statusPending}
        />
    );
};