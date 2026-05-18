'use client'

import { useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import { LinktreeView } from '@/components/profile/linktree-view'
import { Skeleton } from '@/components/ui/skeleton'
import { usePublicProfilesStore } from '@/lib/stores/profiles.store'
import type { Profile, Link } from '@/types'

interface ArtistProfilePageProps {
  params: Promise<{ slug: string }>
}

export default function ArtistProfilePage({ params }: ArtistProfilePageProps) {
  const { getProfileBySlug } = usePublicProfilesStore()
  const [isLoading, setIsLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<Link[]>([])
  const [slug, setSlug] = useState<string>('')

  useEffect(() => {
    params.then(p => setSlug(p.slug))
  }, [params])

  useEffect(() => {
    if (!slug) return
    
    async function loadProfile() {
      setIsLoading(true)
      const data = await getProfileBySlug(slug)
      if (data) {
        setProfile(data.profile)
        setLinks(data.links)
      }
      setIsLoading(false)
    }
    loadProfile()
  }, [slug, getProfileBySlug])

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto max-w-md px-4 py-12">
          <div className="flex flex-col items-center">
            <Skeleton className="h-28 w-28 rounded-full mb-4" />
            <Skeleton className="h-7 w-40 mb-2" />
            <Skeleton className="h-5 w-24 mb-8" />
            <div className="w-full space-y-3">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    notFound()
  }

  return <LinktreeView profile={profile} links={links} />
}
