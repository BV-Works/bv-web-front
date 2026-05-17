import { create } from 'zustand';

import type { Profile, ProfileType } from '@/types/profile';
import type { Link } from '@/types/link';

import type { CreateLinkPayload } from '@/types/api';

import { profileApi } from '@/lib/api/profiles.api';
import { ApiException } from '@/lib/api/errors';

interface ProfileState {
  profile: Profile | null;
  links: Link[];

  isLoading: boolean;
  isDirty: boolean;

  // STATE
  setProfile: (profile: Profile | null) => void;
  setLinks: (links: Link[]) => void;
  setLoading: (loading: boolean) => void;
  setDirty: (dirty: boolean) => void;

  // EDITING
  updateProfile: (updates: Partial<Profile>) => void;

  addLink: (data: CreateLinkPayload) => Promise<void>;
  updateLink: (id: string, updates: Partial<Link>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (links: Link[]) => void;

  // API
  loadProfile: (userId: string) => Promise<void>;
  loadLinks: (profileId: string) => Promise<void>;

  saveChanges: () => Promise<{ success: boolean; error?: string }>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: null,
  links: [],

  isLoading: false,
  isDirty: false,

  setProfile: (profile) => set({ profile }),

  setLinks: (links) => set({ links }),

  setLoading: (isLoading) => set({ isLoading }),

  setDirty: (isDirty) => set({ isDirty }),

  // LOCAL EDITS (only update local state, mark as dirty, actual API calls in saveChanges)

  updateProfile: (updates) => {
    const profile = get().profile;
    if (!profile) return;

    set({
      profile: { ...profile, ...updates },
      isDirty: true,
    });
  },

  addLink: async (data) => {
    const profile = get().profile;
    if (!profile) return;

    const newLink = await profileApi.createLink(profile.id, data);

    set({
      links: [...get().links, newLink],
      isDirty: true,
    });
  },

  updateLink: (id, updates) => {
    set({
      links: get().links.map((l) => (l.id === id ? { ...l, ...updates } : l)),
      isDirty: true,
    });
  },

  deleteLink: (id) => {
    set({
      links: get().links.filter((l) => l.id !== id),
      isDirty: true,
    });
  },

  reorderLinks: (links) => {
    set({ links, isDirty: true });
  },

  // LOADERS

  loadProfile: async (userId) => {
    set({ isLoading: true });

    try {
      const profile = await profileApi.getProfileById(userId);

      set({
        profile,
        isLoading: false,
        isDirty: false,
      });
    } catch (err) {
      set({ isLoading: false });

      if (err instanceof ApiException) {
        console.error(err.message);
      }
    }
  },

  loadLinks: async (profileId) => {
    set({ isLoading: true });

    try {
      const links = await profileApi.getLinksByProfile(profileId);

      set({
        links,
        isLoading: false,
      });
    } catch (err) {
      set({ isLoading: false });
    }
  },

  // SAVE (save all form at the same time strategy, v0 style)

  saveChanges: async () => {
    const { profile, links } = get();

    if (!profile) {
      return { success: false, error: 'No profile loaded' };
    }

    set({ isLoading: true });

    try {
      // 1. update profile
      await profileApi.updateProfile(profile.id, {
        display_name: profile.display_name,
        slug: profile.slug,
        bio_web: profile.bio_web ?? undefined,
        bio_slug: profile.bio_slug ?? undefined,
        avatar_url: profile.avatar_url ?? undefined,
        secondary_image_url: profile.secondary_image_url ?? undefined,
        is_public: profile.is_public,
        position: profile.position,
      });

      // 2. sync links (simple approach: update each)
      await Promise.all(
        links.map((link) =>
          profileApi.updateLink(profile.id, link.id, {
            title: link.title,
            url: link.url,
            platform: link.platform,
            position: link.position,
            is_visible: link.is_visible,
          })
        )
      );

      set({
        isLoading: false,
        isDirty: false,
      });

      return { success: true };
    } catch (err) {
      set({ isLoading: false });

      return {
        success: false,
        error: err instanceof ApiException ? err.message : 'Error saving profile',
      };
    }
  },
}));

interface PublicProfilesState {
  profiles: Profile[];
  isLoading: boolean;
  error: string | null;

  loadProfiles: (type: ProfileType) => Promise<void>;

  getProfileBySlug: (slug: string) => Promise<{ profile: Profile; links: Link[] } | null>;

  clearError: () => void;
}

export const usePublicProfilesStore = create<PublicProfilesState>((set) => ({
  profiles: [],
  isLoading: false,
  error: null,

  // -------------------------
  // LIST (TEAM / ARTIST)
  // -------------------------
  loadProfiles: async (type) => {
    set({ isLoading: true, error: null });

    try {
      const profiles = await profileApi.getProfiles({
        type,
        is_public: true,
      });

      set({
        profiles: profiles,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err instanceof ApiException ? err.message : 'Error loading profiles',
      });
    }
  },

  // -------------------------
  // SINGLE PUBLIC PROFILE
  // -------------------------
  getProfileBySlug: async (slug) => {
    try {
      const profile = await profileApi.getProfileBySlug(slug);

      const links = await profileApi.getLinksByProfile(profile.id);

      return {
        profile,
        links: links.filter((l) => l.is_visible),
      };
    } catch (err) {
      console.error(err instanceof ApiException ? err.message : err);

      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
