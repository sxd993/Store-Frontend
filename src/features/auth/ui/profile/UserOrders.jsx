export const UserOrders = ({ orders }) => {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Мои заказы</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">У вас пока нет заказов</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">№ заказа</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Дата</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Статус</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Сумма</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-4 py-2">#{order.id}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === 'Доставлен'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 font-bold">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };