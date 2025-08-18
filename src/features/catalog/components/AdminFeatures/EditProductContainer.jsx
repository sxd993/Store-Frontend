import { useState } from "react";
import { useEditItem } from '../../hooks/Catalog/useEditItem';
import { EditItem } from '../../ui/AdminFeatures/EditItem';

export const EditProductContainer = ({ item, onClose }) => {
    const [images, setImages] = useState(item?.images?.map(img => img.url || img) || []);
    const {
        handleSubmit,
        register,
        formState,
        mutation
    } = useEditItem(item, onClose, images);

    const handleImagesChange = (newImages) => {
        setImages(newImages);
    };

    return (
        <EditItem
            item={item}
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