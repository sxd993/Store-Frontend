import client from './client';

export const CatalogApi = async (page) => {
    const response = await client.get('/catalog', params = { page, per_page: 20 });
    return response.data;
}
    