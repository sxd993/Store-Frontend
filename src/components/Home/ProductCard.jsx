import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            -{product.discount}
          </span>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Нет в наличии</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
            ❤️
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Type */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          {product.type && (
            <span className="text-sm text-blue-600 font-medium">{product.type}</span>
          )}
        </div>

        {/* Storage */}
        {product.storage && (
          <p className="text-sm text-gray-600 mb-3">{product.storage}</p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Colors */}
        {product.colors && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Цвета:</p>
            <div className="flex gap-2">
              {product.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {color}
                </span>
              ))}
              {product.colors.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-800">{product.price}</span>
          <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button 
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${
              product.inStock 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'В корзину' : 'Нет в наличии'}
          </button>
          <button className="py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            👁️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 