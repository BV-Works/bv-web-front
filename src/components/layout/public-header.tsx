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
  // { label: 'CONTACTO', href: '/contact' },
  // { label: 'FAQ', href: '/faq' },
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

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex min-h-[35vh] flex-none basis-auto items-start justify-end py-6 pl-16 max-md:fixed max-md:right-0 max-md:min-h-0 md:basis-[260px]">
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
        <ul className="m-0 pr-4 flex list-none flex-col gap-2 p-0">
          {NAV_LINKS.map((item) => (
            <div key={item.href} className="mt-6 pr-2 group text-right">
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
                    'hidden flex-col text-right transition-all duration-300 ease-out',
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
                      className="block pt-6 font-display font-extrabold text-xl text-foreground/70 hover:text-primary"
                      onClick={() => setOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 mb-4 pr-2 group text-right">
            <Link
              href="/login"
              className="block font-display text-3xl font-extrabold leading-none transition-colors hover:text-primary"
              onClick={() => setOpen(false)}
            >
              LOGIN
            </Link>
          </div>
        </ul>
      </nav>
    </header>
  );
}
