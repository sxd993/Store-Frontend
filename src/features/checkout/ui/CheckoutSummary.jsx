import { memo } from 'react';
import { formatPrice } from '../../../shared/utils/formatPrice';

export const CheckoutSummary = memo(({ items = [], calculations = {} }) => {
  const { subtotal = 0, total = 0, totalItems = 0 } = calculations;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-xl font-light text-gray-900 mb-6">Ваш заказ</h3>
      
      {/* Товары в заказе */}
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <CheckoutItem key={item.id} item={item} />
        ))}
      </div>
      
      {/* Итоговые расчеты */}
      <div className="border-t border-gray-200 pt-6 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-light">
            Товары ({totalItems} шт.):
          </span>
          <span className="font-light text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 font-light">Доставка:</span>
          <span className="text-green-600 font-light">Бесплатно</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-light text-gray-900">К оплате:</span>
            <span className="text-2xl font-light text-gray-900">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>
      

    </div>
  );
});

// Компонент товара в чекауте
const CheckoutItem = memo(({ item }) => (
  <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
    <div className="w-16 h-16 flex-shrink-0">
      {item.image ? (
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IiNmM2Y0ZjYiLz48cGF0aCBkPSJtMjAgNDhoMjR2LTI0aC0yNHoiIGZpbGw9IiNlNWU3ZWIiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIzIiBmaWxsPSIjOWNhM2FmIi8+PC9zdmc+';
          }}
        />
      ) : (
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
    
    <div className="flex-1 min-w-0">
      <h4 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
        {item.name}
      </h4>
      <div className="text-xs text-gray-600 space-y-1">
        {item.color && <div>Цвет: {item.color}</div>}
        {item.memory && <div>Память: {item.memory}</div>}
      </div>
      <div className="text-sm text-gray-500 mt-2">
        {item.quantity} × {formatPrice(item.price)}
      </div>
    </div>
    
    <div className="text-right self-start">
      <div className="font-medium text-sm text-gray-900">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  </div>
));