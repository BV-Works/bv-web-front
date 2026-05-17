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
    <Link href={`${basePath}/${profile.slug}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.display_name} />
              <AvatarFallback className="text-2xl">
                {profile.display_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {profile.display_name}
            </h3>

            {profile.bio_slug && (
              <p className="text-sm text-muted-foreground mt-1">{profile.bio_slug}</p>
            )}

            {profile.bio_web && (
              <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{profile.bio_web}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
