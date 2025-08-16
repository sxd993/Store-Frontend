export const getStatusColor = (status) => {
    const colors = {
      'Ожидает оплаты': 'bg-yellow-100 text-yellow-800',
      'Оплачен': 'bg-blue-100 text-blue-800',
      'Отправлен': 'bg-purple-100 text-purple-800',
      'Доставлен': 'bg-green-100 text-green-800',
      'Отменён': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
  
  export const formatOrderDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  export const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };