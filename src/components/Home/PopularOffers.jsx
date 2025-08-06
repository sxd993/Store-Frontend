import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../api/client';

export const PopularOffers = ({ ids }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    Promise.all(
      ids.map(id =>
        client.get(`/catalog/${id}`)
          .then(res => res.data.data)
          .catch(() => null)
      )
    ).then(results => {
      if (isMounted) {
        setProducts(results.filter(Boolean));
        setLoading(false);
      }
    }).catch(e => {
      if (isMounted) {
        setError('Ошибка загрузки популярных товаров');
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, [ids]);

  if (loading) {
    return (
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-light">Загрузка популярных предложений...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="text-center">
          <p className="text-lg text-gray-600 font-light mb-4">{error}</p>
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6">Популярные предложения</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
          Самые востребованные товары, которые выбирают наши покупатели
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map(product => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="group block"
          >
            <div className="bg-white border-2 border-gray-200 hover:border-gray-300 p-6 md:p-8 text-center transition-colors duration-300">
              <div className="mb-6 md:mb-8 flex items-center justify-center">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 md:w-28 md:h-28 object-contain bg-gray-50 border border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-gray-50 border border-gray-200 flex items-center justify-center">
                    <svg className="h-12 w-12 md:h-16 md:w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <h3 className="font-medium text-xl md:text-2xl text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                {product.name}
              </h3>
              
              <p className="text-sm md:text-base text-gray-500 mb-4">
                {product.memory && product.color ? `${product.memory} • ${product.color}` : 'В наличии'}
              </p>
              
              <p className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                {product.price} ₽
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-6">
                <span className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors duration-300">Подробнее</span>
                <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};