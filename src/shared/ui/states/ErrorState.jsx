export const ErrorState = ({ error }) => (
    <div className="text-center py-16">
        <p className="text-lg text-gray-600 font-light mb-4">Ошибка</p>
        <p className="text-sm text-gray-500 font-light">{error.message}</p>
    </div>
);