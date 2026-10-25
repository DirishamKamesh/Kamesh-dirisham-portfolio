'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TechStackSection } from '@/components/sections/TechStackSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AboutAndProcessSection } from '@/components/sections/AboutAndProcessSection';
import { GoogleDocsWorkspaceSection } from '@/components/sections/GoogleDocsWorkspaceSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function HomePageClient() {
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)]"
    >
      <HeroSection />
      <SelectedWorkSection />
      <ServicesSection
        onSelectServiceForInquiry={(serviceTitle) =>
          setSelectedService(serviceTitle)
        }
      />
      <TechStackSection />
      <SkillsSection />
      <AboutAndProcessSection />
      <GoogleDocsWorkspaceSection />
      <ContactSection
        key={selectedService}
        preselectedService={selectedService}
      />
    </main>
  );
}
