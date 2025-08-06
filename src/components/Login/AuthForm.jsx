import { Link } from 'react-router-dom';
import { FormInput } from './utils/FormInput';
import { FormToggle } from './utils/FormToggle';
import { SubmitButton } from './utils/SubmitButton';
import { validationRules } from '../../utils/Login/validationRules';

export const AuthForm = ({ 
  isLogin, 
  switchForm, 
  onSubmit, 
  formMethods 
}) => {
  const { register, formState: { errors, isSubmitting } } = formMethods;

  return (
    <div className="max-w-md mx-auto lg:mx-0">
      <FormToggle isLogin={isLogin} onToggle={switchForm} />
      
      <form onSubmit={onSubmit} className="space-y-5">
        {!isLogin && (
          <FormInput
            id="name"
            type="text"
            label="Имя"
            placeholder="Ваше имя"
            register={register('name', validationRules.name(!isLogin))}
            error={errors.name}
          />
        )}

        <FormInput
          id="email"
          type="email"
          label="Email"
          placeholder="your@email.com"
          register={register('email', validationRules.email)}
          error={errors.email}
        />

        <FormInput
          id="password"
          type="password"
          label="Пароль"
          placeholder="••••••••"
          register={register('password', validationRules.password(isLogin))}
          error={errors.password}
        />

        {isLogin && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <Link to="/forgot-password" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
              Забыли пароль?
            </Link>
          </div>
        )}

        <SubmitButton isSubmitting={isSubmitting} isLogin={isLogin} />
      </form>
    </div>
  );
};