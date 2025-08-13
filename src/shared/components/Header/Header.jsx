import React, { useState, memo, useCallback } from "react";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import Search from "./Search"; // Добавляем импорт
import { Logo } from "./HeaderIcons";
import { Link } from "react-router-dom";

const Header = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Мемоизируем обработчики для стабильности
  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

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
              {/* Заменяем весь блок поиска на компонент Search */}
              <Search className="rounded-2xl" />
            </div>
          </div>

          {/* Навигация справа (desktop) */}
          <div className="hidden md:flex items-center gap-[4%] flex-shrink-0 ml-[3%]">
            <Navigation />
          </div>

          {/* Бургер-меню (mobile) */}
          <button
            className="md:hidden p-0 m-0 bg-transparent border-none outline-none text-black ml-auto"
            onClick={toggleMobileMenu}
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
        <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} />
      </div>
    </>
  );
});

export default Header;