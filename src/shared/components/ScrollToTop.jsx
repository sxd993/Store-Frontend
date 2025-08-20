import { useState, useEffect } from 'react';

export const ScrollToTop = () => {
  const [scrollY, setScrollY] = useState(0);

  // Обновляем позицию прокрутки
  const updateScrollPosition = () => {
    const currentScrollY = window.pageYOffset;
    setScrollY(currentScrollY);
  };

  // Прокрутка наверх
  const scrollToTop = () => {
    // Если уже вверху, ничего не делаем
    if (scrollY <= 0) {
      return;
    }
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScrollPosition);
    // Вызываем updateScrollPosition сразу для установки начального состояния
    updateScrollPosition();
    
    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
    };
  }, [scrollY]);

  // Определяем стиль кнопки в зависимости от прокрутки
  const buttonStyle = scrollY > 0 
    ? "text-gray-500 hover:text-gray-700 cursor-pointer" 
    : "text-gray-300 cursor-default";

  return (
    <div className="text-right">
      <button
        onClick={scrollToTop}
        className={`underline hover:no-underline transition-colors duration-200 text-sm ${buttonStyle}`}
        aria-label={scrollY > 0 ? "Прокрутить наверх" : "Вы уже вверху страницы"}
        disabled={scrollY <= 0}
      >
        ↑ Вернуться наверх
      </button>
    </div>
  );
};
