import Link from 'next/link';
import { DecorativeCorners } from '@/components/layout/decorative-corners';

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 bv-bg">
      <DecorativeCorners
        positions={[
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
          'center-top',
          'center-bottom',
        ]}
      />

      <Link
        href="/"
        className="
          absolute
          left-10
          top-10
          z-50
          font-display
          text-2xl
          font-extrabold
          tracking-tight
          text-foreground
          transition-colors
          hover:text-primary
        "
      >
        BAJO VIGILANCIA
      </Link>

      <div className="relative z-10 flex w-full justify-center">{children}</div>
    </div>
  );
}
