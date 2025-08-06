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
  const baseClass = "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none";
  const errorClass = error ? "border-red-500" : "";
  
  return (
    <div>
      {type === "textarea" ? (
        <textarea
          {...register(name, validation)}
          rows={rows || 3}
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
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};