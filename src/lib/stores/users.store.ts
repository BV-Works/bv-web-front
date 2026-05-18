import { create } from 'zustand';

import type { CreateUserPayload } from '@/types/api';
import type { User, UserRole } from '@/types/user';

import { usersApi } from '@/lib/api/users.api';
import { profileApi } from '@/lib/api/profiles.api';
import { ApiException } from '@/lib/api/errors';

interface UsersState {
  users: User[];
  isLoading: boolean;

  usersWithProfiles: Set<string>;

  loadUsers: () => Promise<void>;

  createUser: (data: CreateUserPayload) => Promise<{ success: boolean; error?: string }>;

  updateUserRole: (userId: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;

  toggleUserActive: (userId: string) => Promise<{ success: boolean; error?: string }>;

  deleteUser: (userId: string) => Promise<{ success: boolean; error?: string }>;

  hasProfile: (userId: string) => boolean;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  isLoading: false,

  usersWithProfiles: new Set(),

  // LOAD USERS + PROFILES
  loadUsers: async () => {
    set({ isLoading: true });

    try {
      const [users, profiles] = await Promise.all([usersApi.getUsers(), profileApi.getProfiles()]);

      const userIds = profiles.map((p) => p.user_id).filter((id): id is string => Boolean(id));

      const usersWithProfiles = new Set(userIds);

      set({
        users,
        usersWithProfiles,
        isLoading: false,
      });
    } catch (err) {
      if (err instanceof ApiException) {
        console.log(err.code);
        console.error('loadUsers error:', err.message);
      }
      set({ isLoading: false });
    }
  },

  // CREATE USER
  createUser: async (data) => {
    set({ isLoading: true });

    try {
      const newUser = await usersApi.createUser(data);

      set({
        users: [...get().users, newUser],
        isLoading: false,
      });

      return { success: true };
    } catch (err) {
      set({ isLoading: false });
      return {
        success: false,
        error: err instanceof ApiException ? err.message : 'Error creating user',
      };
    }
  },

  // UPDATE ROLE
  updateUserRole: async (userId, role) => {
    try {
      const updated = await usersApi.updateUser(userId, { role });

      set({
        users: get().users.map((u) => (u.id === userId ? updated : u)),
      });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof ApiException ? err.message : 'Error updating role',
      };
    }
  },

  // TOGGLE ACTIVE
  toggleUserActive: async (userId) => {
    try {
      const user = get().users.find((u) => u.id === userId);
      if (!user) return { success: false, error: 'User not found' };

      const updated = await usersApi.updateUser(userId, {
        is_active: !user.is_active,
      });

      set({
        users: get().users.map((u) => (u.id === userId ? updated : u)),
      });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof ApiException ? err.message : 'Error toggling user',
      };
    }
  },

  // DELETE USER
  deleteUser: async (userId) => {
    set({ isLoading: true });

    try {
      await usersApi.deleteUser(userId);

      set({
        users: get().users.filter((u) => u.id !== userId),
        isLoading: false,
      });

      return { success: true };
    } catch (err) {
      set({ isLoading: false });

      return {
        success: false,
        error: err instanceof ApiException ? err.message : 'Error deleting user',
      };
    }
  },

  // HAS PROFILE
  hasProfile: (userId: string) => {
    return get().usersWithProfiles.has(userId);
  },
}));
