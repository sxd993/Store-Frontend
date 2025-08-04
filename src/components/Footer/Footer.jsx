import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-xl font-bold text-gray-900">nnvStore</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Быстрые ссылки</h3>
            <nav className="space-y-2">
              <Link to="/catalog" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Каталог
              </Link>
              <Link to="/about" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">
                О нас
              </Link>
              <Link to="/delivery" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Доставка и оплата
              </Link>
              <Link to="/warranty" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Гарантия
              </Link>
              <Link to="/contacts" className="block text-gray-600 hover:text-gray-900 transition-colors text-sm">
                Контакты
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Контакты</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900 text-sm">+7 (495) 123-45-67</div>
                <div className="text-xs text-gray-500">Круглосуточно</div>
              </div>
              
              <div>
                <div className="font-medium text-gray-900 text-sm">info@istore.ru</div>
                <div className="text-xs text-gray-500">Поддержка</div>
              </div>
              
              <div>
                <div className="font-medium text-gray-900 text-sm">Москва, Тверская, 1</div>
                <div className="text-xs text-gray-500">Главный офис</div>
              </div>
              
              <div>
                <div className="font-medium text-gray-900 text-sm">10:00 - 22:00</div>
                <div className="text-xs text-gray-500">Режим работы</div>
              </div>
            </div>
          </div>

          {/* Telegram Subscription */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Telegram канал</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span>Эксклюзивные скидки</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span>Быстрые уведомления</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <span>Новые товары первыми</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 nnvStore. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;