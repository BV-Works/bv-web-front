'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';
import { DecorativeCorners } from './decorative-corners';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICIOS', href: '/services' },
  { label: 'TEAM', href: '/team' },
  { label: 'ARTISTS', href: '/artists' },
  { label: 'CONTACTO', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

const SERVICE_LINKS = [
  { label: 'MEZCLA', href: '/services#mix' },
  { label: 'MASTERING', href: '/services#master' },
  { label: 'ESTUDIO', href: '/services#studio' },
  { label: 'DISEÑO', href: '/services#design' },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // const navLinks = [
  //   { href: '/', label: 'Home' },
  //   { href: '/team', label: 'Team' },
  //   { href: '/artists', label: 'Artists' },
  // ];

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    // <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    //   <div className="container mx-auto flex h-16 items-center justify-between px-4">
    //     <Link href="/" className="text-xl font-semibold tracking-tight">
    //       Bajo Vigilancia
    //     </Link>

    //     <nav className="hidden items-center gap-6 md:flex">
    //       {navLinks.map((link) => (
    //         <Link
    //           key={link.href}
    //           href={link.href}
    //           className={cn(
    //             'text-sm font-medium transition-colors hover:text-foreground/80',
    //             pathname === link.href ? 'text-foreground' : 'text-foreground/60'
    //           )}
    //         >
    //           {link.label}
    //         </Link>
    //       ))}
    //     </nav>

    //     <div className="flex items-center gap-4">
    //       <Button asChild variant="outline" size="sm">
    //         <Link href="/login">Log in</Link>
    //       </Button>
    //     </div>
    //   </div>
    // </header>
    <header className="sticky top-0 z-10 flex min-h-[35vh] flex-none basis-auto items-start justify-end py-6 max-md:fixed max-md:right-0 max-md:min-h-0 md:basis-[260px]">
      <DecorativeCorners
        positions={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        className="max-md:hidden"
      />

      {/* MOBILE TOGGLE */}
      <button
        type="button"
        aria-label="Abrir navegación"
        onClick={() => setOpen(true)}
        className={cn(
          'cursor-pointer border-none bg-transparent px-4 text-3xl text-foreground md:hidden',
          open && 'hidden'
        )}

        // color-paper-translucent
      >
        ☰
      </button>

      <button
        type="button"
        aria-label="Cerrar navegación"
        onClick={() => setOpen(false)}
        className={cn(
          'absolute right-4 top-6 z-30 cursor-pointer border-none bg-transparent text-3xl text-foreground md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        ✕
      </button>

      {/* MOBILE OVERLAY */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={cn(
          'fixed right-0 top-0 z-20 h-[600px] w-[311px] rounded-lg bg-[var(--color-paper-translucent)] backdrop-blur-md md:hidden',
          open ? 'block' : 'hidden'
        )}
      />

      {/* NAV */}
      <nav
        className={cn(
          'z-30 md:block',
          'max-md:absolute max-md:right-3 max-md:top-12 max-md:w-[200px]',
          open ? 'max-md:block' : 'max-md:hidden'
        )}
      >
        <ul className="m-0 mr-4 flex list-none flex-col gap-2 p-0">
          {NAV_LINKS.map((item) => (
            <div key={item.href} className="group text-right">
              <Link
                href={item.href}
                className={cn(
                  'block font-display text-3xl font-extrabold leading-none transition-colors hover:text-primary',
                  pathname === item.href && 'text-primary'
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>

              {/* SUBMENU SOLO SERVICES */}
              {item.href === '/services' && (
                <div
                  className={cn(
                    // base hidden desktop
                    'hidden flex-col pr-2 text-right transition-all duration-300 ease-out',
                    // desktop hover behavior
                    'md:group-hover:flex md:group-hover:max-h-[500px]',
                    // mobile: siempre visible dentro del panel abierto
                    'max-md:flex'
                  )}
                >
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="text-sm text-foreground/70 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* LOGIN (AJUSTAR ESTILOS) */}
          <div className="mt-6 pr-2">
            <Link
              href="/login"
              className="block w-fit justify-self-end px-4 py-3 font-title text-[2.1rem] font-extrabold leading-none text-ink transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              LOGIN
            </Link>
            {/* <Button asChild variant="outline" size="sm">
         <Link href="/login">Log in</Link>
       </Button> */}
          </div>
        </ul>
      </nav>
    </header>
  );
}
