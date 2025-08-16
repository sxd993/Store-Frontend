import { createCatalogUrl } from '../../utils/categories'
import { Link } from 'react-router-dom';

export const CategoryCard = ({ category }) => {
    const catalogUrl = createCatalogUrl(category.filterParams);

    return (
        <Link to={catalogUrl} className="group block h-full">
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden h-full flex flex-col hover:border-gray-400 transition-colors duration-300 text-center">
                
                {/* Изображение в стиле BestOffers */}
                <div className="relative h-80 flex-shrink-0 overflow-hidden">
                    <img
                        src={category.image}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover m-0 group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>

                {/* Контент в стиле BestOffers */}
                <div className="pt-4 pr-4 pb-4 pl-4 flex flex-col flex-1 items-center justify-center">
                    <div className="flex items-center gap-2 text-base text-gray-900 group-hover:text-gray-700 transition-colors">
                        <h3 className="font-medium line-clamp-2 text-center">
                            {category.name}
                        </h3>
                        <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};
