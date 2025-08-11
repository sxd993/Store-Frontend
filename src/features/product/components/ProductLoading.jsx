import { Link } from 'react-router-dom';

export const ProductLoading = () => (
  <section className="py-16 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
            ← Назад к каталогу
          </Link>
        </div>
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
);