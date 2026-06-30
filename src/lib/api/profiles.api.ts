import { api } from './api';
import { unwrapResponse } from './unwrap';

import type {
  ApiResponse,
  PaginatedResponse,
  CreateProfilePayload,
  UpdateProfilePayload,
  CreateLinkPayload,
  UpdateLinkPayload,
} from '@/types/api';

import type { Profile, ProfileType, PublicProfile } from '@/types/profile';
import type { Link } from '@/types/link';

export const profileApi = {
  // -----------------------
  // PROFILES
  // -----------------------

  getProfiles: async (params?: {
    type?: ProfileType;
    is_public?: boolean;
    page?: number;
    limit?: number;
  }): Promise<Profile[]> => {
    const res = await api.get<PaginatedResponse<Profile>>('/profiles', {
      params,
    });

    return unwrapResponse(res.data);
  },

  getProfileById: async (id: string): Promise<Profile> => {
    const res = await api.get<ApiResponse<Profile>>(`/profiles/${id}`);
    return unwrapResponse(res.data);
  },

  getMyProfile: async (): Promise<Profile | null> => {
    const res = await api.get<ApiResponse<Profile>>('/profiles/me');
    return unwrapResponse(res.data);
  },

  getProfileBySlug: async (slug: string): Promise<PublicProfile> => {
    const res = await api.get<ApiResponse<PublicProfile>>(`/profiles/public/${slug}`);

    return unwrapResponse(res.data);
  },

  getProfileByUserId: async (userId: string): Promise<Profile> => {
    const res = await api.get<ApiResponse<Profile>>(`/profiles/user/${userId}`);

    return unwrapResponse(res.data);
  },

  createProfile: async (data: CreateProfilePayload): Promise<Profile> => {
    const res = await api.post<ApiResponse<Profile>>('/profiles', data);
    return unwrapResponse(res.data);
  },

  updateProfile: async (id: string, data: UpdateProfilePayload): Promise<Profile> => {
    const res = await api.put<ApiResponse<Profile>>(`/profiles/${id}`, data);

    return unwrapResponse(res.data);
  },

  deleteProfile: async (id: string): Promise<void> => {
    const res = await api.delete<ApiResponse<null>>(`/profiles/${id}`);
    unwrapResponse(res.data);
  },

  // -----------------------
  // IMAGE UPLOAD
  // -----------------------

  uploadProfileImage: async (
    profileId: string,
    file: File,
    type: 'avatar' | 'secondary'
  ): Promise<{
    profile: Profile;
    uploadedUrl: string;
    type: 'avatar' | 'secondary';
  }> => {
    const formData = new FormData();

    formData.append('image', file);
    formData.append('type', type);

    const res = await api.post<
      ApiResponse<{
        profile: Profile;
        uploadedUrl: string;
        type: 'avatar' | 'secondary';
      }>
    >(`/profiles/${profileId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return unwrapResponse(res.data);
  },
  // -----------------------
  // LINKS
  // -----------------------

  getLinksByProfile: async (profileId: string): Promise<Link[]> => {
    const res = await api.get<ApiResponse<Link[]>>(`/profiles/${profileId}/links`);

    return unwrapResponse(res.data);
  },

  createLink: async (profileId: string, data: CreateLinkPayload): Promise<Link> => {
    const res = await api.post<ApiResponse<Link>>(`/profiles/${profileId}/links`, data);

    return unwrapResponse(res.data);
  },

  updateLink: async (profileId: string, linkId: string, data: UpdateLinkPayload): Promise<Link> => {
    const res = await api.put<ApiResponse<Link>>(`/profiles/${profileId}/links/${linkId}`, data);

    return unwrapResponse(res.data);
  },

  deleteLink: async (profileId: string, linkId: string): Promise<void> => {
    const res = await api.delete<ApiResponse<null>>(`/profiles/${profileId}/links/${linkId}`);

    unwrapResponse(res.data);
  },
};
