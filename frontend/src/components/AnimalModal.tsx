import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createAnimalSchema, type CreateAnimalForm } from '../lib/schemas';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';
import type { Animal } from '../types';

const PET_OPTIONS = [
  { value: 'CAT', label: 'Gato' },
  { value: 'DOG', label: 'Cachorro' },
];

interface AnimalModalProps {
  animal?: Animal | null;
  onClose: () => void;
  onSuccess: () => void;
  onSubmitForm: (data: CreateAnimalForm) => Promise<void>;
  error?: string | null;
}

export function AnimalModal({
  animal,
  onClose,
  onSuccess,
  onSubmitForm,
  error,
}: AnimalModalProps) {
  const isEdit = !!animal;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateAnimalForm>({
    resolver: zodResolver(createAnimalSchema),
    defaultValues: animal
      ? {
          name: animal.name,
          age: animal.age,
          type: animal.type,
          race: animal.race,
        }
      : {
          name: '',
          age: '',
          type: undefined,
          race: '',
        },
  });

  const onSubmit = async (data: CreateAnimalForm) => {
    await onSubmitForm(data);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface border border-white/10 rounded-3xl shadow-glow max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="inline-block px-5 py-2 rounded-full bg-primary-500 text-white text-sm font-medium mb-6">
            {isEdit ? 'Editar animal' : 'Novo animal'}
          </div>
          <h2 className="text-xl font-bold text-white mb-6">
            {isEdit ? 'Editar animal' : 'Cadastrar animal'}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome do animal"
              placeholder="Ex: Rex"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Idade"
              placeholder="Ex: 2 anos"
              error={errors.age?.message}
              {...register('age')}
            />
            <Select
              label="Tipo"
              options={PET_OPTIONS}
              error={errors.type?.message}
              {...register('type')}
            />
            <Input
              label="Raça"
              placeholder="Ex: Golden Retriever"
              error={errors.race?.message}
              {...register('race')}
            />

            {error && (
              <p className="text-sm text-red-300 bg-red-500/20 px-3 py-2 rounded-xl border border-red-500/30">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" isLoading={isSubmitting} className="flex-1">
                {isEdit ? 'Salvar' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
