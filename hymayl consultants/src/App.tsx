import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EligibilityCalculator } from './components/EligibilityCalculator';
import { UniversityExplorer } from './components/UniversityExplorer';
import { FourStepProcess } from './components/FourStepProcess';
import { DbcCareerMentorship } from './components/DbcCareerMentorship';
import { TrustVault } from './components/TrustVault';
import { ParentFAQ } from './components/ParentFAQ';
import { Footer } from './components/Footer';

export function App() {
  const scrollToCalculator = () => {
    const calcElement = document.getElementById('calculator');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      {/* Header with Sticky Advisory Ribbon */}
      <Header onOpenCalculator={scrollToCalculator} />

      {/* Hero Section */}
      <main className="flex-grow">
        <Hero onOpenCalculator={scrollToCalculator} />

        {/* 60-Second Eligibility & Fee Calculator */}
        <EligibilityCalculator />

        {/* Verified University Explorer with Live Fee Converter */}
        <UniversityExplorer />

        {/* 4-Step Transparent Journey (CAS Standard) */}
        <FourStepProcess />

        {/* DreambigCareer Style NLE & Mentorship Hub */}
        <DbcCareerMentorship />

        {/* Institutional Trust Vault & Parent Assurance */}
        <TrustVault />

        {/* Deep Objection-Destroying FAQ */}
        <ParentFAQ />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;
