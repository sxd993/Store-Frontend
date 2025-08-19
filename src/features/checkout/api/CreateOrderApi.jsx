import { client } from "../../../shared/api/client";

export const CreateOrder = async (userId) => {
    const response = await client.post('/orders', {
        user_id: userId
    });
    return response.data.data;
}