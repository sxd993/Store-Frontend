import { client } from '../../../shared/api/client'

export const ProductApi = async (productId) => {
    const response = await client.get(`/catalog/${productId}`);
    return response.data.data;
};