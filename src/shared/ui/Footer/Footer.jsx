import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Icons/HeaderIcons';

const Footer = () => {
  const [openSection, setOpenSection] = useState('company');

  return (
    <footer className="w-full bg-white border-t border-gray-300">
      <div className="w-full max-w-7xl mx-auto px-[5%] py-[6%]">
        
        {/* Телефонная версия (до md) */}
        <div className="block md:hidden">
          {/* О компании - всегда открыта */}
          <div className="mb-[4%]">
            <div className="flex items-center gap-[2%] mb-[3%]">
              <Logo />
            </div>
            <p className="text-gray-600 text-lg leading-relaxed font-light mb-[3%]">
              NNV - современная техника и аксессуары с быстрой доставкой по приятным ценам. 
              Делаем технологии доступными каждому.
            </p>
            <div className="flex items-center gap-[2%] text-gray-500 text-lg">
              <svg className="w-[4%] h-[4%]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Telegram канал</span>
            </div>
          </div>

          {/* Аккордеоны для остальных секций */}
          <div className="space-y-[2%]">
            {/* Быстрые ссылки */}
            <div className="border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center py-[3%] px-[2%] focus:outline-none"
                onClick={() => setOpenSection(openSection === 'links' ? null : 'links')}
              >
                <span className="font-semibold text-gray-900 text-xl">Быстрые ссылки</span>
                <svg
                  className={`w-[5%] h-[5%] transform transition-transform duration-200 ${openSection === 'links' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openSection === 'links' ? 'max-h-[50vh] py-[2%]' : 'max-h-0 py-0'}`}>
                <nav className="space-y-[2%] px-[2%] pb-[3%]">
                  <Link to="/catalog" className="block text-gray-600 hover:text-gray-900 transition-colors text-lg font-light">Каталог</Link>
                  <Link to="/about" className="block text-gray-600 hover:text-gray-900 transition-colors text-lg font-light">О нас</Link>
                  <Link to="/delivery" className="block text-gray-600 hover:text-gray-900 transition-colors text-lg font-light">Доставка и оплата</Link>
                </nav>
              </div>
            </div>

            {/* Контакты */}
            <div className="border-b border-gray-200">
              <button
                className="w-full flex justify-between items-center py-[3%] px-[2%] focus:outline-none"
                onClick={() => setOpenSection(openSection === 'contacts' ? null : 'contacts')}
              >
                <span className="font-semibold text-gray-900 text-xl">Контакты</span>
                <svg
                  className={`w-[5%] h-[5%] transform transition-transform duration-200 ${openSection === 'contacts' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openSection === 'contacts' ? 'max-h-[50vh] py-[2%]' : 'max-h-0 py-0'}`}>
                <div className="space-y-[3%] px-[2%] pb-[3%]">
                  <div className="space-y-[1%]">
                    <div className="font-medium text-gray-900 text-lg">+7 (495) 123-45-67</div>
                    <div className="text-lg text-gray-500 font-light">Круглосуточно</div>
                  </div>
                  <div className="space-y-[1%]">
                    <div className="font-medium text-gray-900 text-lg break-all">gamhotik2005@gmail.com</div>
                    <div className="text-lg text-gray-500 font-light">Поддержка</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Компьютерная версия (md и выше) */}
        <div className="hidden md:grid grid-cols-3 gap-[8%]">
          {/* Company Info */}
          <div className="space-y-[4%]">
            <div className="flex items-center gap-[2%]">
              <Logo />
            </div>
            <p className="text-gray-600 text-base md:text-base leading-relaxed font-light">
              nnvStore - современная техника и аксессуары с быстрой доставкой по приятным ценам. 
              Делаем технологии доступными каждому.
            </p>
            <div className="flex items-center gap-[2%] text-gray-500 text-base md:text-base">
              <svg className="w-[4%] h-[4%]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Telegram канал</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-[4%]">
            <h3 className="font-semibold text-gray-900 text-lg md:text-lg">Быстрые ссылки</h3>
            <nav className="space-y-[2%]">
              <Link to="/catalog" className="block text-gray-600 hover:text-gray-900 transition-colors text-base md:text-base font-light">Каталог</Link>
              <Link to="/about" className="block text-gray-600 hover:text-gray-900 transition-colors text-base md:text-base font-light">О нас</Link>
              <Link to="/delivery" className="block text-gray-600 hover:text-gray-900 transition-colors text-base md:text-base font-light">Доставка и оплата</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-[4%]">
            <h3 className="font-semibold text-gray-900 text-lg md:text-lg">Контакты</h3>
            <div className="space-y-[3%]">
              <div className="space-y-[1%]">
                <div className="font-medium text-gray-900 text-base md:text-base">+7 (495) 123-45-67</div>
                <div className="text-base md:text-base text-gray-500 font-light">Круглосуточно</div>
              </div>
              <div className="space-y-[1%]">
                <div className="font-medium text-gray-900 text-base md:text-base break-all">gamhotik2005@gmail.com</div>
                <div className="text-base md:text-base text-gray-500 font-light">Поддержка</div>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-200 mt-[6%] pt-[4%]">
          <div className="flex justify-center items-center">
            <p className="text-base md:text-base text-gray-500 text-center font-light">© 2025 nnvStore. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;