import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import Search from "./Search/Search";
import MobileMenu from "./MobileMenu/MobileMenu";
import { Logo } from "../../ui/Icons/HeaderIcons";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="w-full bg-white border-b border-gray-300 sticky top-0 z-50 h-[8vh] min-h-[56px]">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-full px-[5%]">
          {/* Логотип слева */}
          <div className="flex items-center gap-[3%] flex-shrink-0">
            <span className="font-black text-xl md:text-lg text-black tracking-tight select-none">
              <Logo />
            </span>
          </div>
          {/* Поиск по центру (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-[60%]">
              <Search />
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