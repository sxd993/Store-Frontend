import { memo } from 'react';
import { CartItem } from './CartItem';

export const CartList = memo(({ 
  items = [], 
  onQuantityChange, 
  onRemoveItem,
  isUpdating,
  isRemoving 
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {items.map(item => (
          <CartItem 
            key={item.id} 
            item={item}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
            isUpdating={isUpdating}
            isRemoving={isRemoving}
          />
        ))}
      </div>
    </div>
  );
});