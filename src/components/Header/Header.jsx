import React, { useState } from 'react';
import Logo from './Logo/Logo';
import UserMenu from './UserMenu/UserMenu';
import CartIcon from './CartIcon/CartIcon';
import FavoritesIcon from './FavoritesIcon/FaforitesIcon';  
import Navigation from './Navigation/Navigation';
import MobileMenu from './MobileMenu/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Navigation />
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-6">
            {/* Desktop Elements */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Favorites */}
              <FavoritesIcon />
              
              {/* User Menu */}
              <UserMenu />

              {/* Cart */}
              <CartIcon itemCount={3} />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMenuToggle}
              className="md:hidden text-gray-900 hover:text-gray-700 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
      />
    </header>
  );
};

export default Header;
