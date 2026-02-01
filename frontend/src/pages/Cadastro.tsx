import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserSchema, type CreateUserForm } from '../lib/schemas';
import { userApi } from '../api/user';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';

export function Cadastro() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      contact: '',
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    setApiError(null);
    try {
      await userApi.create(data);
      navigate('/login');
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string | string[] } } })
              .response?.data?.message
          : null;
      setApiError(
        Array.isArray(msg) ? msg.join(', ') : msg ?? 'Erro ao cadastrar. Tente novamente.'
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 font-sans bg-pattern relative">
      <p className="absolute top-6 left-6 text-lg font-bold text-white/90 tracking-tight">
        Pet Shop
      </p>
      <div className="w-full max-w-md">
        <div className="bg-surface border border-white/10 rounded-3xl shadow-glow p-6 sm:p-8">
          <div className="inline-block px-5 py-2 rounded-full bg-primary-500 text-white text-sm font-medium mb-4">
            Cadastro
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Criar conta
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome"
              placeholder="Seu nome"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              label="Senha"
              placeholder="Mínimo 6 caracteres"
              error={errors.password?.message}
              {...register('password')}
            />
            <Input
              label="Contato"
              placeholder="Telefone ou outro contato"
              error={errors.contact?.message}
              {...register('contact')}
            />

            {apiError && (
              <p className="text-sm text-red-300 bg-red-500/20 px-3 py-2 rounded-xl border border-red-500/30">
                {apiError}
              </p>
            )}

            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              className="mt-2"
            >
              Cadastrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Já tem conta?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-300 hover:text-accent-bright transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
