import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddProductApi } from '../../api/catalog';
import { useNotificationStore } from '../../../../shared/store/notificationStore';

export const useAddProductForm = (onClose, images) => {
  const client = useQueryClient();
  const { showWithTimeout } = useNotificationStore();
  
  const { handleSubmit, register, formState, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      category: '',
      brand: '',
      model: '',
      price: '',
      stock_quantity: '',
      color: '',
      memory: '',
      description: ''
    }
  });

  const mutation = useMutation({
    mutationFn: AddProductApi,
    onSuccess: () => {
      client.invalidateQueries(['catalog']);
      reset();
      onClose();
      showWithTimeout('Товар успешно добавлен!', 'success', 3000);
    },
    onError: (error) => {
      console.error('Ошибка при добавлении товара:', error);
      showWithTimeout('Не удалось добавить товар', 'error', 5000);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...data, images });
  };

  return {
    handleSubmit: handleSubmit(onSubmit),
    register,
    formState,
    mutation
  };
};