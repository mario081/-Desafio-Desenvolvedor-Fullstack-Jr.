import { useCallback, useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { AnimalModal } from '../components/AnimalModal';
import { AnimalDetailModal } from '../components/AnimalDetailModal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { animalApi } from '../api/animal';
import { getCurrentUserId } from '../lib/auth';
import type { Animal } from '../types';
import type { CreateAnimalForm } from '../lib/schemas';

function filterAnimals(animals: Animal[], query: string): Animal[] {
  if (!query.trim()) return animals;
  const q = query.trim().toLowerCase();
  return animals.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.user.name.toLowerCase().includes(q)
  );
}

export function Home() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);
  const [detailAnimal, setDetailAnimal] = useState<Animal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchAnimals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await animalApi.list();
      setAnimals(data);
    } catch {
      setError('Erro ao carregar animais.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnimals();
  }, [fetchAnimals]);

  const filteredAnimals = filterAnimals(animals, search);
  const currentUserId = getCurrentUserId();
  const canEditAnimal = (animal: Animal) => currentUserId && animal.userId === currentUserId;

  const openCreate = () => {
    setEditingAnimal(null);
    setActionError(null);
    setModalOpen(true);
  };

  const openEdit = (animal: Animal) => {
    setEditingAnimal(animal);
    setActionError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingAnimal(null);
    setActionError(null);
  };

  const openDetail = (animal: Animal) => {
    setDetailAnimal(animal);
  };

  const closeDetail = () => {
    setDetailAnimal(null);
  };

  const handleCreate = async (data: CreateAnimalForm) => {
    setActionError(null);
    await animalApi.create(data);
    await fetchAnimals();
  };

  const handleUpdate = async (data: CreateAnimalForm) => {
    if (!editingAnimal) return;
    setActionError(null);
    await animalApi.update(editingAnimal.id, data);
    await fetchAnimals();
  };

  const handleDelete = async (animal: Animal) => {
    if (!window.confirm(`Excluir "${animal.name}"?`)) return;
    setActionError(null);
    try {
      await animalApi.remove(animal.id);
      await fetchAnimals();
    } catch (err: unknown) {
      const res = err && typeof err === 'object' && 'response' in err
        ? (err as { response?: { status?: number; data?: { message?: string } } }).response
        : null;
      if (res?.status === 403) {
        setActionError('Você não pode excluir animais de outros usuários.');
      } else if (res?.status === 404) {
        setActionError('Animal não encontrado.');
      } else {
        setActionError(res?.data?.message ?? 'Erro ao excluir.');
      }
    }
  };

  const onSubmitForm = editingAnimal
    ? (data: CreateAnimalForm) => handleUpdate(data)
    : (data: CreateAnimalForm) => handleCreate(data);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-block px-5 py-2 rounded-full bg-primary-500 text-white text-sm font-medium mb-2">
              Dashboard
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Animais cadastrados
            </h1>
          </div>
          <Button type="button" onClick={openCreate} className="shrink-0">
            Novo animal
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Buscar por nome do animal ou do dono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
        </div>

        {actionError && (
          <p className="text-sm text-red-300 bg-red-500/20 px-4 py-2 rounded-xl border border-red-500/30">
            {actionError}
          </p>
        )}

        {error && (
          <p className="text-sm text-red-300 bg-red-500/20 px-4 py-2 rounded-xl border border-red-500/30">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
          </div>
        ) : filteredAnimals.length === 0 ? (
          <div className="bg-surface border border-white/10 rounded-3xl p-8 sm:p-12 text-center text-white/70 shadow-card">
            {search.trim()
              ? 'Nenhum animal encontrado para essa busca.'
              : 'Nenhum animal cadastrado. Cadastre o primeiro!'}
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAnimals.map((animal) => (
              <li
                key={animal.id}
                className="bg-surface border border-white/10 rounded-3xl p-5 shadow-card hover:shadow-glow hover:border-white/20 transition-all duration-200 cursor-pointer"
                onClick={() => openDetail(animal)}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-3 py-1.5 rounded-full bg-primary-500/80 text-white text-xs font-medium mb-2">
                      {animal.type === 'DOG' ? 'Cachorro' : 'Gato'}
                    </span>
                    <p className="font-semibold text-white text-lg truncate">
                      {animal.name}
                    </p>
                    <p className="text-sm text-white/70 mt-0.5">
                      {animal.race} · {animal.age}
                    </p>
                    <p className="text-sm text-white/60 mt-2 pt-2 border-t border-white/10">
                      Dono: {animal.user.name}
                    </p>
                    <p className="text-sm text-white/60">
                      Contato: {animal.user.contact}
                    </p>
                  </div>
                  {canEditAnimal(animal) && (
                    <div className="flex flex-col gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Button
                        type="button"
                        variant="secondary"
                        className="text-xs py-2 px-3"
                        onClick={() => openEdit(animal)}
                      >
                        Editar
                      </Button>
                      <Button
                        type="button"
                        variant="danger"
                        className="text-xs py-2 px-3"
                        onClick={() => handleDelete(animal)}
                      >
                        Excluir
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {detailAnimal && (
        <AnimalDetailModal
          animal={detailAnimal}
          onClose={closeDetail}
          onEdit={openEdit}
          canEdit={canEditAnimal(detailAnimal)}
        />
      )}

      {modalOpen && (
        <AnimalModal
          animal={editingAnimal}
          onClose={closeModal}
          onSuccess={fetchAnimals}
          error={actionError}
          onSubmitForm={async (data) => {
            try {
              await onSubmitForm(data);
            } catch (err: unknown) {
              const res = err && typeof err === 'object' && 'response' in err
                ? (err as { response?: { status?: number; data?: { message?: string } } }).response
                : null;
              if (res?.status === 403) {
                setActionError('Você não pode editar animais de outros usuários.');
                throw err;
              }
              if (res?.status === 404) {
                setActionError('Animal não encontrado.');
                throw err;
              }
              setActionError(res?.data?.message ?? 'Erro ao salvar.');
              throw err;
            }
          }}
        />
      )}
    </Layout>
  );
}
