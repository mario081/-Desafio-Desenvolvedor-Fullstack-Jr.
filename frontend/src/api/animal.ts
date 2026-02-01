import { api } from './client';
import type { Animal, CreateAnimalPayload, UpdateAnimalPayload } from '../types';

export const animalApi = {
  list: () =>
    api.get<Animal[]>('/animal'),

  create: (data: CreateAnimalPayload) =>
    api.post<Animal>('/animal', data),

  update: (id: string, data: UpdateAnimalPayload) =>
    api.patch<Animal>(`/animal/${id}`, data),

  remove: (id: string) =>
    api.delete(`/animal/${id}`),
};
