import React from 'react';
import { RegisterForm } from '../../components/Auth/RegisterForm/RegisterForm.jsx';

export const RegisterPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};