export type LinkPlatform =
  | 'spotify'
  | 'instagram'
  | 'youtube'
  | 'tiktok'
  | 'applemusic'
  | 'twitch'
  | 'custom';

export interface Link {
  id: string;

  profile_id: string;

  platform: LinkPlatform;

  title: string;

  url: string;

  position: number;

  is_visible: boolean;

  created_at: string;
  updated_at: string;
}
