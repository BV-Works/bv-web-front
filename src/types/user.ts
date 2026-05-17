export type UserRole = 'ADMIN' | 'TEAM' | 'CUSTOMER' | 'ARTIST';

export interface User {
  id: string;

  email: string;

  role: UserRole;

  is_active: boolean;

  created_at?: string;
  updated_at?: string;
}
