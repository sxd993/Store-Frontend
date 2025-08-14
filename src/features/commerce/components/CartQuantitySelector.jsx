import { QuantityInput } from '../../../shared/ui/QuantityInput';
import { useCartApi } from '../hooks/useCartApi';

export const CartQuantitySelector = ({
  productId,
  currentQuantity,
  disabled = false,
  size = 'medium',
  className = ''
}) => {
  const { updateQuantity, isItemUpdating } = useCartApi();
  
  const isUpdating = isItemUpdating(productId);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === currentQuantity || isUpdating) return;
    updateQuantity(productId, newQuantity);
  };

  return (
    <QuantityInput
      value={currentQuantity}
      onChange={handleQuantityChange}
      disabled={disabled || isUpdating}
      size={size}
      className={`${className} ${isUpdating ? 'opacity-75' : ''}`}
      min={1}
      max={99}
    />
  );
};