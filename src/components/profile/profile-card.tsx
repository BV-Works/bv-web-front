import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import type { Profile } from '@/types/profile';

interface ProfileCardProps {
  profile: Profile;
  basePath: string;
}

export function ProfileCard({ profile, basePath }: ProfileCardProps) {
  return (
    <Link href={`${basePath}/${profile.slug}`} className="block h-full">
      <Card className="group h-full overflow-hidden bg-[var(--color-paper-translucent)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <CardContent className="p-5 pt-6">
          <div className="flex h-full flex-col">
            <Avatar className="mb-5 h-28 w-28 border-2 border-foreground/10 transition-all duration-300 group-hover:border-primary">
              <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.display_name} />
              <AvatarFallback className="text-2xl">
                {profile.display_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h3 className="font-display text-xl font-extrabold leading-none tracking-tight hover:text-primary transition-colors">
              {profile.display_name}
            </h3>

            {profile.bio_slug && (
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-foreground/60">
                {profile.bio_slug}
              </p>
            )}

            {profile.bio_web && (
              <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground ">
                {profile.bio_web}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
