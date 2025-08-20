export const getStatusColor = (status) => {
    const colors = {
      'Ожидает оплаты': 'bg-amber-50 text-amber-600 border border-amber-100',
      'Оплачен': 'bg-slate-50 text-slate-600 border border-slate-100',
      'Отправлен': 'bg-blue-50 text-blue-600 border border-blue-100',
      'Доставлен': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      'Отменён': 'bg-rose-50 text-rose-600 border border-rose-100'
    };
    return colors[status] || 'bg-gray-50 text-gray-600 border border-gray-100';
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