import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import localFont from 'next/font/local';

// 1. Carga tus fuentes locales y asígnales una variable CSS
const primaryFont = localFont({
  src: './fonts/arisa-black-mango-regular.ttf',
  display: 'swap',
  variable: '--font-black-mango',
});

const secondaryFont = localFont({
  src: './fonts/arisa-futura-light.ttf',
  display: 'swap',
  variable: '--font-futura',
});


export const metadata: Metadata = {
  title: 'Arisa Bikini',
  description: 'Catálogo de trajes de baño',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${primaryFont.variable} ${secondaryFont.variable}`}>
      {/* 3. Usa la clase 'font-sans' para aplicar la fuente primaria por defecto */}
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
