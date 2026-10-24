import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F1FAEE] text-[#1D3557]">
      <SiteHeader />
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-24"
      >
        <div className="max-w-xl w-full bg-white border border-[#A8DADC] p-8 sm:p-12 space-y-6 shadow-[0_8px_30px_rgba(29,53,87,0.05)]">
          <p className="text-xs font-mono font-semibold text-[#E63946]">
            STATUS 404 · ROUTE NOT FOUND
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#1D3557] tracking-tight">
            The requested page or project route does not exist.
          </h1>
          <p className="text-sm sm:text-base text-[#457B9D] leading-relaxed">
            You can return to the main portfolio overview or jump directly to the verified
            project case studies.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[#E63946] text-[#F1FAEE] hover:bg-[#1D3557] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[#F1FAEE] text-[#1D3557] border border-[#457B9D] hover:border-[#E63946] hover:text-[#E63946] transition-colors"
            >
              <span>Browse Selected Work</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
