import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils/utils';
import { SocialIcons } from '@/components/icons';
import type { Link, LinkPlatform } from '@/types';

interface LinkButtonProps {
  link: Link;
  className?: string;
}

const platformColors: Record<LinkPlatform, string> = {
  spotify: 'hover:border-[#1DB954]/40 hover:bg-[#1DB954]/10',
  instagram: 'hover:border-[#E4405F]/40 hover:bg-[#E4405F]/10',
  youtube: 'hover:border-[#FF0000]/40 hover:bg-[#FF0000]/10',
  tiktok: 'hover:border-white/30 hover:bg-white/10',
  applemusic: 'hover:border-[#FA233B]/40 hover:bg-[#FA233B]/10',
  twitch: 'hover:border-[#9146FF]/40 hover:bg-[#9146FF]/10',
  custom: 'hover:border-primary/40 hover:bg-primary/10',
};

const platformColorsIcon: Record<LinkPlatform, string> = {
  spotify: 'text-[#1DB954]',
  instagram: 'text-[#E4405F]',
  youtube: 'text-[#FF0000]',
  tiktok: 'text-black dark:text-white',
  applemusic: 'text-[#FA233B]',
  twitch: 'text-[#9146FF]',
  custom: 'text-primary',
};

const platformLabels: Record<LinkPlatform, string> = {
  spotify: 'Spotify',
  instagram: 'Instagram',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  applemusic: 'Apple Music',
  twitch: 'Twitch',
  custom: 'Link',
};

export function LinkButton({ link, className }: LinkButtonProps) {
  const Icon = SocialIcons[link.platform];

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        `group
        flex w-full items-center justify-between
        rounded-xl
        border
        border-white/10
        bg-[var(--color-paper-translucent)]
        backdrop-blur-sm
        px-4 py-3
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
        `,
        platformColors[link.platform],
        className
      )}
    >
      <span className="flex items-center gap-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 dark:bg-white/5">
          <Icon
            className={cn(
              'h-5 w-5 transition-transform duration-300 group-hover:scale-110',
              platformColorsIcon[link.platform]
            )}
          />
        </span>

        <span className="flex flex-col">
          <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {platformLabels[link.platform]}
          </span>

          <span className="font-medium">{link.title}</span>
        </span>
      </span>

      <ExternalLink className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-foreground" />
    </a>
  );
}

export function getPlatformLabel(platform: LinkPlatform) {
  return platformLabels[platform];
}
