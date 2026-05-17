import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/*
|--------------------------------------------------------------------------
| UI UTILS
|--------------------------------------------------------------------------
*/

// Tailwind class merger (shadcn pattern)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ROLES (SOURCE OF TRUTH: /types/user.ts)

import type { UserRole } from '@/types/user';

//Role guard genérico

export function hasRole(userRole: UserRole | undefined, allowed: UserRole[]): boolean {
  if (!userRole) return false;
  return allowed.includes(userRole);
}

// Shortcut UX: ADMIN check rápido

export function isAdmin(userRole: UserRole | undefined): boolean {
  return userRole === 'ADMIN';
}

//PROFILE UTILS (SOURCE OF TRUTH: /types/profile.ts)

import type { ProfileType } from '@/types/profile';

// Guard helper para tipos de perfil

export function isArtistProfile(type: ProfileType | undefined): boolean {
  return type === 'ARTIST';
}

export function isTeamProfile(type: ProfileType | undefined): boolean {
  return type === 'TEAM';
}

// SLUG UTILS (profiles)

export function toSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

//  DEBOUNCE (UI / search / live preview)

export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
