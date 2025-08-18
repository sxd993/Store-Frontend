export const AddProductButton = ({ onClick }) => {
    return (
      <div className="w-full mb-6">
        <div className="flex justify-center">
          <div className="w-full max-w-[150px]">
            <button
              onClick={onClick}
              className="w-full border border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white font-light transition-colors duration-300 text-center rounded-2xl py-2.5"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-light">Добавить товар</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  };