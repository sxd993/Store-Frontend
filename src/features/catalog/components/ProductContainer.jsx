import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProductApi } from '../api/ProductApi';
import { ProductImageGallery } from '../ui/Product/ProductImageGallery';
import { ProductLoading } from '../ui/Product/states/ProductLoading';
import { ProductError } from '../ui/Product/states/ProductError';
import { getProductImages, getProductDisplayName, getProductSpecs } from '../utils/productUtils';
import { formatPrice } from '../../../shared/utils/formatPrice';

export const ProductContainer = () => {
    const { id } = useParams();

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => ProductApi(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });

    if (isLoading) {
        return <ProductLoading />;
    }

    if (error) {
        return <ProductError error={error} />;
    }

    if (!product) {
        return <ProductError error={{ message: 'Товар не найден' }} />;
    }

    // Получаем данные для отображения
    const productImages = getProductImages(product);
    const displayName = getProductDisplayName(product);
    const productSpecs = getProductSpecs(product);
    const formattedPrice = formatPrice(product.price);

    return (
        <section className="py-16 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Навигация */}
                    <div className="mb-8">
                        <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
                            ← Назад к каталогу
                        </Link>
                    </div>

                    {/* Основной контент */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Галерея изображений */}
                        <div className="flex justify-center">
                            <ProductImageGallery
                                images={productImages}
                                productName={displayName}
                            />
                        </div>

                        {/* Информация о товаре */}
                        <div className="space-y-8">
                            {/* Основная информация */}
                            <div>
                                <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
                                    {displayName}
                                </h1>
                                <div className="text-2xl md:text-3xl font-light text-gray-900 mb-6">
                                    {formattedPrice}
                                </div>

                                {/* Характеристики */}
                                {productSpecs.length > 0 && (
                                    <div className="space-y-3 mb-8">
                                        {productSpecs.map((spec, index) => (
                                            <div key={index} className="flex justify-between py-2 border-b border-gray-100">
                                                <span className="text-gray-600 font-light">{spec.label}:</span>
                                                <span className="text-gray-900 font-medium">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Описание */}
                            {product.description && (
                                <div className="prose prose-gray max-w-none">
                                    <h3 className="text-lg font-light text-gray-900 mb-4">Описание</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Действия */}
                            <div className="space-y-4">
                                <button
                                    className="w-full bg-gray-900 text-white py-4 px-8 hover:bg-gray-800 transition-colors duration-300 font-light text-lg"
                                    disabled={!product.stock_quantity || product.stock_quantity === 0}
                                >
                                    {product.stock_quantity > 0 ? 'Добавить в корзину' : 'Нет в наличии'}
                                </button>

                                <div className="text-center text-sm text-gray-500 font-light">
                                    {product.stock_quantity > 0 ?
                                        `В наличии: ${product.stock_quantity} шт.` :
                                        'Товар закончился'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};