import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/hooks/useCart';
import { useCreateOrder } from '../hooks/useCreateOrder';
import { useAuth } from '../../auth/hooks/useAuth';
import { CheckoutForm } from '../ui/CheckoutForm';
import { CheckoutSummary } from '../ui/CheckoutSummary';
import { OrderSuccess } from '../ui/OrderSuccess';
import { CheckoutLoading, CheckoutError } from '../ui/states/CheckoutStates';


export const CheckoutContainer = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { items, calculations, isEmpty } = useCart();
  const createOrderMutation = useCreateOrder();
  const [orderCreated, setOrderCreated] = useState(null);

  // Редиректы
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (isEmpty) {
    navigate('/cart');
    return null;
  }

  // Успешное создание заказа
  if (orderCreated) {
    return <OrderSuccess order={orderCreated} />;
  }

  // Обработка создания заказа
  const handleCreateOrder = async (formData) => {
    try {
      const order = await createOrderMutation.mutateAsync({
        userId: user.id,
        ...formData
      });
      setOrderCreated(order);
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
    }
  };

  // Состояния ошибки
  if (createOrderMutation.isError) {
    return <CheckoutError error={createOrderMutation.error} />;
  }

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
            Оформление заказа
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CheckoutForm 
              onSubmit={handleCreateOrder}
              isLoading={createOrderMutation.isPending}
              error={createOrderMutation.error}
            />
          </div>
          
          <div>
            <CheckoutSummary 
              items={items}
              calculations={calculations}
            />
          </div>
        </div>
      </div>
    </section>
  );
};