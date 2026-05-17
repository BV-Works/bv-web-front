import type { ApiResponse, PaginatedResponse, ApiPaginatedSuccess } from '@/types/api';

import { ApiException } from './errors';

// UNWRAP SINGLE RESPONSE

export function unwrapResponse<T>(res: ApiResponse<T>): T {
  if (res.status === 'error') {
    throw new ApiException(res);
  }

  return res.data;
}

// UNWRAP PAGINATED RESPONSE

export function unwrapPaginated<T>(res: PaginatedResponse<T>): ApiPaginatedSuccess<T>['data'] {
  if (res.status === 'error') {
    throw new ApiException(res);
  }

  return res.data;
}
