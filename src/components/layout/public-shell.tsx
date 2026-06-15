import { cn } from '@/lib/utils/utils';
import { PublicHeader } from './public-header';
import { PublicFooter } from './public-footer';
import { DecorativeCorners } from './decorative-corners';

type PageStyle = 'home' | 'corporate';

/**
 * Shared page shell reproducing the original `row-reverse` layout:
 * the vertical navigation sits on the right, content fills the left,
 * and the footer spans full width underneath.
 *
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
      <div
        className={cn(
          'flex flex-1 flex-row-reverse items-start max-md:block',
          background && 'bv-bg'
        )}
      >
        <PublicHeader />
        <main
          className={cn(
            'relative flex min-w-0 flex-1 flex-col max-md:w-full',
            intro && 'place-self-end'
          )}
        >
          <DecorativeCorners
            positions={['top-left', 'center-top', 'bottom-left', 'bottom-right']}
          />
          {children}
        </main>
      </div>
      <PublicFooter variant={variant} />
    </>
  );
}
