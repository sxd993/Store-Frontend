import { useState } from 'react';

export const ImageManager = ({ images, onChange }) => {
    const [newImageUrl, setNewImageUrl] = useState('');
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleAddImage = () => {
        if (newImageUrl.trim()) {
            onChange([...images, newImageUrl.trim()]);
            setNewImageUrl('');
        }
    };

    const handleRemoveImage = (index) => {
        onChange(images.filter((_, i) => i !== index));
    };

    const handleReorderImages = (fromIndex, toIndex) => {
        const updatedImages = [...images];
        const [movedImage] = updatedImages.splice(fromIndex, 1);
        updatedImages.splice(toIndex, 0, movedImage);
        onChange(updatedImages);
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedIndex !== null && draggedIndex !== dropIndex) {
            handleReorderImages(draggedIndex, dropIndex);
        }
        setDraggedIndex(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddImage();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Вставьте URL изображения"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={handleAddImage}
                    disabled={!newImageUrl.trim()}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Добавить
                </button>
            </div>

            {images.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Изображения ({images.length}/20) - первое изображение будет главным
                    </p>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {images.map((url, index) => (
                            <div
                                key={index}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, index)}
                                className={`
                  flex items-center gap-3 p-3 border rounded-lg bg-white cursor-move
                  ${draggedIndex === index ? 'opacity-50' : ''}
                  ${index === 0 ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}
                `}
                            >
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                </svg>

                                <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={url}
                                        alt={`Изображение ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtMTIgMzZoMjR2LTI0aC0yNHoiIGZpbGw9IiNmM2Y0ZjYiLz48cGF0aCBkPSJtMTYgMjBoOGwtNCw4eiIgZmlsbD0iIzllYTNhOCIvPjwvc3ZnPg==';
                                        }}
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 truncate">
                                        {index === 0 && <span className="text-blue-600 font-medium">Главное: </span>}
                                        {url}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {images.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-500">Добавьте изображения для товара</p>
                </div>
            )}
        </div>
    );
};