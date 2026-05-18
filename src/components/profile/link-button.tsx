import { ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import type { Link, LinkPlatform } from '@/types'

interface LinkButtonProps {
  link: Link
  className?: string
}

const platformColors: Record<LinkPlatform, string> = {
  spotify: 'hover:bg-[#1DB954]/10 hover:border-[#1DB954]/50',
  instagram: 'hover:bg-[#E4405F]/10 hover:border-[#E4405F]/50',
  youtube: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000]/50',
  tiktok: 'hover:bg-[#000000]/10 hover:border-[#000000]/50',
  applemusic: 'hover:bg-[#FA233B]/10 hover:border-[#FA233B]/50',
  twitch: 'hover:bg-[#9146FF]/10 hover:border-[#9146FF]/50',
  custom: 'hover:bg-primary/10 hover:border-primary/50',
}

const platformIcons: Record<LinkPlatform, string> = {
  spotify: 'Spotify',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  applemusic: 'Apple Music',
  twitch: 'Twitch',
  custom: 'Link',
}

export function LinkButton({ link, className }: LinkButtonProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex w-full items-center justify-between rounded-lg border bg-background px-4 py-3 text-sm font-medium transition-all',
        platformColors[link.platform],
        className
      )}
    >
      <span className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {platformIcons[link.platform]}
        </span>
        <span>{link.title}</span>
      </span>
      <ExternalLink className="h-4 w-4 text-muted-foreground" />
    </a>
  )
}

export function getPlatformLabel(platform: LinkPlatform): string {
  return platformIcons[platform]
}
