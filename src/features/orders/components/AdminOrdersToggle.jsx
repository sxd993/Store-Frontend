import { UserOrdersList } from './UserOrdersList';

export const AdminOrdersToggle = () => {
  // Убираем все админские функции из личного кабинета
  // Показываем только личные заказы для всех пользователей
  return <UserOrdersList />;
};