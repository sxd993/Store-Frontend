export const RadioFilter = ({ title, options, selectedValue, onChange }) => (
  <div className="mb-8">
    <h4 className="text-sm font-light text-gray-900 mb-4">{title}</h4>
    <div className="space-y-3">
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name={title.toLowerCase()}
          value="all"
          checked={selectedValue === "all"}
          onChange={(e) => onChange(e.target.value)}
          className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
        />
        <span className="ml-3 text-sm text-gray-700 font-light">Все цвета</span>
      </label>
      {options.map((option) => (
        <label key={option} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={title.toLowerCase()}
            value={option}
            checked={selectedValue === option}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 text-gray-900 border-gray-300 focus:ring-gray-900"
          />
          <span className="ml-3 text-sm text-gray-700 font-light">{option}</span>
        </label>
      ))}
    </div>
  </div>
);