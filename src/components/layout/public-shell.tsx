import { cn } from '@/lib/utils/utils';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';
import { DecorativeCorners } from './decorative-corners';

type PageStyle = 'home' | 'corporate';

/**
 * `PageStyle` controls the background and aligns the main block to the bottom (used on the Home page).
 */

export function PublicShell({
  children,
  intro = false,
  background = false,
  variant = 'corporate',
}: {
  children: React.ReactNode;
  intro?: boolean;
  background?: boolean;
  variant?: PageStyle;
}) {
  //   const isHome = variant === 'home';
  return (
    <>
      <div className={cn('flex min-h-screen flex-col items-start', background && 'bv-bg')}>
        <div
          // className={cn(
          //   'flex min-h-screen flex-row-reverse items-start max-md:block',
          //   background && 'bv-bg'
          // )}
          className="flex flex-1 flex-row-reverse max-md:block"
        >
          <DecorativeCorners
            positions={['top-left', 'center-top', 'bottom-left', 'bottom-right']}
          />
          <div>
            <PublicHeader />
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <main
              className={cn(
                'relative flex min-w-0 flex-1 flex-col max-md:w-full',
                intro && 'justify-end'
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
