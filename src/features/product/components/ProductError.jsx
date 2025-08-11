import { Link } from 'react-router-dom';

export const ProductError = ({ error }) => (
  <section className="py-16 bg-white border-b border-gray-100">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <Link to="/catalog" className="text-gray-500 hover:text-gray-900 transition-colors duration-300 font-light">
            ← Назад к каталогу
          </Link>
        </div>
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-6">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-5xl font-light text-gray-900 mb-4">
          Ошибка загрузки
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {error?.message || 'Произошла ошибка при загрузке товара'}
        </p>
      </div>
    </div>
  </section>
);