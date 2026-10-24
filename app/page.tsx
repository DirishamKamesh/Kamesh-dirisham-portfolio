import React from 'react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { HomePageClient } from '@/components/HomePageClient';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1FAEE] text-[#1D3557]">
      <SiteHeader />
      <HomePageClient />
      <SiteFooter />
    </div>
  );
}
