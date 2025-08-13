import { createCatalogUrl } from '../../utils/categories'
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
    const catalogUrl = createCatalogUrl(category.filterParams);

    return (
        <Link to={catalogUrl} className="group block h-full">
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">

                {/* Изображение с анимацией увеличения */}
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading="lazy"
                    />
                </div>

                {/* Контент */}
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex-shrink-0 text-gray-500 group-hover:text-indigo-500 transition-colors duration-300">
                            {category.icon}
                        </div>
                        <h3 className="font-medium text-lg text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                            {category.name}
                        </h3>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 group-hover:text-indigo-500 transition-colors">
                            <span className="font-medium">Перейти</span>
                            <svg
                                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
