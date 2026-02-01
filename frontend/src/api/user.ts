import { api } from './client';
import type { CreateUserPayload, SignInPayload, AuthResponse } from '../types';

export const userApi = {
  create: (data: CreateUserPayload) =>
    api.post('/user', data),

  signIn: (data: SignInPayload) =>
    api.post<AuthResponse>('/user/signin', data),
};
