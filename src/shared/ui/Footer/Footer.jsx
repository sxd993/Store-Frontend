import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Icons/HeaderIcons';

// Данные и подкомпоненты для сокращения дублирования
const TELEGRAM_URL = 'https://t.me/nnvStore';
const COMPANY_DESCRIPTION = 'nnvStore - современная техника и аксессуары с быстрой доставкой по приятным ценам. Делаем технологии доступными каждому.';

const QUICK_LINKS = [
  { to: '/profile', label: 'Личный кабинет' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/cart', label: 'Корзина' },
];

const CONTACTS = {
  phone: { value: '+7 (495) 123-45-67', caption: 'Круглосуточно' },
  email: { value: 'gamhotik2005@gmail.com', caption: 'Поддержка' },
};

const TelegramLink = ({ className = '' }) => (
  <a
    href={TELEGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Открыть Telegram канал"
    className={`flex items-center gap-[2%] text-gray-500 hover:text-gray-900 transition-colors ${className}`}
  >
    <svg className="w-[4%] h-[4%]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
    <span>Telegram канал</span>
  </a>
);

const CompanyInfo = ({ className = '' }) => (
  <div className={`space-y-[4%] ${className}`}>
    <div className="flex items-center gap-[2%]">
      <Logo />
    </div>
    <p className="text-gray-600 leading-relaxed font-light text-lg md:text-base">
      {COMPANY_DESCRIPTION}
    </p>
    <TelegramLink className="text-lg md:text-base" />
  </div>
);

const LinksList = () => (
  <nav className="space-y-[2%]">
    {QUICK_LINKS.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className="block text-gray-600 hover:text-gray-900 transition-colors font-light text-lg md:text-base"
      >
        {item.label}
      </Link>
    ))}
  </nav>
);

const ContactsBlock = () => (
  <div className="space-y-[3%]">
    <div className="space-y-[1%]">
      <div className="text-lg md:text-base text-gray-500 font-light">{CONTACTS.phone.caption}</div>
      <div className="font-medium text-gray-900 text-lg md:text-base">{CONTACTS.phone.value}</div>
    </div>
    <div className="space-y-[1%]">
      <div className="text-lg md:text-base text-gray-500 font-light">{CONTACTS.email.caption}</div>
      <div className="font-medium text-gray-900 text-lg md:text-base break-all">{CONTACTS.email.value}</div>
    </div>
  </div>
);

const AccordionSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full flex justify-between items-center py-[3%] px-[2%] focus:outline-none"
      onClick={onToggle}
    >
      <span className="font-semibold text-gray-900 text-xl">{title}</span>
      <svg
        className={`w-[5%] h-[5%] transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[50vh] py-[2%]' : 'max-h-0 py-0'}`}>
      <div className="px-[2%] pb-[3%]">{children}</div>
    </div>
  </div>
);

const Footer = memo(() => {
  const [openSection, setOpenSection] = useState('company');

  // Мемоизируем обработчик для стабильности
  const toggleSection = useCallback((section) => {
    setOpenSection(prev => prev === section ? null : section);
  }, []);

  // Мемоизируем обработчики для каждой секции
  const handleLinksToggle = useCallback(() => {
    toggleSection('links');
  }, [toggleSection]);

  const handleContactsToggle = useCallback(() => {
    toggleSection('contacts');
  }, [toggleSection]);

  return (
    <footer className="w-full bg-white border-t border-gray-300">
      <div className="w-full max-w-7xl mx-auto px-[5%] py-[6%]">
        
        {/* Мобильная версия (до md) */}
        <div className="block md:hidden">
          <CompanyInfo className="mb-[4%]" />
          <div className="space-y-[2%]">
            <AccordionSection title="Быстрые ссылки" isOpen={openSection === 'links'} onToggle={handleLinksToggle}>
              <LinksList />
            </AccordionSection>
            <AccordionSection title="Контакты" isOpen={openSection === 'contacts'} onToggle={handleContactsToggle}>
              <ContactsBlock />
            </AccordionSection>
          </div>
        </div>

        {/* Десктопная версия (md и выше) */}
        <div className="hidden md:grid grid-cols-3 gap-[8%]">
          <CompanyInfo />
          <div className="space-y-[4%]">
            <h3 className="font-semibold text-gray-900 text-lg md:text-lg">Быстрые ссылки</h3>
            <LinksList />
          </div>
          <div className="space-y-[4%]">
            <h3 className="font-semibold text-gray-900 text-lg md:text-lg">Контакты</h3>
            <ContactsBlock />
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
});

export default Footer;