import { QuantityInput } from '../../../shared/ui/QuantityInput';
import { useCart } from '../hooks/useCart';

export const CartQuantitySelector = ({ 
  productId, 
  currentQuantity, 
  disabled = false,
  size = 'medium',
  className = ''
}) => {
  const { updateQuantity, isUpdating } = useCart();

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity === currentQuantity) return;
    
    const result = await updateQuantity(productId, newQuantity);
    if (!result.success) {
      console.error('Ошибка обновления количества:', result.error);
      // Здесь можно показать уведомление об ошибке
    }
  };

  return (
    <QuantityInput
      value={currentQuantity}
      onChange={handleQuantityChange}
      disabled={disabled || isUpdating}
      size={size}
      className={className}
      min={1}
      max={99}
    />
  );
};