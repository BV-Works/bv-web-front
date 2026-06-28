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
    <section className="relative flex flex-1 flex-col justify-end px-12 py-16 max-md:px-6">
      <div className="w-full max-w-7xl">
        <div className="max-w-4xl pl-6">
          <h1 className="mb-4 font-display text-[clamp(4rem,9vw,7rem)] font-extrabold leading-none max-[1100px]:text-[5rem] max-[830px]:text-[4.2rem] max-[510px]:text-[3.3rem] text-balance">
            TEAM
          </h1>

          <p className="mt-4 text-base italic text-muted-foreground">
            Meet the people behind Bajo Vigilancia and discover the professionals shaping every project from concept to final delivery.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-20 flex gap-4 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[280px]">
                <div className="rounded-lg border p-6">
                  <div className="flex flex-col items-center">
                    <Skeleton className="mb-4 h-24 w-24 rounded-full" />
                    <Skeleton className="mb-2 h-5 w-32" />
                    <Skeleton className="mb-3 h-4 w-24" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <p className="text-center text-muted-foreground">No profiles found</p>
        ) : (
          <div className="mt-16">
            <ProfileCarousel profiles={profiles} basePath="/team" />
          </div>
        )}
      </div>
    </section>
  );
}
