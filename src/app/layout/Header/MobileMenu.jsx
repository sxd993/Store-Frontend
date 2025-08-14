import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import Search from "../../../shared/components/Search";
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

  // Иконки SVG
  const HomeIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );

  const AdminIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
    </svg>
  );

  const ProfileIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );

  const CatalogIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z" />
    </svg>
  );

  const CartIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );

  const TelegramIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-black transition-opacity duration-300 z-40 ${isAnimating ? 'opacity-50' : 'opacity-0'
          }`}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 flex flex-col transition-transform duration-300 ease-out ${isAnimating ? 'transform translate-x-0' : 'transform translate-x-full'
          }`}
      >
        <header className="px-[5%] py-4">
          {/* Контейнер хедера с равномерным распределением */}
          <div className="flex flex-col gap-4">
            {/* Первый ряд: логотип по центру и кнопка закрыть справа на одной высоте */}
            <div className="flex items-center justify-between">
              {/* Пустой div для баланса */}
              <div className="w-12"></div>

              {/* Логотип по центру */}
              <Link to="/" className="flex items-center gap-1" onClick={onClose}>
                <svg className="w-10 h-10 -mt-2.5" fill="black" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-3xl logo-font text-black">NNV</div>
              </Link>

              {/* Кнопка закрыть справа */}
              <button
                onClick={onClose}
                className="p-3 hover:bg-gray-100 rounded-full text-black transition-colors"
                aria-label="Закрыть меню"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            {/* Второй ряд: поиск по центру */}
            <div className="flex justify-center">
              <Search className="h-12 px-6 text-lg" />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col px-[5%] overflow-y-auto">
          {/* Контейнер основного меню с равномерным распределением */}
          <div className="flex-1 flex flex-col justify-between py-6">
            {/* Навигационные ссылки */}
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                className="py-4 px-6 text-black font-bold text-xl border-b border-gray-200 hover:bg-gray-100 transition-colors flex items-center"
                onClick={onClose}
              >
                <HomeIcon />
                <span className="flex-1 text-center mr-5">Главная</span>
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="py-4 px-6 text-black font-bold text-xl border-b border-gray-200 hover:bg-gray-100 transition-colors flex items-center"
                  onClick={onClose}
                >
                  <AdminIcon />
                  <span className="flex-1 text-center mr-5">Админ-панель</span>
                </Link>
              )}

              <Link
                to="/profile"
                className="py-4 px-6 text-black font-bold text-xl border-b border-gray-200 hover:bg-gray-100 transition-colors flex items-center"
                onClick={onClose}
              >
                <ProfileIcon />
                <span className="flex-1 text-center mr-5">Личный кабинет</span>
              </Link>

              <Link
                to="/catalog"
                className="py-4 px-6 text-black font-bold text-xl border-b border-gray-200 hover:bg-gray-100 transition-colors flex items-center"
                onClick={onClose}
              >
                <CatalogIcon />
                <span className="flex-1 text-center mr-5">Каталог</span>
              </Link>

              <Link
                to="/cart"
                className="py-4 px-6 text-black font-bold text-xl border-b border-gray-200 hover:bg-gray-100 transition-colors flex items-center"
                onClick={onClose}
              >
                <CartIcon />
                <span className="flex-1 text-center mr-5">Корзина</span>
              </Link>

              <a
                href="https://t.me/your_username"
                target="_blank"
                rel="noopener noreferrer"
                className="py-4 px-6 text-black font-bold text-xl hover:bg-gray-100 transition-colors flex items-center"
                onClick={onClose}
              >
                <TelegramIcon />
                <span className="flex-1 text-center mr-5">Телеграм</span>
              </a>
            </div>

            {/* Контактная информация */}
            <div className="flex flex-col gap-4 pt-8">
              <a href="mailto:info@example.com" className="flex items-center justify-center gap-2 text-gray-600 text-lg">
                <EmailIcon />
                <span>info@example.com</span>
              </a>
              <a href="tel:+71234567890" className="flex items-center justify-center gap-2 text-gray-600 text-lg">
                <PhoneIcon />
                <span>+7 (123) 456-78-90</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>,
    document.body
  );
};

export default MobileMenu;