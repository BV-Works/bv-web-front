import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PublicHeader } from '@/components/layout/public-header';
import { PublicFooter } from '@/components/layout/public-footer';
import { PublicShell } from '@/components/layout/public-shell';

export default function HomePage() {
  return (
    // <div className="flex min-h-screen flex-col">
    //   <PublicHeader />
    //   <main className="flex-1">
    //     {/* Hero Section */}
    //     <section className="py-20 md:py-32">
    //       <div className="container mx-auto px-4 text-center">
    //         <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
    //           The platform for
    //           <br />
    //           <span className="text-muted-foreground">musical profiles</span>
    //         </h1>
    //         <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
    //           Create your artist profile, share your music links, and connect with your audience. A
    //           simple and elegant way to manage your online presence.
    //         </p>
    //         <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
    //           <Button asChild size="lg">
    //             <Link href="/login">
    //               Get Started
    //               <ArrowRight className="ml-2 h-4 w-4" />
    //             </Link>
    //           </Button>
    //           <Button asChild variant="outline" size="lg">
    //             <Link href="/team">View Team</Link>
    //           </Button>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    //   <PublicFooter />
    // </div>

    <PublicShell intro background variant="home">
      <section className="relative px-12 py-16 max-md:px-6">
        <div className="flex flex-col">
          <p className="mb-4 mt-0 w-[68%] font-title text-[clamp(4.5rem,11vw,8rem)] font-extrabold leading-none text-ink max-[830px]:w-full max-[830px]:text-[4.5rem] max-[510px]:text-[3.5rem] max-[400px]:!text-[2.5rem] text-balance">
            BAJO VIGILANCIA MUSIC &amp; DESIGN
          </p>
          <p className="max-w-full text-justify text-base italic">
            En Bajo Vigilancia Music contamos con un equipo de creativos y profesionales en
            distintas disciplinas.
          </p>
          <h1 className="max-w-full text-justify text-base font-normal italic">
            Con años de experiencia en la industria, nos especializamos en ofrecer servicios de alta
            calidad para músicos, productores y artistas que buscan llevar su proyecto al siguiente
            nivel.
          </h1>
        </div>
      </section>
    </PublicShell>
  );
}
