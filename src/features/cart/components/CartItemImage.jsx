import { useState } from 'react';

export const CartItemImage = ({ 
  src, 
  alt, 
  className = "w-20 h-20 md:w-24 md:h-24",
  fallbackIcon = true 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (imageError || !src) {
    return (
      <div className={`${className} bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-200`}>
        {fallbackIcon ? (
          <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ) : (
          <div className="text-xs text-gray-400 text-center p-2">
            Нет изображения
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className} bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-200 relative overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
};