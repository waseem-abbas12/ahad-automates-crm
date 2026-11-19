import React, { useState } from 'react';
import { ShieldCheck, MapPin, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'MBBS in China', path: '/mbbs-in-china' },
    { label: 'All Programs', path: '/programs' },
    { label: 'Scholarships', path: '/scholarships' },
    { label: 'Admission & Visa', path: '/admission-process' },
    { label: 'Halal & Safety', path: '/life-in-china' },
    { label: 'NLE & Careers', path: '/career-licensing' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#07090E]/95 backdrop-blur-xl border-b border-white/10 transition-all">
      {/* Top Advisory Ticker */}
      <div className="bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-white text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="font-semibold tracking-wide uppercase">Spring / Fall 2025 Intake:</span>
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
          <Link to="/" className="flex items-center gap-3 group">
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
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-300">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`transition-colors py-1 ${
                  currentPath === item.path
                    ? 'text-red-400 border-b-2 border-red-500 font-bold'
                    : 'hover:text-red-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Hub */}
          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20China%20Admissions%202025" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 text-xs font-semibold transition-all hover:border-slate-500"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <Link
              to="/apply"
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-lg shadow-red-700/30 transition-all"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-white/10 space-y-2">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  currentPath === item.path ? 'text-red-400 font-bold' : 'text-slate-300 hover:text-red-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-3 flex flex-col gap-2">
              <Link 
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-xs text-center shadow-lg shadow-red-900/30 block"
              >
                Apply Online 2025
              </Link>
              <a 
                href="https://wa.me/923000000000" 
                className="w-full py-2.5 bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-lg text-xs text-center flex items-center justify-center gap-2"
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
