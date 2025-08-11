import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { EditProductApi } from '../api/catalog';
import { useNotificationStore } from '../../../shared/store/notificationStore';

export const useEditItem = (item, onClose) => {
    const client = useQueryClient();
    const { showWithTimeout } = useNotificationStore();
    
    const formMethods = useForm({
        mode: 'onChange',
        defaultValues: {
            brand: item.brand || '',
            model: item.model || '',
            category: item.category || '',
            price: item.price || '',
            stock_quantity: item.stock_quantity || '',
            color: item.color || '',
            memory: item.memory || '',
            image: item.image || '',
            description: item.description || ''
        }
    });
    
    const { handleSubmit, register, formState, reset } = formMethods;
    
    const mutation = useMutation({
        mutationFn: (data) => EditProductApi(item.id, data),
        onSuccess: (data) => {
            console.log('Товар успешно изменен:', data);
            client.invalidateQueries(['catalog']);
            reset();
            onClose();
            showWithTimeout('Товар успешно обновлен!', 'success', 3000);
        },
        onError: (error) => {
            console.error('Ошибка при изменении товара:', error);
            
            // Показываем error через store
            showWithTimeout('Не удалось обновить товар', 'error', 5000);
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