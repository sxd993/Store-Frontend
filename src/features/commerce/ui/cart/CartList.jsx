import { memo } from 'react';
import { CartItem } from './CartItem';

export const CartList = memo(({ items = [] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-light text-gray-900 mb-6">
        Корзина ({items.length})
      </h2>
      <div className="space-y-4">
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});