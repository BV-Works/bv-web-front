import Link from 'next/link'
import { ArrowRight, Music, Users, Mic2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance">
              The platform for
              <br />
              <span className="text-muted-foreground">musical profiles</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Create your artist profile, share your music links, and connect with your audience. 
              A simple and elegant way to manage your online presence.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/team">
                  View Team
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section
        <section className="border-t py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-3xl font-bold tracking-tight mb-12">
              Everything you need
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Music className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Music Links</h3>
                <p className="text-muted-foreground">
                  Add links to all your streaming platforms in one place. Spotify, Apple Music, YouTube, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Team Profiles</h3>
                <p className="text-muted-foreground">
                  Showcase your team members with individual profiles. Perfect for labels, collectives, and agencies.
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Mic2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Artist Pages</h3>
                <p className="text-muted-foreground">
                  Create beautiful, mobile-first landing pages for artists. Share everywhere with a single link.
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section
        <section className="border-t py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our community of artists and music professionals.
            </p>
            <Button asChild>
              <Link href="/login">
                Log in to your account
              </Link>
            </Button>
          </div>
        </section> */}
      </main>
      <PublicFooter />
    </div>
  )
}