export const AddressNotice = () => (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <div>
          <h4 className="font-medium text-yellow-800 mb-1">Адреса доставки</h4>
          <p className="text-sm text-yellow-700">
            В текущей версии адреса доставки не сохраняются. 
            Рекомендуется добавить поля адреса в форму оформления заказа и таблицу orders.
          </p>
          <p className="text-xs text-yellow-600 mt-1">
            Поля для добавления: delivery_address, delivery_city, delivery_postal_code
          </p>
        </div>
      </div>
    </div>
  );