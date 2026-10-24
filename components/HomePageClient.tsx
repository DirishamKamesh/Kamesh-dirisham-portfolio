'use client';

import React, { useState } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { SelectedWorkSection } from '@/components/sections/SelectedWorkSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { AboutAndProcessSection } from '@/components/sections/AboutAndProcessSection';
import { ContactSection } from '@/components/sections/ContactSection';

export function HomePageClient() {
  const [selectedService, setSelectedService] = useState<string>('');

  return (
    <main id="main-content" className="min-h-screen bg-[#F1FAEE] text-[#1D3557]">
      <HeroSection />
      <SelectedWorkSection />
      <ServicesSection
        onSelectServiceForInquiry={(serviceTitle) => setSelectedService(serviceTitle)}
      />
      <SkillsSection />
      <AboutAndProcessSection />
      <ContactSection key={selectedService} preselectedService={selectedService} />
    </main>
  );
}
