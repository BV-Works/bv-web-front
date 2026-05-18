import { UserRole } from '@/types/user';
import { ProfileType } from './profile';
import { LinkPlatform } from './link';

export interface ApiError {
  status: 'error';
  message: string;
  code?: string;
}

export interface ApiSuccess<T> {
  status: 'success';
  data: T;
  message?: string;
}

export interface ApiPaginatedSuccess<T> {
  status: 'success';
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface HealthData {
  database: 'connected' | 'disconnected';
  uptime: number;
  timestamp: string;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
export type PaginatedResponse<T> = ApiPaginatedSuccess<T> | ApiError;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  role: UserRole;
  is_active?: boolean;
}

export interface UpdateUserPayload {
  email?: string;
  role?: UserRole;
  is_active?: boolean;
}

export interface CreateProfilePayload {
  display_name: string;
  slug?: string;
  profile_type: ProfileType;
  bio_web?: string;
  bio_slug?: string;
  avatar_url?: string;
  secondary_image_url?: string;
  is_public?: boolean;
  position?: number;
}

export interface UpdateProfilePayload {
  display_name?: string;
  slug?: string;
  bio_web?: string;
  bio_slug?: string;
  avatar_url?: string;
  secondary_image_url?: string;
  is_public?: boolean;
  position?: number;
}

export interface CreateLinkPayload {
  platform: LinkPlatform;
  title: string;
  url: string;
  position?: number;
}

export interface UpdateLinkPayload {
  platform?: LinkPlatform;
  title?: string;
  url?: string;
  position?: number;
  is_visible?: boolean;
}
