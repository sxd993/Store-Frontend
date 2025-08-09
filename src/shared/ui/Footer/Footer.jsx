import React, { useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Icons/HeaderIcons';

// Constants for reusability
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

// Reusable components
const CompanyInfo = ({ className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <div className="flex items-center justify-center gap-2">
      <Logo />
    </div>
    <p className="text-gray-500 text-base md:text-base leading-relaxed">
      {COMPANY_DESCRIPTION}
    </p>
  </div>
);

const LinksList = () => (
  <nav className="space-y-4">
    {QUICK_LINKS.map((item) => (
      <Link
        key={item.to}
        to={item.to}
        className="block text-gray-600 hover:text-gray-900 transition-colors duration-200 text-lg md:text-base"
      >
        {item.label}
      </Link>
    ))}
  </nav>
);

const ContactsBlock = () => (
  <div className="space-y-4">
    <div className="space-y-1">
      <div className="text-sm text-gray-500">{CONTACTS.phone.caption}</div>
      <div className="text-base md:text-base text-gray-900 font-medium">{CONTACTS.phone.value}</div>
    </div>
    <div className="space-y-1">
      <div className="text-sm text-gray-500">{CONTACTS.email.caption}</div>
      <div className="text-base md:text-base text-gray-900 font-medium break-words">{CONTACTS.email.value}</div>
    </div>
  </div>
);

const AccordionSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full flex justify-center items-center py-4 px-3 focus:outline-none relative"
      onClick={onToggle}
    >
      <span className="font-semibold text-gray-900 text-xl md:text-lg">{title}</span>
      <svg
        className={`w-5 h-5 transform transition-transform duration-300 absolute right-3 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 py-3' : 'max-h-0'}`}>
      <div className="px-3">{children}</div>
    </div>
  </div>
);

const Footer = memo(() => {
  const [openSection, setOpenSection] = useState('company');

  const toggleSection = useCallback((section) => {
    setOpenSection(prev => prev === section ? null : section);
  }, []);

  const handleLinksToggle = useCallback(() => toggleSection('links'), [toggleSection]);
  const handleContactsToggle = useCallback(() => toggleSection('contacts'), [toggleSection]);

  return (
    <footer className="w-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Mobile version (below md) */}
        <div className="block md:hidden text-center">
          <CompanyInfo className="mb-6" />
          <div className="space-y-2">
            <AccordionSection title="Быстрые ссылки" isOpen={openSection === 'links'} onToggle={handleLinksToggle}>
              <LinksList />
            </AccordionSection>
            <AccordionSection title="Контакты" isOpen={openSection === 'contacts'} onToggle={handleContactsToggle}>
              <ContactsBlock />
            </AccordionSection>
          </div>
        </div>

        {/* Tablet and desktop version (md and above) */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-8 md:text-center">
          <div className="space-y-4">
            <CompanyInfo />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Быстрые ссылки</h3>
            <LinksList />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Контакты</h3>
            <ContactsBlock />
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;