import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Navigation from '../Navigation/Navigation';

const MobileMenu = ({ isOpen, onClose, onSearchToggle, isSearchOpen }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden mt-4">
          <SearchBar placeholder="Поиск..." />
        </div>
      )}
      
      {/* Mobile Navigation */}
      <Navigation isMobile={true} onItemClick={onClose} />
    </>
  );
};

export default MobileMenu; 