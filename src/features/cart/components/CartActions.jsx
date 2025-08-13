import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useAuth } from '../../auth/hooks/useAuth';

export const CartActions = () => {
  const navigate = useNavigate();
  const { isEmpty, calculations, clearCart, isClearing } = useCart();
  const createOrderMutation = useCreateOrder();
  const { user, isAuthenticated } = useAuth();

  const handleCheckout = async () => {
    if (!isAuthenticated || !user?.id) {
      navigate('/login');
      return;
    }

    if (isEmpty) {
      alert('Корзина пуста');
      return;
    }

    try {
      const order = await createOrderMutation.mutateAsync(user.id);
      navigate(`/orders/${order.id}`);
    } catch (error) {
      alert('Не удалось создать заказ');
      console.error(error);
    }
  };

  const handleClear = () => {
    if (window.confirm('Очистить корзину?')) {
      clearCart();
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleCheckout}
        disabled={createOrderMutation.isPending}
        className="w-full px-4 py-3 bg-green-700 text-white hover:bg-green-800 transition-colors duration-300 rounded-lg font-light disabled:opacity-50"
      >
        {createOrderMutation.isPending ? 'Создание заказа...' : 'Оформить заказ'}
      </button>
      
      <button
        onClick={handleClear}
        disabled={isClearing}
        className="w-full px-4 py-3 border-red-700 border-[1px] text-gray-700 hover:bg-red-50 transition-colors duration-300 rounded-lg font-light disabled:opacity-50"
      >
        {isClearing ? 'Очистка...' : 'Очистить корзину'}
      </button>
    </div>
  );
};