import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LinkButton } from '@/components/profile/link-button'
import type { Profile, Link } from '@/types'

interface LinktreeViewProps {
  profile: Profile
  links: Link[]
}

export function LinktreeView({ profile, links }: LinktreeViewProps) {
  const visibleLinks = links.filter(l => l.is_visible).sort((a, b) => a.position - b.position)

  return (
    <div className="flex-1 bg-background">
      <div className="mx-auto max-w-md px-4 py-12">
        {/* Profile header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Avatar className="h-28 w-28 mb-4">
            <AvatarImage src={profile.avatar_url ?? undefined } alt={profile.display_name} />
            <AvatarFallback className="text-3xl">
              {profile.display_name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold">{profile.display_name}</h1>
          
          {profile.bio_slug && (
            <p className="text-muted-foreground mt-1">{profile.bio_slug}</p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {visibleLinks.map((link) => (
            <LinkButton key={link.id} link={link} />
          ))}
        </div>

        {visibleLinks.length === 0 && (
          <p className="text-center text-muted-foreground">
            No links available yet.
          </p>
        )}
      </div>
    </div>
  )
}
