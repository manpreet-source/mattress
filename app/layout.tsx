import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Mattress Match Score — Find Your Match', description: 'A transparent, personalized mattress finder built around how you actually sleep.' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="noise">{children}</body></html>;
}
