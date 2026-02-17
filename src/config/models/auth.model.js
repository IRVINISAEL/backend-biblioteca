import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const CreateUserSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  nombre_completo: z
    .string()
    .min(1, 'El nombre completo es requerido')
    .max(255),
  rol: z.enum(['admin', 'bibliotecario'], {
    errorMap: () => ({ message: 'El rol debe ser admin o bibliotecario' })
  })
});