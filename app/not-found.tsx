import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--text-primary)]">
      <SiteHeader />
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-10 py-24"
      >
        <div className="max-w-xl w-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 sm:p-12 space-y-6">
          <p className="text-xs font-mono font-semibold text-[#A8DADC]">
            STATUS 404 · ROUTE NOT FOUND
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
            The requested page or project route does not exist.
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
            You can return to the main portfolio overview or jump directly to the
            verified project case studies.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[var(--accent-primary)] text-[var(--accent-primary-fg)] hover:bg-[#E63946] hover:text-[#F1FAEE] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Link>
            <Link
              href="/#work"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-strong)] hover:border-[#A8DADC] transition-colors"
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
