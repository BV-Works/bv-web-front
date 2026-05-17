import type { ApiError } from '@/types/api';

// API EXCEPTION: Error tipado que conserva info del backend

export class ApiException extends Error {
  code?: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = 'ApiException';
    this.code = error.code;
  }
}
