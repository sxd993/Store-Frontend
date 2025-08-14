import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/adminApi";
import { OrderList } from "../ui/OrderList";

export const OrderListContainer = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 20;

    const { data, error, isLoading } = useQuery({
        queryKey: ["orders", currentPage],
        queryFn: () => getAllOrders({ page: currentPage, per_page: perPage }),
        staleTime: 5 * 60 * 1000
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const orders = data?.data?.items || [];
    const pagination = data?.data?.pagination || {};

    return (
        <OrderList
            orders={orders}
            pagination={pagination}
            isLoading={isLoading}
            error={error}
            currentPage={currentPage}
            onPageChange={handlePageChange}
        />
    );
};