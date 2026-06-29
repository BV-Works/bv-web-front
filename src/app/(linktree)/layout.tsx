import { PublicShell } from '@/components/layout/public-shell';

export default function LinkTreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicShell variant="home" showHeader={false}>
      {children}
    </PublicShell>
  );
}
