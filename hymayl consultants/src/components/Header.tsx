import React, { useState } from 'react';
import { Phone, ShieldCheck, MapPin, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenCalculator: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090E]/90 backdrop-blur-xl border-b border-white/10 transition-all">
      {/* Top Advisory Ticker */}
      <div className="bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-white text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-semibold tracking-wide uppercase">Spring / Fall 2025 Intake Alert:</span>
            <span className="hidden sm:inline text-red-100">43 MOE-Approved English Medium Medical Universities Enrollment Live</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-red-100">
              <ShieldCheck className="w-3.5 h-3.5" /> PM&DC 2025 Compliant
            </span>
            <span className="hidden md:flex items-center gap-1 text-red-100">
              <MapPin className="w-3.5 h-3.5" /> Lahore • Islamabad • Changsha (China)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Corporate Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-red-500/30 group-hover:border-red-500/80 transition-colors shadow-lg shadow-red-900/20 bg-black">
              <img 
                src="/logo.png" 
                alt="Humayl Consultants Logo" 
                className="w-full h-full object-contain p-0.5 transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="brand-font text-xl md:text-2xl font-bold tracking-wider text-white">HUMAYL</span>
                <span className="text-xs md:text-sm font-semibold tracking-widest text-red-500 uppercase">CONSULTANTS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-wider text-slate-400 font-medium uppercase">SMC (PVT) LIMITED</span>
                <span className="text-slate-600">•</span>
                <span className="text-[10px] tracking-wide text-red-400/90 font-medium">Overseas Educational Advisory</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#mbbs" className="hover:text-red-400 transition-colors">MBBS in China</a>
            <a href="#programs" className="hover:text-red-400 transition-colors">Top Universities</a>
            <a href="#process" className="hover:text-red-400 transition-colors">4-Step Admission</a>
            <a href="#career" className="hover:text-red-400 transition-colors">NLE & Career Hub</a>
            <a href="#trust" className="hover:text-red-400 transition-colors">Parent Trust Vault</a>
            <a href="#faq" className="hover:text-red-400 transition-colors">FAQs</a>
          </nav>

          {/* Action Hub */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20China%20Admissions%202025" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all hover:border-slate-500"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Helpline</span>
            </a>

            <button 
              onClick={onOpenCalculator}
              className="relative group overflow-hidden rounded-lg p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-rose-500 to-red-700 rounded-lg group-hover:opacity-100 transition-opacity" />
              <div className="relative px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-red-700/30 group-hover:shadow-red-600/50 transition-all">
                <span>Check Eligibility (60s)</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-3">
            <a href="#mbbs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-red-400 font-medium">MBBS in China (MOE Approved)</a>
            <a href="#programs" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-red-400 font-medium">University Explorer & Fees</a>
            <a href="#process" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-red-400 font-medium">4-Step Admission Journey</a>
            <a href="#career" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-red-400 font-medium">NLE Licensing & Mentorship</a>
            <a href="#trust" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-red-400 font-medium">Parent Trust & Halal Living</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 hover:text-red-400 font-medium">Frequently Asked Questions</a>
            
            <div className="pt-3 flex flex-col gap-2">
              <button 
                onClick={() => { setMobileMenuOpen(false); onOpenCalculator(); }}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm text-center shadow-lg shadow-red-900/30"
              >
                60-Second Eligibility & Fee Calculator
              </button>
              <a 
                href="https://wa.me/923000000000" 
                className="w-full py-2.5 bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-lg text-sm text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                Chat on WhatsApp (+92 300 0000000)
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
