import React from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HomePageClient } from '@/components/HomePageClient';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <SiteHeader />
      <HomePageClient />
      <SiteFooter />
    </div>
  );
}
