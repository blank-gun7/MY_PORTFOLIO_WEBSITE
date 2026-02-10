import { JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Analytics } from '@vercel/analytics/react';

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://your-site.vercel.app'),
  title: 'Rana Raunitraz Singh | ML Engineer & Full-Stack Developer',
  description: 'AI/ML engineer building scalable LLM systems and financial AI platforms.',
  openGraph: {
    title: 'Rana Raunitraz Singh | ML Engineer & Full-Stack Developer',
    description: 'AI/ML engineer building scalable LLM systems and financial AI platforms.',
    url: 'https://your-site.vercel.app',
    siteName: 'Rana Raunitraz Singh',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rana Raunitraz Singh - ML Engineer & Full-Stack Developer',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rana Raunitraz Singh | ML Engineer & Full-Stack Developer',
    description: 'AI/ML engineer building scalable LLM systems and financial AI platforms.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `
(function() {
  var theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Rana Raunitraz Singh',
              url: 'https://your-site.vercel.app',
              jobTitle: 'ML Engineer & Full-Stack Developer',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'BITS Pilani, Hyderabad Campus',
              },
              sameAs: ['https://github.com/blank-gun7', 'https://linkedin.com/in/rrrs-024a94250/'],
            }),
          }}
        />
      </head>
      <body
        className="bg-bg-primary text-text-primary font-sans antialiased"
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-green focus:text-bg-primary focus:rounded-md focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
