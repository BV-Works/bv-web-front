import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';

/**
 * Brand fonts:
 * - Stara (ExtraBold/Bold) -> titles & navigation
 * - Helvetica Now Display   -> body copy
 */
const stara = localFont({
  variable: '--font-stara',
  display: 'swap',
  src: [
    { path: '../assets/fonts/Stara-Bold-BF65962709c55b4.otf', weight: '700', style: 'normal' },
    { path: '../assets/fonts/Stara-ExtraBold-BF659627090225d.otf', weight: '800', style: 'normal' },
  ],
});

const helvetica = localFont({
  variable: '--font-helvetica',
  display: 'swap',
  src: [
    { path: '../assets/fonts/HelveticaNowDisplay-Light.otf', weight: '300', style: 'normal' },
    {
      path: '../assets/fonts/HelveticaNowDisplayRegular-5760477.ttf',
      weight: '400',
      style: 'normal',
    },
    { path: '../assets/fonts/HelveticaNowDisplay-Black.otf', weight: '900', style: 'normal' },
  ],
});

export const metadata: Metadata = {
  title: 'Bajo Vigilancia - Musica & Design',
  description:
    'Servicios de Mezcla, Mastering y Diseño Gráfico online. Estudio de Grabación en Asturias.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${stara.variable} ${helvetica.variable}`}>
      {/* <body className="flex min-h-screen flex-col font-sans"> */}
      <body className="flex min-h-screen flex-col font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
