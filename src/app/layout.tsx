import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Bajo Vigilancia - Musica & Design',
  description: 'Servicios de Mezcla, Mastering y Diseño Gráfico online. Estudio de Grabación en Asturias.',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}