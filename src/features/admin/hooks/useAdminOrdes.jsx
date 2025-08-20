import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllOrders, updateOrderStatus } from '../api/adminApi'

export const useAdminOrders = (page = 1, perPage = 10) => {
    const queryClient = useQueryClient()

    const { data: allOrders, error: ordersError, isLoading: ordersloading } = useQuery({
        queryKey: ['allOrders', page, perPage],
        queryFn: () => getAllOrders({ page, per_page: perPage }),
        staleTime: 1000 * 60 * 5
    })

    const { mutate: updateOrder, isPending: statusPending, error: updateError } = useMutation({
        mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allOrders'] })
        }
    })

    return {
        // Все заказы
        allOrders,
        ordersError,
        ordersloading,
        // Обновление статусы
        updateOrder,
        statusPending,
        updateError
    }
}