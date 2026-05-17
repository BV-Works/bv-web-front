export type ProfileType = 'TEAM' | 'ARTIST';

export interface Profile {
  id: string;

  user_id: string | null;

  profile_type: ProfileType;

  display_name: string;

  slug: string;

  bio_slug: string | null;

  bio_web: string | null;

  avatar_url: string | null;

  secondary_image_url: string | null;

  is_public: boolean;

  position: number;

  created_at?: string;
  updated_at?: string;
}
