import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Food Roulette',
  description: 'A little help deciding what to eat.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
