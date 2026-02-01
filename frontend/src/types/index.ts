export type PetType = 'CAT' | 'DOG';

export interface User {
  id: string;
  name: string;
  email: string;
  contact: string;
}

export interface Animal {
  id: string;
  name: string;
  age: string;
  type: PetType;
  race: string;
  userId: string;
  user: {
    name: string;
    contact: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAnimalPayload {
  name: string;
  age: string;
  type: PetType;
  race: string;
}

export interface UpdateAnimalPayload extends Partial<CreateAnimalPayload> {}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
  contact: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}
