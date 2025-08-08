import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      quantity: 1,
      storage: '128GB',
      color: 'Natural Titanium',
      image: '/iphone15pro.jpg'
    },
    {
      id: 2,
      name: 'iPhone 15',
      price: 799,
      quantity: 2,
      storage: '128GB',
      color: 'Black',
      image: '/iphone15.jpg'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Бесплатная доставка
  const total = subtotal + shipping;
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      {/* Заголовок */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center mb-8">
            <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
              ← Назад к каталогу
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            Корзина
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
            Проверьте выбранные товары и оформите заказ
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {cartItems.length === 0 ? (
          // Пустая корзина
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-light text-gray-900">Корзина пуста</h3>
            <p className="mt-2 text-gray-500 font-light mb-8">Добавьте товары из каталога</p>
            <Link
              to="/catalog"
              className="border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300"
            >
              Перейти в каталог
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Список товаров */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-6 p-6 border border-gray-200">
                    {/* Изображение товара */}
                    <div className="w-24 h-24 bg-gray-50 flex items-center justify-center flex-shrink-0">
                      <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Информация о товаре */}
                    <div className="flex-1">
                      <h3 className="text-xl font-light text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-500 font-light mb-2">{item.storage} • {item.color}</p>
                      <p className="text-2xl font-light text-gray-900">${item.price}</p>
                    </div>

                    {/* Количество */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-12 text-center font-light text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>

                    {/* Итого за товар */}
                    <div className="text-right">
                      <p className="text-xl font-light text-gray-900">${item.price * item.quantity}</p>
                    </div>

                    {/* Удалить */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Итого и оформление заказа */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 p-6">
                <h2 className="text-2xl font-light text-gray-900 mb-6">Итого</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Подытог</span>
                    <span className="font-light text-gray-900">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-light">Доставка</span>
                    <span className="font-light text-gray-900">Бесплатно</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-light text-gray-900">Итого</span>
                    <span className="text-2xl font-light text-gray-900">${total}</span>
                  </div>
                </div>

                <button className="w-full border-2 border-gray-900 bg-white text-gray-900 px-8 py-4 font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300 mb-4">
                  Оформить заказ
                </button>

                <Link
                  to="/catalog"
                  className="w-full border-2 border-gray-200 bg-gray-50 text-gray-700 px-8 py-4 font-medium hover:bg-gray-100 transition-colors duration-300 block text-center"
                >
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
