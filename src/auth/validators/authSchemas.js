import { z } from 'zod';

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Неверный формат email'),
    
  password: z
    .string()
    .min(6, 'Пароль должен содержать минимум 6 символов')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать заглавные, строчные буквы и цифры'),
    
  confirmPassword: z
    .string()
    .min(1, 'Подтвердите пароль'),
    
  phone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]{10,20}$/, 'Неверный формат телефона')
    .optional()
    .or(z.literal(''))
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email обязателен')
    .email('Неверный формат email'),
    
  password: z
    .string()
    .min(1, 'Пароль обязателен')
});