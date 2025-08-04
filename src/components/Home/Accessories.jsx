import React from 'react';
import { accessories } from '../../utils/data';
import ProductCard from './ProductCard';

const Accessories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Чехлы и стекла</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Защитите свой iPhone стильно и надежно с нашими премиум аксессуарами
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {accessories.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-semibold mb-2">Максимальная защита</h3>
            <p className="text-gray-600">
              Наши чехлы и стекла обеспечивают надежную защиту от ударов и царапин
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Стильный дизайн</h3>
            <p className="text-gray-600">
              Широкий выбор дизайнов и цветов для любого стиля
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
            <p className="text-gray-600">
              Доставляем аксессуары в течение 1-2 дней по всей России
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accessories; 