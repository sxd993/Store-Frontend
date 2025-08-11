import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { EditProductApi } from '../api/catalog';
import { useNotificationStore } from '../../../shared/store/notificationStore';

export const useEditItem = (item, onClose, images) => {
    const client = useQueryClient();
    const { showWithTimeout } = useNotificationStore();
    
    const { handleSubmit, register, formState, reset } = useForm({
        mode: 'onChange',
        defaultValues: {
            brand: item?.brand || '',
            model: item?.model || '',
            category: item?.category || '',
            price: item?.price || '',
            stock_quantity: item?.stock_quantity || '',
            color: item?.color || '',
            memory: item?.memory || '',
            description: item?.description || ''
        }
    });
    
    const mutation = useMutation({
        mutationFn: (data) => EditProductApi(item.id, data),
        onSuccess: () => {
            client.invalidateQueries(['catalog']);
            reset();
            onClose();
            showWithTimeout('Товар успешно обновлен!', 'success', 3000);
        },
        onError: (error) => {
            console.error('Ошибка при изменении товара:', error);
            showWithTimeout('Не удалось обновить товар', 'error', 5000);
        }
    });
    
    const onSubmit = (data) => {
        mutation.mutate({ ...data, images });
    }

    return {
        handleSubmit: handleSubmit(onSubmit),
        register,
        formState,
        mutation
    };
};