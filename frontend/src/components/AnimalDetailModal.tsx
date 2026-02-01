import type { Animal } from '../types';
import { Button } from './ui/Button';

interface AnimalDetailModalProps {
  animal: Animal;
  onClose: () => void;
  onEdit?: (animal: Animal) => void;
  canEdit?: boolean;
}

export function AnimalDetailModal({
  animal,
  onClose,
  onEdit,
  canEdit,
}: AnimalDetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-white/10 rounded-3xl shadow-glow max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="inline-block px-3 py-1.5 rounded-full bg-primary-500/80 text-white text-xs font-medium mb-2">
                {animal.type === 'DOG' ? 'Cachorro' : 'Gato'}
              </span>
              <h2 className="text-xl font-bold text-white">
                {animal.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              title="Fechar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-white/60 mb-0.5">Nome</dt>
              <dd className="text-white font-medium">{animal.name}</dd>
            </div>
            <div>
              <dt className="text-white/60 mb-0.5">Idade</dt>
              <dd className="text-white">{animal.age}</dd>
            </div>
            <div>
              <dt className="text-white/60 mb-0.5">Tipo</dt>
              <dd className="text-white">{animal.type === 'DOG' ? 'Cachorro' : 'Gato'}</dd>
            </div>
            <div>
              <dt className="text-white/60 mb-0.5">Raça</dt>
              <dd className="text-white">{animal.race}</dd>
            </div>
            <div className="pt-3 border-t border-white/10">
              <dt className="text-white/60 mb-0.5">Dono</dt>
              <dd className="text-white font-medium">{animal.user.name}</dd>
            </div>
            <div>
              <dt className="text-white/60 mb-0.5">Contato do dono</dt>
              <dd className="text-white">{animal.user.contact}</dd>
            </div>
          </dl>

          <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Fechar
            </Button>
            {canEdit && onEdit && (
              <Button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(animal);
                }}
                className="flex-1"
              >
                Editar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
