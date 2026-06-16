import { cn } from '@/lib/utils/utils';
import Link from 'next/link';
const FOOTER_LINKS = [
  'POLÍTICA DE PRIVACIDAD',
  'TÉRMINOS Y CONDICIONES',
  'CONFIGURACIÓN DE COOKIES',
];

export function PublicFooter({ variant = 'corporate' }: { variant?: 'home' | 'corporate' }) {
  const isHome = variant === 'home';

  return (
    // <footer className="border-t bg-background">
    //   <div className="container mx-auto px-4 py-8">
    //     <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
    //       <p className="text-sm text-muted-foreground">
    //         <Link href="/">Bajo Vigilancia. All rights reserved.</Link>
    //       </p>
    //       <nav className="flex gap-6">
    //         <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
    //           Privacy
    //         </a>
    //         <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
    //           Terms
    //         </a>
    //         <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
    //           Contact
    //         </a>
    //       </nav>
    //     </div>
    //   </div>
    // </footer>

    <footer className={cn('relative text-center text-base', isHome ? 'bg-transparent' : 'bv-bg')}>
      <div className="flex flex-col items-center gap-2.5">
        <p className="mb-0 mt-4 font-display text-xl font-bold">
          <Link href="/">BAJO VIGILANCIA &copy;</Link>
        </p>

        <div className="mx-4 mb-3 mt-2 flex flex-wrap justify-center gap-2.5">
          {FOOTER_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-sm no-underline hover:text-foreground hover:underline"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="static mb-4 md:absolute md:bottom-4 md:right-4 md:mb-0">
        <a
          href="https://soundbetter.com/profiles/704126-bajovigilancia-music"
          rel="noopener noreferrer"
          target="_blank"
          title="BajoVigilancia Music profile on SoundBetter"
          className="inline-block"
        >
          {/* External SoundBetter badge */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="BajoVigilancia Music, Mixing and Mastering Engineer on SoundBetter"
            src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg"
            className="mx-auto w-16"
          />
        </a>
      </div>
    </footer>
  );
}
