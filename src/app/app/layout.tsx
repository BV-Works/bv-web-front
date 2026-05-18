'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { useAuthStore, getRedirectPath } from '@/lib/stores/auth.store';
import { Spinner } from '@/components/ui/spinner';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, initialized, isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // 1. esperar a que auth se inicialice
    if (!initialized || isLoading) return;

    // 2. si no autenticado → login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // 3. role-based access control
    if (user) {
      const isUsersPage = pathname === '/app/users';

      if (isUsersPage && user.role !== 'ADMIN') {
        router.push('/app/profile');
        return;
      }

      // 4. redirect base /app
      if (pathname === '/app') {
        router.push(getRedirectPath(user.role));
      }
    }
  }, [initialized, isLoading, isAuthenticated, user, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
