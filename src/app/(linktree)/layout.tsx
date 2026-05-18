import { PublicFooter } from '@/components/layout/public-footer';

export default function LinkTreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* flex flex-col ?????? */}
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
