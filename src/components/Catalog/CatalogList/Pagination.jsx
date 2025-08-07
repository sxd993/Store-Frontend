export const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 5 
}) => {
  // Если страница всего одна, не показываем пагинацию
  if (totalPages <= 1) {
    return null;
  }

  // Генерируем массив видимых страниц
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);
    
    // Корректируем начало если достигли конца
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 font-light hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        aria-label="Предыдущая страница"
      >
        ←
      </button>

      {/* Первая страница и многоточие */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
          >
            1
          </button>
          {visiblePages[0] > 2 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}
        </>
      )}

      {/* Видимые страницы */}
      {visiblePages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 border-2 font-light transition-colors duration-300 ${
            currentPage === page
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label={`Страница ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {/* Последняя страница и многоточие */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="px-2 py-2 text-gray-500">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-light transition-colors duration-300"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Кнопка "Вперед" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="px-4 py-2 border-2 border-gray-200 bg-white text-gray-700 font-light hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        aria-label="Следующая страница"
      >
        →
      </button>
    </div>
  );
};