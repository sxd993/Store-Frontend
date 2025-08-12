import { Link } from 'react-router-dom';

export const EmptyCart = ({ className = '' }) => {
  return (
    <div className={`text-center py-12 md:py-16 ${className}`}>
      {/* Иконка */}
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      {/* Заголовок */}
      <h3 className="text-xl md:text-2xl font-light text-gray-900 mb-4">
        Корзина пуста
      </h3>

      {/* Описание */}
      <p className="text-base md:text-lg text-gray-600 font-light mb-8 max-w-md mx-auto leading-relaxed">
        Добавьте товары из каталога, чтобы они отображались здесь
      </p>

      {/* Действия */}
      <div className="space-y-3">
        <Link
          to="/catalog"
          className="inline-block w-full max-w-xs mx-auto px-8 py-4 border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-center"
        >
          Перейти в каталог
        </Link>
        
        <Link
          to="/"
          className="block w-full max-w-xs mx-auto px-8 py-4 border-2 border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100 font-light transition-colors duration-300 text-center"
        >
          На главную
        </Link>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-8 pt-8 border-t border-gray-200 max-w-lg mx-auto">
        <h4 className="text-base font-light text-gray-900 mb-3">
          Почему стоит выбрать нас?
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H15a2 2 0 012 2v0M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m0 0V6a2 2 0 00-2-2H9.414a1 1 0 00-.707.293L7.293 5.707A1 1 0 006.586 6H5a2 2 0 00-2 2v0" />
            </svg>
            <span className="font-light">Быстрая доставка</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-light">Гарантия качества</span>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-6 h-6 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-light">Лучшие цены</span>
          </div>
        </div>
      </div>
    </div>
  );
};