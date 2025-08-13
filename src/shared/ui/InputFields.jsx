export const InputField = ({ 
  register, 
  name, 
  type = "text", 
  placeholder, 
  validation, 
  error,
  step,
  rows 
}) => {
  const baseClass = "w-full px-4 py-2 border border-gray-200 bg-white text-gray-900 placeholder-gray-500 font-light focus:outline-none transition-colors duration-300 rounded-2xl";
  const errorClass = error ? "border-red-300" : "";
  
  return (
    <div className="space-y-2">
      {type === "textarea" ? (
        <textarea
          {...register(name, validation)}
          rows={rows || 4}
          placeholder={placeholder}
          className={`${baseClass} ${errorClass} resize-none`}
        />
      ) : (
        <input
          {...register(name, validation)}
          type={type}
          step={step}
          placeholder={placeholder}
          className={`${baseClass} ${errorClass}`}
        />
      )}
      
      {error && (
        <p className="text-red-600 text-sm font-light">{error.message}</p>
      )}
    </div>
  );
};