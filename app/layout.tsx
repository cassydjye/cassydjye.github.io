import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cassydjye.github.io'),
  title: 'Seedjye Malbrouck — Software Development Student',
  description:
    'Portfolio of Seedjye Malbrouck, a software development student at Epitech La Réunion working with C, web technologies and mobile development.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Seedjye Malbrouck — Software Development Student',
    description: 'Selected projects in systems programming, web development and mobile applications.',
    url: 'https://cassydjye.github.io',
    siteName: 'Seedjye Malbrouck',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
