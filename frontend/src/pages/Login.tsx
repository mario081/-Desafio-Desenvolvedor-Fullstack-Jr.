import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { signInSchema, type SignInForm } from '../lib/schemas';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [apiError, setApiError] = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInForm) => {
    setApiError(null);
    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const res = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { data?: { message?: string }; status?: number } }).response
        : null;
      if (res?.status === 401 || res?.status === 404) {
        setApiError('E-mail ou senha inválidos.');
      } else {
        const msg = res?.data?.message;
        setApiError(
          typeof msg === 'string' ? msg : 'Erro ao entrar. Tente novamente.'
        );
      }
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
            Acesso
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Entrar
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <PasswordInput
              label="Senha"
              placeholder="Sua senha"
              error={errors.password?.message}
              {...register('password')}
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
              Entrar
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/70">
            Não tem conta?{' '}
            <Link
              to="/cadastro"
              className="font-medium text-primary-300 hover:text-accent-bright transition-colors"
            >
              Cadastrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
