'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, getRedirectPath } from '@/lib/stores/auth.store';
import { Spinner } from '@/components/ui/spinner';

export default function AppRedirectPage() {
  const router = useRouter();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!isLoading && user) {
      router.push(getRedirectPath(user.role));
    }
  }, [isLoading, user, router]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}
