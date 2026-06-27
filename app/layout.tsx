import type { Metadata } from 'next';
import { Sora, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Waymesh Copilot',
  description: 'AI-powered travel intelligence for boutique agencies',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${hanken.variable} ${ibmMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-hanken), system-ui, sans-serif', WebkitFontSmoothing: 'antialiased', color: '#15140f' }}>
        {children}
      </body>
    </html>
  );
}
