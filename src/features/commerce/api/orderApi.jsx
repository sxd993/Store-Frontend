import { client } from './client'

export const createOrder = async (userId) => {
    const response = await client.post('/orders', {
        user_id: userId
    });
    return response.data.data;
};