'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/utils'
import { Key, LogOut } from 'lucide-react'
import { User } from '@/types'
import type { LucideIcon } from 'lucide-react'

interface Props {
  navItems: { href: string; label: string; icon: LucideIcon }[]
  pathname: string
  setMobileOpen: (v: boolean) => void
  user: User | null
  setShowChangePassword: (v: boolean) => void
  handleLogout: () => void
}

export function SidebarContent({
  navItems,
  pathname,
  setMobileOpen,
  user,
  setShowChangePassword,
  handleLogout,
}: Props) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <Link href="/" className="text-lg font-semibold">
          Bajo Vigilancia
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium',
                pathname === item.href
                  ? 'bg-secondary text-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4 space-y-2">
        <div className="px-3 py-2">
          <p className="text-sm font-medium truncate">{user?.email}</p>
          <p className="text-xs text-muted-foreground">{user?.role}</p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => setShowChangePassword(true)}
        >
          <Key className="mr-2 h-4 w-4" />
          Change Password
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  )
}