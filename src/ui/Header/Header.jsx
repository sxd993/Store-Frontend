import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import MobileMenu from "./MobileMenu/MobileMenu";
import { Logo } from "../../ui/Icons/HeaderIcons";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b border-gray-300 sticky top-0 z-50 h-[10vh] min-h-[56px]">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full px-[5%]">
          {/* Логотип слева */}
          <div className="flex items-center gap-[3%] flex-shrink-0">
            <span className="font-black text-xl md:text-lg text-black tracking-tight select-none">
              <Logo />
            </span>
          </div>

          {/* Объединенный каталог и поиск (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-[70%] max-w-2xl">
              <div className="flex items-center border border-gray-600 bg-white">
                {/* Кнопка каталога */}
                <Link
                  to="/catalog"
                  className="flex items-center gap-2 px-6 py-2 text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300">
                  <span className="tracking-wide text-base">Каталог</span>
                </Link>
                
                {/* Разделитель */}
                <div className="w-px h-8 bg-gray-200"></div>
                
                {/* Поиск */}
                <div className="flex-1 flex items-center px-4 py-2">
                  <input
                    type="text"
                    placeholder="Поиск товаров..."
                    className="outline-none bg-transparent text-sm text-black placeholder-gray-500 w-full font-light"
                  />
                  <button type="submit" className="p-1 text-gray-600 ml-2">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Навигация справа (desktop) */}
          <div className="hidden md:flex items-center gap-[4%] flex-shrink-0 ml-[3%]">
            <Navigation />
          </div>

          {/* Бургер-меню (mobile) */}
          <button
            className="md:hidden p-0 m-0 bg-transparent border-none outline-none text-black ml-auto"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Открыть меню"
            style={{ fontSize: '6vw' }}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </header>

      {/* MobileMenu с плавной анимацией */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Header;