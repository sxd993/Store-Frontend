import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Search from "./Search";
import { useAuth } from "../../../features/auth/hooks/useAuth";

const MobileMenu = ({ open, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Очистка при размонтировании компонента
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isVisible) return null;

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
        <header className="pt-[4%] pb-[6%] px-[5%]">
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="p-[3%] hover:bg-gray-100 rounded-full text-black transition-colors"
              aria-label="Закрыть меню"
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>
                     <div className="flex justify-center py-5">
              <Search className="h-12 px-6 text-lg" />
            </div>
        </header>
        
        <main className="flex-1 flex flex-col w-full max-w-[90vw] mx-auto overflow-y-auto relative">
          <div className="flex-1 flex flex-col justify-center items-center">
            <div className="w-full max-w-sm flex flex-col">
              <Link to="/" className="py-[6%] px-[4%] text-black font-bold text-xl md:text-base border-b border-gray-200 text-center hover:bg-gray-100 transition-colors" onClick={onClose}>
                Главная
              </Link>
              {isAdmin && (
                <Link to="/admin" className="py-[6%] px-[4%] text-black font-bold text-xl md:text-base border-b border-gray-200 text-center hover:bg-gray-100 transition-colors" onClick={onClose}>
                  Админ-панель
                </Link>
              )}
              <Link to="/profile" className="py-[6%] px-[4%] text-black font-bold text-xl md:text-base border-b border-gray-200 text-center hover:bg-gray-100 transition-colors" onClick={onClose}>
                Личный кабинет
              </Link>
              <Link to="/catalog" className="py-[6%] px-[4%] text-black font-bold text-xl md:text-base border-b border-gray-200 text-center hover:bg-gray-100 transition-colors" onClick={onClose}>
                Каталог
              </Link>
              <Link to="/cart" className="py-[6%] px-[4%] text-black font-bold text-xl md:text-base border-b border-gray-200 text-center hover:bg-gray-100 transition-colors" onClick={onClose}>
                Корзина
              </Link>
              <a href="https://t.me/your_username" target="_blank" rel="noopener noreferrer" className="py-[6%] px-[4%] text-black font-bold text-xl md:text-base text-center hover:bg-gray-100 transition-colors" onClick={onClose}>
                Телеграм
              </a>
            </div>
          </div>
          
          <div className="mt-auto pb-[20%] text-center">
            <a href="mailto:info@example.com" className="block text-gray-600 text-lg mb-5">
              info@example.com
            </a>
            <a href="tel:+71234567890" className="block text-gray-600 text-lg">
              +7 (123) 456-78-90
            </a>
          </div>
        </main>
      </div>
    </>,
    document.body
  );
};

export default MobileMenu;