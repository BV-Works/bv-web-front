'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/profile/profile-card';
import type { Profile } from '@/types/profile';

interface ProfileCarouselProps {
  profiles: Profile[];
  basePath: string;
}

export function ProfileCarousel({ profiles, basePath }: ProfileCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [profiles]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 352;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (profiles.length === 0) {
    return <div className="py-12 text-center text-muted-foreground">No profiles found.</div>;
  }

  return (
    <div className="relative overflow-visible px-0 md:px-6">
      {/* Scroll buttons */}
      {canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="
          absolute 
          -left-3 md:-left-6
          top-1/2
          z-10
          flex
          h-10 w-10 md:h-12 md:w-12
          -translate-y-1/2
          rounded-none
          bg-transparent
          border-0
          shadow-none
          hover:bg-transparent"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-7 w-7 md:h-8 md:w-8 stroke-[2.5]" />
        </Button>
      )}

      {canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="
          absolute
          -right-3 md:-right-6
          top-1/2
          z-10
          flex
          h-10 w-10 md:h-12 md:w-12
          -translate-y-1/2
          rounded-none
          bg-transparent
          border-0
          shadow-none
          hover:bg-transparent"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-7 w-7 md:h-8 w-8 stroke-[2.5]" />
        </Button>
      )}

      {/* Cards container */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="bv-carousel-track flex gap-8 overflow-x-auto pb-4 px-2 md:px-10 lg:px-0 snap-x snap-proximity"
      >
        {profiles.map((profile) => (
          <div key={profile.id} className="min-w-[320px] max-w-[320px] snap-start">
            <ProfileCard profile={profile} basePath={basePath} />
          </div>
        ))}
      </div>
    </div>
  );
}
