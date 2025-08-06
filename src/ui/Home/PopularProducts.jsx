const AddToCartButton = ({ onClick, isLoading, isDisabled }) => (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`p-3 rounded-full border transition-all duration-300 ${
        isLoading 
          ? 'bg-green-50 border-green-200 text-green-600' 
          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-400 hover:text-gray-600'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title="Добавить в корзину"
    >
      {isLoading ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )}
    </button>
  );