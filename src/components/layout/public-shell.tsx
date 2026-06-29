import { cn } from '@/lib/utils/utils';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';
import { DecorativeCorners, CornerPosition } from './decorative-corners';

type PublicShellVariant = 'home' | 'corporate';

/**
 * `PublicShellVariant` controls the background and aligns the main block to the bottom (used on the Home page).
 */

export function PublicShell({
  children,
  variant = 'corporate',
  showHeader = true,
}: {
  children: React.ReactNode;
  variant?: PublicShellVariant;
  showHeader?: boolean;
}) {
  const isHome = variant === 'home';
  const positions: CornerPosition[] = ['top-left', 'center-top', 'bottom-left', 'bottom-right'];

  if (!showHeader) {
    positions.push('top-right');
  }
  return (
    <>
      <div className={cn('flex min-h-screen flex-col', isHome && 'bv-bg')}>
        <div className="flex flex-1 flex-row-reverse max-md:block">
          <DecorativeCorners positions={positions} />
          {showHeader && (
            <div className="flex-none">
              <PublicHeader />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <main
              className={cn(
                'relative flex min-w-0 flex-1 flex-col max-md:w-full',
                isHome && 'justify-end'
              )}
            >
              {children}
            </main>
          </div>
        </div>
        <div className="flex w-full flex-none flex-col">
          <PublicFooter variant={variant} />
        </div>
      </div>
    </>
  );
}
