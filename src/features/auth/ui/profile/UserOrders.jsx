import { AdminOrdersToggle } from '../../../orders/components/AdminOrdersToggle';

export const UserOrders = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">История заказов</h2>
        <p className="text-sm md:text-base text-gray-600 font-light">Просматривайте все ваши заказы и их статус</p>
      </div>
      <AdminOrdersToggle />
    </div>
  );
};