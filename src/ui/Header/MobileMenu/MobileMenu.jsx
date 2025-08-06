import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Search from "../Search/Search";

const MobileMenu = ({ open, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');
  const [menuHistory, setMenuHistory] = useState(['main']);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setCurrentMenu('main');
      setMenuHistory(['main']);
      // Запускаем анимацию после рендера
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isVisible) return null;

  const navigateToSubmenu = (menuName) => {
    setCurrentMenu(menuName);
    setMenuHistory(prev => [...prev, menuName]);
  };

  const navigateBack = () => {
    if (menuHistory.length > 1) {
      const newHistory = menuHistory.slice(0, -1);
      setMenuHistory(newHistory);
      setCurrentMenu(newHistory[newHistory.length - 1]);
    }
  };

  const phoneModels = ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 16'];

  const renderMainMenu = () => (
    <>
      <button 
        onClick={() => navigateToSubmenu('phones')}
        className="w-full py-6 px-4 text-black font-bold text-2xl border-b border-gray-200 text-center hover:bg-gray-100 transition-colors"
      >
        Айфоны
      </button>
      <button 
        onClick={() => navigateToSubmenu('cases')}
        className="w-full py-6 px-4 text-black font-bold text-2xl border-b border-gray-200 text-center hover:bg-gray-100 transition-colors"
      >
        Чехлы
      </button>
      <button 
        onClick={() => navigateToSubmenu('glass')}
        className="w-full py-6 px-4 text-black font-bold text-2xl border-b border-gray-200 text-center hover:bg-gray-100 transition-colors"
      >
        Защитные стекла
      </button>
      <a href="#" className="w-full py-6 px-4 text-black font-bold text-2xl border-b border-gray-200 text-center hover:bg-gray-100 transition-colors">Личный кабинет</a>
      <a href="#" className="w-full py-6 px-4 text-black font-bold text-2xl border-b border-gray-200 text-center hover:bg-gray-100 transition-colors">О нас</a>
      <a href="#" className="w-full py-6 px-4 text-black font-bold text-2xl text-center hover:bg-gray-100 transition-colors">Корзина</a>
    </>
  );

  const renderSubmenu = (title) => (
    <>
      <div className="w-full py-4 px-4 border-b border-gray-300 flex justify-center items-center">
        <button 
          onClick={navigateBack}
          className="absolute left-6 p-1 hover:bg-gray-200 rounded"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      {phoneModels.map((model, index) => (
        <a 
          key={index}
          href="#" 
          className="w-full py-5 px-4 text-black font-medium text-xl border-b border-gray-200 text-center hover:bg-gray-100 transition-colors"
        >
          {model}
        </a>
      ))}
    </>
  );

  const renderCurrentMenu = () => {
    switch (currentMenu) {
      case 'phones':
        return renderSubmenu('Айфоны');
      case 'cases':
        return renderSubmenu('Чехлы');
      case 'glass':
        return renderSubmenu('Защитные стекла');
      default:
        return renderMainMenu();
    }
  };

  return createPortal(
    <>
      {/* Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isAnimating ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-300 ease-out ${
          isAnimating ? 'transform translate-x-0' : 'transform translate-x-full'
        }`}
      >
        <header className="px-6 pt-6 pb-4 flex justify-center items-center border-b border-gray-200 relative">
          <div className="flex-1 max-w-sm">
            <Search />
          </div>
          <button
            onClick={onClose}
            className="absolute right-6 p-2 hover:bg-gray-100 rounded-full text-black transition-colors"
            aria-label="Закрыть меню"
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </header>
        
        <main className="flex-1 flex flex-col justify-center items-center w-full max-w-xs mx-auto overflow-y-auto relative">
          {renderCurrentMenu()}
        </main>
      </div>
    </>,
    document.body
  );
};

export default MobileMenu;