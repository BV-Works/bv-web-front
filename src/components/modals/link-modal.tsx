'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Link, LinkPlatform, LinkFormData } from '@/types'

const PLATFORMS: { value: LinkPlatform; label: string }[] = [
  { value: 'spotify', label: 'Spotify' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'applemusic', label: 'Apple Music' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'custom', label: 'Custom Link' },
]

const schema = z.object({
  platform: z.enum(['spotify', 'instagram', 'youtube', 'tiktok', 'applemusic', 'twitch', 'custom'] as const),
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Please enter a valid URL'),
  is_visible: z.boolean(),
})

interface LinkModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  link?: Link | null
  onSave: (data: LinkFormData) => void
  onDelete?: () => void
}

export function LinkModal({ open, onOpenChange, link, onSave, onDelete }: LinkModalProps) {
  const isEditing = !!link

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<LinkFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      platform: 'custom',
      title: '',
      url: '',
      is_visible: true,
    },
  })

  const selectedPlatform = watch('platform')
  const isVisible = watch('is_visible')

  useEffect(() => {
    if (link) {
      reset({
        platform: link.platform,
        title: link.title,
        url: link.url,
        is_visible: link.is_visible,
      })
    } else {
      reset({
        platform: 'custom',
        title: '',
        url: '',
        is_visible: true,
      })
    }
  }, [link, reset, open])

  const onSubmit = (data: LinkFormData) => {
    onSave(data)
    onOpenChange(false)
  }

  const handleClose = (newOpen: boolean) => {
    if (!newOpen) {
      reset()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Link' : 'Add Link'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={selectedPlatform}
                onValueChange={(value) => setValue('platform', value as LinkPlatform)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.platform && (
                <p className="text-sm text-destructive">{errors.platform.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Link title"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://..."
                {...register('url')}
              />
              {errors.url && (
                <p className="text-sm text-destructive">{errors.url.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_visible">Visible</Label>
              <Switch
                id="is_visible"
                checked={isVisible}
                onCheckedChange={(checked) => setValue('is_visible', checked)}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {isEditing && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  onDelete()
                  onOpenChange(false)
                }}
                className="mr-auto"
              >
                Delete
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => handleClose(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? 'Save Changes' : 'Add Link'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
