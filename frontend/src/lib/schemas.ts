import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  contact: z.string().min(1, 'Contato é obrigatório'),
});

export const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const petTypeSchema = z.enum(['CAT', 'DOG'], {
  errorMap: () => ({ message: 'Selecione Gato ou Cachorro' }),
});

export const createAnimalSchema = z.object({
  name: z.string().min(1, 'Nome do animal é obrigatório'),
  age: z.string().min(1, 'Idade é obrigatória'),
  type: petTypeSchema,
  race: z.string().min(1, 'Raça é obrigatória'),
});

export const updateAnimalSchema = createAnimalSchema.partial();

export type CreateUserForm = z.infer<typeof createUserSchema>;
export type SignInForm = z.infer<typeof signInSchema>;
export type CreateAnimalForm = z.infer<typeof createAnimalSchema>;
export type UpdateAnimalForm = z.infer<typeof updateAnimalSchema>;
