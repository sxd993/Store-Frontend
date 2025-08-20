export const UserInfo = ({ user }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8">
      <h2 className="text-2xl font-light text-gray-900 mb-6">Общая информация</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-light text-gray-600">Имя</label>
          <div className="mt-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
            {user.name}
          </div>
        </div>
        <div>
          <label className="text-sm font-light text-gray-600">Телефон</label>
          <div className="mt-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
            {user.phone}
          </div>
        </div>
      </div>
    </div>
  );
};