import { api } from './api';
import { unwrapResponse, unwrapPaginated } from './unwrap';

import type {
  ApiResponse,
  PaginatedResponse,
  CreateUserPayload,
  UpdateUserPayload,
} from '@/types/api';

import type { User } from '@/types/user';

export const usersApi = {
  getUsers: async (): Promise<User[]> => {
    const res = await api.get<PaginatedResponse<User>>('/users');

    return unwrapPaginated(res.data);
  },

  getUserById: async (id: string): Promise<User | null> => {
    const res = await api.get<ApiResponse<User | null>>(`/users/${id}`);

    return unwrapResponse(res.data);
  },

  createUser: async (data: CreateUserPayload): Promise<User> => {
    const res = await api.post<ApiResponse<User>>('/users', data);

    return unwrapResponse(res.data);
  },

  updateUser: async (id: string, data: UpdateUserPayload): Promise<User> => {
    const res = await api.put<ApiResponse<User>>(`/users/${id}`, data);

    return unwrapResponse(res.data);
  },

  deleteUser: async (id: string): Promise<void> => {
    const res = await api.delete<ApiResponse<User>>(`/users/${id}`);

    unwrapResponse(res.data);
  },
};
