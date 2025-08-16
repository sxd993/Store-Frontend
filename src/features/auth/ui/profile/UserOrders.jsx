import { AdminOrdersToggle } from '../../../orders/components/AdminOrdersToggle';

export const UserOrders = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6  ">
      <h2 className="text-2xl font-semibold mb-6 text-center">Мои заказы</h2>
      <AdminOrdersToggle />
    </div>
  );
};