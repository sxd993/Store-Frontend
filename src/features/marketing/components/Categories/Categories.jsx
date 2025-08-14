import { categories } from '../../utils/categories';
import { CategoryCard } from './CategoryCard'

const Categories = () => {
  return (
    <section className="py-15 border-b border-gray-100">
      <div className="container mx-auto px-4">

        {/* Заголовок в стиле BestOffers */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
            Категории товаров
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-5">
            Найдите всё, что вам нужно, в удобной навигации по категориям
          </p>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
