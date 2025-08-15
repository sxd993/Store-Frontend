import { useState } from 'react';
import { useAddProductForm } from '../hooks/useAddProductForm';
import { AddProductForm } from '../ui/AdminFeatures/AddProductForm';

export const AddProductContainer = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const { handleSubmit, register, formState, mutation } = useAddProductForm(onClose, images);

  const handleImagesChange = (newImages) => {
    setImages(newImages);
  };

  const onSubmit = (data) => {
    handleSubmit({ ...data, images });
  };

  return (
    <AddProductForm
      onClose={onClose}
      images={images}
      onImagesChange={handleImagesChange}
      onSubmit={handleSubmit}
      register={register}
      formState={formState}
      isLoading={mutation.isLoading}
      error={mutation.error}
    />
  );
};