import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Menu, X, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

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
      {/* Top Advisory Ticker - Mobile Optimized */}
      <div className="bg-gradient-to-r from-[#991B1B] via-[#DC2626] to-[#991B1B] text-white text-[11px] sm:text-xs font-medium py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0" />
            <span className="font-bold tracking-wide uppercase text-[10px] sm:text-xs flex-shrink-0">Spring/Fall 2025:</span>
            <span className="truncate text-red-100">43 MOE English Medical Colleges Open</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] sm:text-xs flex-shrink-0">
            <span className="flex items-center gap-1 text-red-100 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> PM&DC
            </span>
            <span className="hidden md:flex items-center gap-1 text-red-100">
              <MapPin className="w-3.5 h-3.5" /> Lahore • Islamabad • China
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Corporate Identity */}
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 sm:gap-3 group min-w-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg overflow-hidden border border-red-500/30 group-hover:border-red-500/80 transition-colors shadow-lg shadow-red-900/20 bg-black">
              <img 
                src="/logo.png" 
                alt="Humayl Consultants Logo" 
                className="w-full h-full object-contain p-0.5 transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span className="brand-font text-lg sm:text-2xl font-black tracking-wider text-white">HUMAYL</span>
                <span className="text-[10px] sm:text-sm font-bold tracking-widest text-red-500 uppercase">CONSULTANTS</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-400 font-medium truncate">
                <span className="uppercase">SMC (PVT) LTD</span>
                <span className="text-slate-600 hidden xs:inline">•</span>
                <span className="text-red-400/90 hidden sm:inline">Overseas Educational Advisory</span>
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

          {/* Desktop Action Hub */}
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

          {/* Mobile Action + Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <a 
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 sm:hidden"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="p-2.5 rounded-xl bg-[#141B26] border border-white/10 text-slate-200 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Overlay Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden fixed inset-x-0 top-[calc(4rem+1px)] sm:top-[calc(5rem+1px)] bottom-0 bg-[#07090E]/98 backdrop-blur-2xl border-t border-white/10 z-50 overflow-y-auto p-4 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 py-1 mb-1">
                Navigation Menu
              </div>
              {navLinks.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                    currentPath === item.path 
                      ? 'bg-red-950/60 text-red-400 border border-red-500/40' 
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
            
            <div className="pt-6 pb-20 border-t border-white/10 mt-6 flex flex-col gap-3">
              <Link 
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold rounded-xl text-xs text-center shadow-lg shadow-red-900/40 block"
              >
                Apply Online for 2025 Intake
              </Link>
              <a 
                href="https://wa.me/923000000000" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#141B26] border border-white/10 text-slate-200 font-semibold rounded-xl text-xs text-center flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp (+92 300 0000000)</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
