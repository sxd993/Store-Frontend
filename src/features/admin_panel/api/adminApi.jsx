import { client } from "../../../shared/api/client"

/* Получение всех заказов */
export const getAllOrders = async ({ page = 1, per_page = 20 } = {}) => {
    try {
        const params = { page, per_page };
        const response = await client.get('/orders', { params });
        return response.data;
    } catch (error) {
        console.error('Ошибка получения заказов:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await client.put(`/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Ошибка обновления статуса заказа:', error);
        throw error;
    }
};