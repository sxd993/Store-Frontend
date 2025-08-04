import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg key={i} className={`w-4 h-4 ${i <= rating ? 'text-gray-600 fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="group bg-white border-2 border-gray-200 hover:border-gray-300 transition-colors duration-300 flex flex-col">
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-4/5 h-4/5"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
          {product.isNew && (
            <span className="bg-gray-900 text-white px-3 py-1 text-xs font-medium">NEW</span>
          )}
          <span className="bg-gray-600 text-white px-3 py-1 text-xs font-medium">-{product.discount}</span>
        </div>
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
            <span className="text-gray-500 font-medium text-lg">Нет в наличии</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col p-8 gap-4">
        <h3 className="font-medium text-xl text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        {product.type && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1">{product.type}</span>
        )}
        {product.storage && (
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1">{product.storage}</span>
        )}
        <div className="flex items-center gap-2">
          <div className="flex">{renderStars(product.rating)}</div>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>
        {product.colors && (
          <div className="flex flex-wrap gap-2">
            {product.colors.slice(0, 3).map((color, idx) => (
              <span key={idx} className="text-sm bg-gray-100 text-gray-600 px-3 py-1">{color}</span>
            ))}
            {product.colors.length > 3 && (
              <span className="text-sm text-gray-400">+{product.colors.length - 3}</span>
            )}
          </div>
        )}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-light text-gray-900">{product.price}</span>
          <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            className={`flex-1 border-2 border-gray-900 bg-white text-gray-900 px-6 py-3 font-medium transition-colors duration-300 ${!product.inStock ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-900 hover:text-white'}`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'В корзину' : 'Нет в наличии'}
          </button>
          <button className="border-2 border-gray-300 bg-gray-50 text-gray-700 px-6 py-3 font-medium hover:bg-gray-100 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 