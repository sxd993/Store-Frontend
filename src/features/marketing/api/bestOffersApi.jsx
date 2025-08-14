export const bestOffersApi = {
    async get() {
      const response = await fetch('/api/best-offers');
      if (!response.ok) throw new Error('Ошибка загрузки');
      return response.json();
    },
    
    async update(productIds) {
      const response = await fetch('/api/best-offers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ productIds })
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      return response.json();
    }
  };