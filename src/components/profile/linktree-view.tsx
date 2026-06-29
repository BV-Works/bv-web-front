import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LinkButton } from '@/components/profile/link-button';
import type { Profile, Link } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface LinktreeViewProps {
  profile: Profile;
  links: Link[];
}

export function LinktreeView({ profile, links }: LinktreeViewProps) {
  const visibleLinks = links.filter((l) => l.is_visible).sort((a, b) => a.position - b.position);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-15">
      <Card className="py-3 w-full max-w-md border border-white/10 bg-[var(--color-paper-translucent)] backdrop-blur-xl shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <CardContent className="px-6 py-12">
          {/* Profile header */}
          <div className="mb-8 flex flex-col items-center text-center">
            <Avatar className="mb-5 h-32 w-32 border-2 border-foreground/6 shadow-lg">
              <AvatarImage src={profile.avatar_url ?? undefined} alt={profile.display_name} />

              <AvatarFallback className="bg-transparent font-display text-4xl">
                {profile.display_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h1 className="font-display text-4xl font-extrabold tracking-tight">
              {profile.display_name}
            </h1>

            {profile.bio_slug && (
              <p className="mt-2 max-w-xs text-sm italic text-muted-foreground">
                {profile.bio_slug}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="space-y-3">
            {visibleLinks.map((link) => (
              <LinkButton key={link.id} link={link} />
            ))}
          </div>

          {visibleLinks.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No links available yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
