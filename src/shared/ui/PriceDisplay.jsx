import { formatPrice } from '../utils/formatPrice';

export const PriceDisplay = ({
  price,
  originalPrice = null,
  size = 'medium',
  showCurrency = true,
  className = '',
  strike = false
}) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl'
  };

  const formattedPrice = typeof price === 'number' 
    ? formatPrice(price) 
    : price;

  const formattedOriginalPrice = originalPrice 
    ? (typeof originalPrice === 'number' ? formatPrice(originalPrice) : originalPrice)
    : null;

  if (originalPrice && originalPrice > price) {
    // Показываем цену со скидкой
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className={`font-light text-gray-900 ${sizeClasses[size]}`}>
          {formattedPrice}
        </span>
        <span className={`font-light text-gray-500 line-through ${sizeClasses.small}`}>
          {formattedOriginalPrice}
        </span>
      </div>
    );
  }

  return (
    <span 
      className={`font-light text-gray-900 ${sizeClasses[size]} ${strike ? 'line-through' : ''} ${className}`}
    >
      {formattedPrice}
    </span>
  );
};

export const PriceRange = ({ 
  minPrice, 
  maxPrice, 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base', 
    large: 'text-lg'
  };

  if (minPrice === maxPrice) {
    return (
      <PriceDisplay 
        price={minPrice}
        size={size}
        className={className}
      />
    );
  }

  return (
    <span className={`font-light text-gray-900 ${sizeClasses[size]} ${className}`}>
      {formatPrice(minPrice)} - {formatPrice(maxPrice)}
    </span>
  );
};