import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProductApi } from '../../api/Catalog/CatalogApi';

export const useAddProductForm = (onClose) => {
  const client = useQueryClient();
  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      price: '',
      stock_quantity: '',
      color: '',
      memory: '',
      image: '',
      description: ''
    }
  });

  const { handleSubmit, register, formState, reset } = formMethods;

  const mutation = useMutation({
    mutationFn: AddProductApi,
    onSuccess: (data) => {
      console.log('Товар успешно добавлен:', data);
      client.invalidateQueries(['catalog']);
      reset();
      onClose();
    },
    onError: (error) => {
      console.error('Ошибка при добавлении товара:', error);
    }
  });

  const onSubmit = async (data) => {
    console.log(data);
    mutation.mutate(data);
  }

  return { 
    handleSubmit: handleSubmit(onSubmit), 
    register, 
    formState, 
    mutation 
  };
};