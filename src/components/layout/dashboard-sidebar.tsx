'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Users, User, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuthStore } from '@/lib/stores/auth.store'
import { ChangePasswordModal } from '@/components/modals/change-password-modal'
import { SidebarContent } from './sidebar-content'
import type { LucideIcon } from 'lucide-react'

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [showChangePassword, setShowChangePassword] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const navItems: { href: string; label: string; icon: LucideIcon }[] = [
    ...(user?.role === 'ADMIN' ? [{ href: '/app/users', label: 'Users', icon: Users }] : []),
    ...(['TEAM', 'ARTIST', 'ADMIN'].includes(user?.role || '') ? [{ href: '/app/profile', label: 'Profile', icon: User }] : []),
  ]

  return (
    <>
      {/* desktop */}
      <aside className="hidden w-64 md:block border-r">
        <SidebarContent
          navItems={navItems}
          pathname={pathname}
          setMobileOpen={setMobileOpen}
          user={user}
          setShowChangePassword={setShowChangePassword}
          handleLogout={handleLogout}
        />
      </aside>

      {/* mobile */}
      <div className="md:hidden flex h-14 items-center justify-between border-b px-4">
        <Link href="/">Bajo Vigilancia</Link>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent
              navItems={navItems}
              pathname={pathname}
              setMobileOpen={setMobileOpen}
              user={user}
              setShowChangePassword={setShowChangePassword}
              handleLogout={handleLogout}
            />
          </SheetContent>
        </Sheet>
      </div>

      <ChangePasswordModal
        open={showChangePassword}
        onOpenChange={setShowChangePassword}
      />
    </>
  )
}
