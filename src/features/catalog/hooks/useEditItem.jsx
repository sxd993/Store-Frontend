import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { EditProductApi } from '../../../shared/api/catalog.jsx';

export const useEditItem = (item, onClose) => {
    const client = useQueryClient();
    const formMethods = useForm({
        mode: 'onChange',
        defaultValues: {
            name: item.name || '',
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
        },
        onError: (error) => {
            console.error('Ошибка при изменении товара:', error);
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
}