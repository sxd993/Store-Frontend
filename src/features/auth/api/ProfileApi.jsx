import { client } from '../../../shared/api/client';

export const GetProfileApi = async () => {
    const response = await client.get('/auth/me');
    return response.data.data;
};