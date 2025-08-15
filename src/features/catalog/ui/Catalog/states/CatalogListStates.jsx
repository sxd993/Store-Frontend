import { memo } from "react";

export const LoadingState = memo(() => (
    <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 font-light">Загрузка товаров...</p>
    </div>
));

export const ErrorState = memo(({ error }) => (
    <div className="text-center py-16">
        <p className="text-lg text-gray-600 font-light mb-4">Ошибка загрузки товаров</p>
        <p className="text-sm text-gray-500 font-light">{error.message}</p>
    </div>
));

export const EmptyState = memo(() => (
    <div className="text-center py-16">
        <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-4 text-lg font-light text-gray-900">Товары не найдены</h3>
        <p className="mt-2 text-gray-500 font-light">Попробуйте изменить параметры поиска</p>
    </div>
));