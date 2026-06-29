import {
  SpotifyIcon,
  InstagramIcon,
  YoutubeIcon,
  TiktokIcon,
  AppleMusicIcon,
  TwitchIcon,
  LinkIcon,
} from '.';

import type { LinkPlatform } from '@/types';

export const SocialIcons: Record<LinkPlatform, React.ComponentType<{ className?: string }>> = {
  spotify: SpotifyIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  tiktok: TiktokIcon,
  applemusic: AppleMusicIcon,
  twitch: TwitchIcon,
  custom: LinkIcon,
};
