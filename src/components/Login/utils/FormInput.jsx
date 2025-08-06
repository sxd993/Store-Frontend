export const FormInput = ({ 
  id, 
  type, 
  label, 
  placeholder, 
  register, 
  error, 
  ...props 
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register}
      className={`w-full px-4 py-3 border transition-colors duration-300 ${
        error 
          ? 'border-red-500 focus:border-red-500' 
          : 'border-gray-200 focus:border-gray-900'
      } focus:outline-none`}
      placeholder={placeholder}
      {...props}
    />
    {error && (
      <p className="mt-1 text-sm text-red-600">{error.message}</p>
    )}
  </div>
);
