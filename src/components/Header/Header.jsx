import React, { useState } from 'react';
import TopBar from './TopBar/TopBar';
import Logo from './Logo/Logo';
import SearchBar from './SearchBar/SearchBar';
import UserMenu from './UserMenu/UserMenu';
import CartIcon from './CartIcon/CartIcon';
import Navigation from './Navigation/Navigation';
import PromoInfo from './PromoInfo/PromoInfo';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <TopBar />

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <button
              onClick={handleSearchToggle}
              className="md:hidden text-gray-600 hover:text-blue-600"
            >
              🔍
            </button>

            {/* User Menu */}
            <UserMenu />

            {/* Cart */}
            <CartIcon itemCount={3} />

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden mt-4">
            <SearchBar placeholder="Поиск..." />
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Desktop Navigation */}
            <Navigation />

            {/* Promo Info */}
            <PromoInfo />
          </div>

          {/* Mobile Menu */}
          <MobileMenu 
            isOpen={isMenuOpen}
            onClose={handleMenuClose}
            onSearchToggle={handleSearchToggle}
            isSearchOpen={isSearchOpen}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
