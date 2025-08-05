import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-24 max-w-6xl mx-auto md:ml-40">
          {/* Company Info */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <svg className="w-7 h-7 md:w-8 md:h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-lg md:text-xl font-bold text-gray-900">nnvStore</span>
            </div>
            <h3 className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Telegram канал</h3>
            <p className="text-sm text-gray-400 leading-tight">
              nnvStore - современная техника и аксессуары с быстрой доставкой по приятным ценам. Делаем технологии доступными каждому.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">Быстрые ссылки</h3>
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
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-semibold text-gray-900 text-base md:text-lg">Контакты</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium text-gray-900 text-sm">+7 (495) 123-45-67</div>
                <div className="text-xs text-gray-500">Круглосуточно</div>
              </div>
              
              <div>
                <div className="font-medium text-gray-900 text-sm break-all md:break-normal">gamhotik2005@gmail.com</div>
                <div className="text-xs text-gray-500">Поддержка</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <p className="text-xs md:text-sm text-gray-500 text-center">© 2025 nnvStore. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;