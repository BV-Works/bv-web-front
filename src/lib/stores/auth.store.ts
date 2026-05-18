import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/api/auth.api';
import type { User, UserRole } from '@/types/user';
import { ApiException } from '@/lib/api/errors';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  initialized: boolean;
  // STATE
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  // AUTH ACTIONS
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isAuthenticated: false,
      initialized: false,
      // STATE
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      // AUTH
      login: async (email, password) => {
        try {
          set({ isLoading: true });
          const user = await authApi.login({ email, password });
          set({ user, isAuthenticated: true, isLoading: false, initialized: true });
          return { success: true };
        } catch (err) {
          const message = err instanceof ApiException ? err.message : 'Login failed';
          set({ isLoading: false, user: null, isAuthenticated: false, initialized: true });
          return { success: false, error: message };
        }
      },
      logout: async () => {
        try {
          set({ isLoading: true });
          await authApi.logout();
        } finally {
          set({ user: null, isAuthenticated: false, isLoading: false, initialized: true });
        }
      },
      checkAuth: async () => {
        try {
          set({ isLoading: true });
          const user = await authApi.me();
          set({ user, isAuthenticated: !!user, isLoading: false, initialized: true });
        } catch {
          set({ user: null, isAuthenticated: false, isLoading: false, initialized: true });
        }
      },
      clearAuth: () => {
        set({ user: null, isAuthenticated: false, initialized: true });
      },
    }),
    {
      name: 'bv-auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// ROLE REDIRECTS
export function getRedirectPath(role: UserRole): string {
  switch (role) {
    case 'ADMIN':
      return '/app/users';
    case 'TEAM':
    case 'ARTIST':
      return '/app/profile';
    default:
      return '/app';
  }
}
