import { api } from './api';
import type { LoginPayload, ApiResponse } from '@/types/api';
import type { User } from '@/types/user';
import { unwrapResponse } from './unwrap';

export const authApi = {
  login: async (data: LoginPayload): Promise<User> => {
    const res = await api.post<ApiResponse<User>>('/auth/login', data);

    return unwrapResponse(res.data);
  },

  logout: async (): Promise<void> => {
    await api.post<ApiResponse<null>>('/auth/logout');
  },

  me: async (): Promise<User | null> => {
    const res = await api.get<ApiResponse<User>>('/auth/me');

    // aquí NO usamos unwrap porque el backend puede devolver null sin error
    if (res.data.status === 'error') return null;

    return res.data.data;
  },

  changePassword: async (data: { currentPassword: string; newPassword: string }): Promise<void> => {
    const res = await api.put<ApiResponse<null>>('/auth/change-password', data);

    unwrapResponse(res.data);
  },

  forgotPassword: async (email: string): Promise<void> => {
    const res = await api.post<ApiResponse<null>>('/auth/forgot-password', { email });

    unwrapResponse(res.data);
  },

  resetPassword: async (data: { token: string; newPassword: string }): Promise<void> => {
    const res = await api.post<ApiResponse<null>>('/auth/reset-password', data);

    unwrapResponse(res.data);
  },
};
