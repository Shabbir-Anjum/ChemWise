import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChemWise - AI Chemistry Assistant',
  description: 'Your intelligent chemistry companion for safe experiments, formulations, and calculations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}