'use client';
export const runtime = 'edge';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Monitor, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileCard } from '@/components/profile/profile-card';
import { LinktreeView } from '@/components/profile/linktree-view';
import { SortableLinksList } from '@/components/profile/sortable-links-list';
import { LinkModal } from '@/components/modals/link-modal';
import { useProfileStore } from '@/lib/stores/profiles.store';
import { useUsersStore } from '@/lib/stores/users.store';
import type { Link, LinkFormData, ProfileType } from '@/types';

export default function AdminUserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { users, loadUsers } = useUsersStore();
  const {
    profile,
    links,
    isLoading,
    isDirty,
    loadProfileByUserId,
    createProfileForUser,
    updateProfile,
    addLink,
    updateLink,
    deleteLink,
    reorderLinks,
    saveChanges,
    uploadProfileImage,
  } = useProfileStore();

  const [isSaving, setIsSaving] = useState(false);
  const [identityOpen, setIdentityOpen] = useState(true);
  const [contentOpen, setContentOpen] = useState(true);
  const [visibilityOpen, setVisibilityOpen] = useState(true);
  const [linksOpen, setLinksOpen] = useState(true);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [previewMode, setPreviewMode] = useState<'card' | 'linktree'>('linktree');
  const [isCreating, setIsCreating] = useState(false);
  const [newProfileType, setNewProfileType] = useState<ProfileType>('ARTIST');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingSecondary, setUploadingSecondary] = useState(false);

  const user = users.find((u) => u.id === userId);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    if (userId) {
      loadProfileByUserId(userId);
    }
  }, [userId, loadProfileByUserId]);

  const handleSave = async () => {
    setIsSaving(true);
    await saveChanges();
    setIsSaving(false);
  };

  const handleCreateProfile = async () => {
    if (!user) return;

    setIsCreating(true);

    try {
      const profile = await createProfileForUser(user.email.split('@')[0], newProfileType);
    } catch (err) {
      console.error('Error creating profile:', err);
      // aquí mostrar toast
    } finally {
      setIsCreating(false);
    }
  };

  const handleAddLink = () => {
    setEditingLink(null);
    setLinkModalOpen(true);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setLinkModalOpen(true);
  };

  const handleSaveLink = (data: LinkFormData) => {
    if (editingLink) {
      updateLink(editingLink.id, data);
    } else {
      addLink(data);
    }
  };
  const handleDeleteLink = async () => {
    if (!editingLink) return;

    await deleteLink(editingLink.id);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !profile) return;

    try {
      setUploadingAvatar(true);

      await uploadProfileImage(profile.id, file, 'avatar');
    } finally {
      setUploadingAvatar(false);

      e.target.value = '';
    }
  };

  const handleSecondaryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !profile) return;

    try {
      setUploadingSecondary(true);

      await uploadProfileImage(profile.id, file, 'secondary');
    } finally {
      setUploadingSecondary(false);

      e.target.value = '';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Skeleton className="h-64" />
            <Skeleton className="h-48" />
          </div>
          <Skeleton className="h-[600px]" />
        </div>
      </div>
    );
  }

  // No profile exists - show create profile form
  if (!profile) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/app/users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {user?.email || 'User'} - Create Profile
            </h1>
            <p className="text-muted-foreground">This user doesn&apos;t have a profile yet</p>
          </div>
        </div>

        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Create Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Profile Type</Label>
              <Select
                value={newProfileType}
                onValueChange={(v) => setNewProfileType(v as ProfileType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEAM">Team Member</SelectItem>
                  <SelectItem value="ARTIST">Artist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateProfile} disabled={isCreating} className="w-full">
              {isCreating ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Creating...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/app/users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{profile.display_name}</h1>
              <Badge variant="secondary">{profile.profile_type}</Badge>
            </div>
            <p className="text-muted-foreground">Editing profile for {user?.email || 'user'}</p>
          </div>
        </div>
        <Button className="w-full sm:w-auto" onClick={handleSave} disabled={!isDirty || isSaving}>
          {isSaving ? <Spinner className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Form */}
        <div className="space-y-4 order-2 lg:order-1">
          {/* Identity Section */}
          <Collapsible open={identityOpen} onOpenChange={setIdentityOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    Identity
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${identityOpen ? 'rotate-180' : ''}`}
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile_type">Profile Type</Label>
                    <Select
                      value={profile.profile_type}
                      onValueChange={(v) => updateProfile({ profile_type: v as ProfileType })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TEAM">Team Member</SelectItem>
                        <SelectItem value="ARTIST">Artist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    <Input
                      id="display_name"
                      value={profile.display_name}
                      onChange={(e) => updateProfile({ display_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        /{profile.profile_type.toLowerCase()}/
                      </span>
                      <Input
                        id="slug"
                        value={profile.slug}
                        onChange={(e) => updateProfile({ slug: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Content Section */}
          <Collapsible open={contentOpen} onOpenChange={setContentOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    Content
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${contentOpen ? 'rotate-180' : ''}`}
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="bio_web">Bio (Web)</Label>
                    <Textarea
                      id="bio_web"
                      rows={3}
                      value={profile.bio_web ?? undefined}
                      onChange={(e) => updateProfile({ bio_web: e.target.value })}
                      placeholder="Full bio for the web..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio_slug">Bio (Short)</Label>
                    <Input
                      id="bio_slug"
                      value={profile.bio_slug ?? undefined}
                      onChange={(e) => updateProfile({ bio_slug: e.target.value })}
                      placeholder="Short tagline..."
                    />
                  </div>
                  {/* <div className="space-y-2">
                    <Label htmlFor="avatar_url">Avatar URL</Label>
                    <Input
                      id="avatar_url"
                      value={profile.avatar_url ?? undefined}
                      onChange={(e) => updateProfile({ avatar_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondary_image_url">Secondary Image URL</Label>
                    <Input
                      id="secondary_image_url"
                      value={profile.secondary_image_url ?? undefined}
                      onChange={(e) => updateProfile({ secondary_image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div> */}
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Avatar</Label>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <Input
                        id="avatar"
                        type="file"
                        accept="image/*"
                        disabled={uploadingAvatar}
                        onChange={handleAvatarUpload}
                      />

                      {uploadingAvatar && <Spinner className="h-5 w-5" />}
                    </div>

                    {profile.avatar_url && (
                      <p className="text-xs text-muted-foreground truncate">Image uploaded</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryImage">Secondary Image</Label>

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                      <Input
                        id="secondaryImage"
                        type="file"
                        accept="image/*"
                        disabled={uploadingSecondary}
                        onChange={handleSecondaryImageUpload}
                      />

                      {uploadingSecondary && <Spinner className="h-5 w-5" />}
                    </div>

                    {profile.secondary_image_url && (
                      <p className="text-xs text-muted-foreground truncate">Image uploaded</p>
                    )}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Visibility Section */}
          <Collapsible open={visibilityOpen} onOpenChange={setVisibilityOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    Visibility
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${visibilityOpen ? 'rotate-180' : ''}`}
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="is_public">Public Profile</Label>
                      <p className="text-sm text-muted-foreground">
                        Make this profile visible to everyone
                      </p>
                    </div>
                    <Switch
                      id="is_public"
                      checked={profile.is_public}
                      onCheckedChange={(checked) => updateProfile({ is_public: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position (Display Order)</Label>
                    <Input
                      id="position"
                      type="number"
                      value={profile.position}
                      onChange={(e) => updateProfile({ position: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>

          {/* Links Section */}
          <Collapsible open={linksOpen} onOpenChange={setLinksOpen}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-secondary/50 transition-colors">
                  <CardTitle className="flex items-center justify-between text-base">
                    Links ({links.length})
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${linksOpen ? 'rotate-180' : ''}`}
                    />
                  </CardTitle>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-3">
                  {links.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No links yet. Add the first link below.
                    </p>
                  ) : (
                    <SortableLinksList
                      links={links}
                      onReorder={reorderLinks}
                      onEdit={handleEditLink}
                    />
                  )}
                  <Button variant="outline" className="w-full" onClick={handleAddLink}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Link
                  </Button>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>

        {/* Right: Preview */}
        <div className="order-1 lg:order-2 lg:sticky lg:top-4 lg:self-start">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Preview</CardTitle>
                <Tabs
                  value={previewMode}
                  onValueChange={(v: string) => setPreviewMode(v as 'card' | 'linktree')}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card" className="text-xs">
                      <Monitor className="mr-1 h-3 w-3" />
                      Card
                    </TabsTrigger>
                    <TabsTrigger value="linktree" className="text-xs">
                      <Eye className="mr-1 h-3 w-3" />
                      Linktree
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {previewMode === 'card' ? (
                <div className="max-w-xs mx-auto">
                  <ProfileCard
                    profile={profile}
                    basePath={`/${profile.profile_type.toLowerCase()}`}
                  />
                </div>
              ) : (
                <div className="bv-bg border rounded-lg overflow-hidden max-h-[600px] overflow-y-auto">
                  <LinktreeView profile={profile} links={links} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <LinkModal
        open={linkModalOpen}
        onOpenChange={setLinkModalOpen}
        link={editingLink}
        onSave={handleSaveLink}
        onDelete={handleDeleteLink}
      />
    </div>
  );
}
