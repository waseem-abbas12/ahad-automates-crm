import React, { useState, useEffect } from 'react';
import { ShieldCheck, MapPin, Menu, X, ArrowRight, MessageSquare, Phone, GraduationCap } from 'lucide-react';
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
    <>
      <header className="sticky top-0 z-50 w-full bg-[#05070B]/95 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
        {/* Top Advisory Ticker - Mobile Optimized with Ruby & Platinum Accents */}
        <div className="bg-gradient-to-r from-[#7F1D1D] via-[#DC2626] to-[#991B1B] text-white text-[11px] sm:text-xs font-medium py-1.5 px-3 sm:px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 truncate">
              <span className="inline-block w-2 h-2 rounded-full bg-white shadow-sm shadow-white animate-pulse flex-shrink-0" />
              <span className="font-extrabold tracking-wider uppercase text-[10px] sm:text-xs flex-shrink-0">Spring/Fall 2025:</span>
              <span className="truncate text-red-100 font-medium">Official 43 MOE English Medical Universities Now Enrolling</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] sm:text-xs flex-shrink-0">
              <span className="flex items-center gap-1 text-white font-bold bg-black/20 px-2 py-0.5 rounded-full border border-white/20">
                <ShieldCheck className="w-3.5 h-3.5 text-red-200" /> PM&DC / MOE Gazetted
              </span>
              <span className="hidden md:flex items-center gap-1 text-red-100 font-medium">
                <MapPin className="w-3.5 h-3.5 text-white" /> Lahore • Islamabad • China Ground Desk
              </span>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo & Corporate Identity - Optical Framing of 3D Platinum & Ruby Emblem */}
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2.5 sm:gap-3.5 group min-w-0">
              <div className="relative w-11 h-11 sm:w-13 sm:h-13 flex-shrink-0 rounded-xl overflow-hidden border border-red-500/40 group-hover:border-red-500 transition-all duration-300 shadow-lg shadow-red-950/40 bg-[#05070B] p-0.5">
                <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-black relative">
                  <div className="absolute inset-0 bg-red-600/10 blur-[6px] pointer-events-none" />
                  <img 
                    src="/logo.png" 
                    alt="Humayl Consultants Emblem" 
                    className="w-[125%] h-[125%] max-w-none object-cover object-[center_28%] transform group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="brand-font text-lg sm:text-2xl font-black tracking-wider text-gradient-silver">HUMAYL</span>
                  <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-gradient-red uppercase">CONSULTANTS</span>
                </div>
                <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-400 font-medium truncate">
                  <span className="uppercase text-slate-300 font-semibold tracking-wider">SMC (PVT) LIMITED</span>
                  <span className="text-slate-600 hidden xs:inline">•</span>
                  <span className="text-red-400/90 hidden sm:inline font-medium">Premier China Overseas Educational Advisory</span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav Items */}
            <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
              {navLinks.map((item, idx) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`relative px-3 py-1.5 rounded-lg transition-all ${
                      isActive
                        ? 'text-white font-bold bg-white/[0.06] border border-red-500/30 shadow-sm'
                        : 'hover:text-white hover:bg-white/[0.03]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-red-500 to-rose-400 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Action Hub */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a 
                href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20China%20Admissions%202025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-300 text-xs font-bold transition-all shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Desk</span>
              </a>

              <Link
                to="/apply"
                className="px-4 py-2 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-lg shadow-red-900/40 transition-all hover:shadow-ruby-glow"
              >
                <span>Apply Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Action + Hamburger */}
            <div className="flex xl:hidden items-center gap-2">
              <a 
                href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20inquire%20about%20China%20Study%202025" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 sm:hidden"
              >
                <MessageSquare className="w-4 h-4" />
              </a>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="p-2.5 rounded-xl bg-[#111622] border border-white/10 text-slate-200 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Fullscreen Overlay Drawer */}
          {mobileMenuOpen && (
            <div className="xl:hidden fixed inset-x-0 top-[calc(4rem+1px)] sm:top-[calc(5rem+1px)] bottom-0 bg-[#05070B]/98 backdrop-blur-2xl border-t border-white/10 z-50 overflow-y-auto p-4 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold px-3 py-1 mb-1 flex items-center justify-between">
                  <span>Navigation Directory</span>
                  <span className="text-red-400 font-semibold text-[9px] bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">10+ Pages</span>
                </div>
                {navLinks.map((item, idx) => {
                  const isActive = currentPath === item.path;
                  return (
                    <Link
                      key={idx}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive 
                          ? 'bg-red-950/60 text-red-300 border border-red-500/40 shadow-sm' 
                          : 'text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  );
                })}
              </div>
              
              <div className="pt-6 pb-28 border-t border-white/10 mt-6 flex flex-col gap-3">
                <Link 
                  to="/apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 text-white font-bold rounded-xl text-xs text-center shadow-lg shadow-red-900/40 block"
                >
                  Apply Online for 2025 Admissions
                </Link>
                <a 
                  href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20China%20Admissions" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs text-center flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Chat on WhatsApp (+92 300 0000000)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Floating Bottom Action Bar for Mobile Users (Steve Jobs Ergonomic Excellence) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-[#070A10]/95 backdrop-blur-2xl border-t border-white/10 p-2 sm:hidden flex items-center justify-around gap-2 shadow-2xl">
        <a
          href="tel:+923000000000"
          className="flex-1 py-2.5 px-2 bg-[#111622] border border-white/10 rounded-xl text-center text-[11px] font-bold text-slate-200 flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-red-400" />
          <span>Call Desk</span>
        </a>
        <a
          href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20admission%20details%20for%20China%202025"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-center text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <Link
          to="/apply"
          className="flex-1 py-2.5 px-2 bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-xl text-center text-[11px] font-bold flex items-center justify-center gap-1.5 shadow-md shadow-red-950/40"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Apply Now</span>
        </Link>
      </div>
    </>
  );
};
