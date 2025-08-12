import { useState } from 'react';

export const useProductEdit = (product, index, onProductChange) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newProductId, setNewProductId] = useState('');

  const handleStartEdit = () => {
    setIsEditing(true);
    setNewProductId(product?.id?.toString() || '');
  };

  const handleSave = () => {
    if (!newProductId.trim()) return;
    
    const id = parseInt(newProductId);
    if (isNaN(id)) {
      alert('Введите корректный ID товара');
      return;
    }

    onProductChange(index, id);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewProductId('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return {
    isEditing,
    newProductId,
    setNewProductId,
    handleStartEdit,
    handleSave,
    handleCancel,
    handleKeyPress
  };
};