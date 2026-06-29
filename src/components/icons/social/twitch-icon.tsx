import { cn } from '@/lib/utils/utils';

interface IconProps {
  className?: string;
}

export function TwitchIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('h-5 w-5', className)}
      aria-hidden="true"
    >
      <path d="M4 2L2 7v13h6v3h4l3-3h4l5-5V2H4zm16 11-4 4h-5l-3 3v-3H4V4h16v9zM14 7v5h2V7h-2zm-5 0v5h2V7H9z" />
    </svg>
  );
}
