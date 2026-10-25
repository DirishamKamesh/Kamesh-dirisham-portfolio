import type { Metadata, Viewport } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { profileData } from '@/data/profile';
import { CustomCursor } from '@/components/ui/CustomCursor';

const syne = Syne({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0D1929',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Dirisham Kamesh — Frontend Developer & UI Engineer',
  description:
    'Personal portfolio of Dirisham Kamesh, a computer science undergraduate at Vignan, Duvvada specializing in frontend engineering, interactive web interfaces, and React applications.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Dirisham Kamesh — Frontend Developer & UI Engineer',
    description:
      'Personal portfolio of Dirisham Kamesh, a computer science undergraduate at Vignan, Duvvada specializing in frontend engineering, interactive web interfaces, and React applications.',
    type: 'website',
    siteName: 'Dirisham Kamesh Portfolio',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Dirisham Kamesh — Frontend Developer & UI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dirisham Kamesh — Frontend Developer & UI Engineer',
    description:
      'Personal portfolio of Dirisham Kamesh, a computer science undergraduate at Vignan, Duvvada specializing in frontend engineering, interactive web interfaces, and React applications.',
    images: ['/og-image.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profileData.fullName,
    jobTitle: profileData.roleTitle,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: profileData.education.institution,
    },
    sameAs: [
      profileData.contact.githubUrl,
      profileData.contact.linkedinUrl,
      profileData.contact.instagramUrl,
    ],
  };

  const themeInitScript = `
    try {
      var saved = localStorage.getItem('dk-portfolio-theme');
      var theme = (saved === 'light' || saved === 'dark') ? saved : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.style.colorScheme = theme;
    } catch (e) {}
  `;

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${syne.variable} ${jakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[var(--bg-canvas)] text-[var(--text-primary)] font-sans antialiased selection:bg-[#A8DADC] selection:text-[#0D1929] overflow-x-hidden"
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#A8DADC] focus:text-[#0D1929] focus:font-mono focus:text-xs focus:font-semibold"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
