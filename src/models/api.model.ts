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
