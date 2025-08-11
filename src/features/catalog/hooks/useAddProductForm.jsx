import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProductApi } from '../api/catalog';
import { useNotificationStore } from '../../../shared/store/notificationStore';

export const useAddProductForm = (onClose) => {
  const client = useQueryClient();
  const { showWithTimeout } = useNotificationStore();
  
  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: {
      category: '',
      brand: '',
      model: '',
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
      
      // Показываем success через store
      showWithTimeout('Товар успешно добавлен!', 'success', 3000);
    },
    onError: (error) => {
      console.error('Ошибка при добавлении товара:', error);
      
      // Показываем error через store
      showWithTimeout('Не удалось добавить товар', 'error', 5000);
    }
  });

  const onSubmit = async (data) => {
    console.log('Добавляем товар:', data);
    mutation.mutate(data);
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formState,
    mutation
  };
};