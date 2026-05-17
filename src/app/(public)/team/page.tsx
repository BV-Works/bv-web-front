'use client';

import { useEffect } from 'react';
import { ProfileCarousel } from '@/components/profile/profile-carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { usePublicProfilesStore } from '@/lib/stores/profiles.store';

export default function TeamPage() {
  const { profiles, isLoading, loadProfiles } = usePublicProfilesStore();

  useEffect(() => {
    loadProfiles('TEAM');
  }, [loadProfiles]);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Team</h1>
          <p className="mt-4 text-muted-foreground">
            Meet the people behind the scenes making the music happen.
          </p>
        </div>

        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px]">
                <div className="rounded-lg border p-6">
                  <div className="flex flex-col items-center">
                    <Skeleton className="h-24 w-24 rounded-full mb-4" />
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <p className="text-center text-muted-foreground">No profiles found</p>
        ) : (
          <ProfileCarousel profiles={profiles} basePath="/team" />
        )}
      </div>
    </div>
  );
}
