import React from 'react';
import { Phone, MapPin, ShieldCheck, MessageSquare, Clock, Globe2, Award, HeartHandshake } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#030508] border-t border-white/[0.08] text-slate-400 text-xs pb-28 sm:pb-8">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 rounded-xl overflow-hidden border border-red-500/40 shadow-lg shadow-red-950/40 bg-black p-0.5">
                <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-black relative">
                  <img 
                    src="/logo.png" 
                    alt="Humayl Consultants Emblem" 
                    className="w-[125%] h-[125%] max-w-none object-cover object-[center_28%]" 
                  />
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="brand-font text-xl font-black tracking-wider text-gradient-silver">HUMAYL</span>
                  <span className="text-xs font-black tracking-widest text-gradient-red uppercase">CONSULTANTS</span>
                </div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">SMC (PVT) LIMITED</div>
              </div>
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Pakistan’s premier PM&DC-recognized overseas educational consultancy. Authorized representative for 43 MOE-listed Chinese medical universities and top C9 engineering academies.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>SECP Corporate Registered • PM&DC & MOE Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/[0.08] pb-1.5">
              Explore Pages
            </h4>
            <ul className="space-y-2">
              <li><Link to="/mbbs-in-china" className="hover:text-red-400 transition-colors block py-0.5">MBBS in China (English)</Link></li>
              <li><Link to="/programs" className="hover:text-red-400 transition-colors block py-0.5">University Directory</Link></li>
              <li><Link to="/scholarships" className="hover:text-red-400 transition-colors block py-0.5">CSC Full Scholarships</Link></li>
              <li><Link to="/admission-process" className="hover:text-red-400 transition-colors block py-0.5">Visa & Admission Guide</Link></li>
              <li><Link to="/life-in-china" className="hover:text-red-400 transition-colors block py-0.5">Halal Food & Campus Life</Link></li>
              <li><Link to="/career-licensing" className="hover:text-red-400 transition-colors block py-0.5">NLE Licensing & Careers</Link></li>
            </ul>
          </div>

          {/* Pakistan Offices */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/[0.08] pb-1.5">
              Pakistan Centers
            </h4>
            <div className="space-y-3">
              <div>
                <strong className="text-white block mb-0.5">Lahore Head Office:</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">Suite 402, Al-Hafeez Heights, Ghalib Rd, Gulberg III, Lahore.</p>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Islamabad Branch:</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">Ground Floor, Beverly Centre, Blue Area, Islamabad.</p>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
              </div>
            </div>
          </div>

          {/* China Ground Offices */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 sm:mb-4 border-b border-white/[0.08] pb-1.5">
              China Ground Hubs
            </h4>
            <div className="space-y-3">
              <div>
                <strong className="text-white block mb-0.5">Changsha Hub:</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">International Student Liaison Hub, Yuelu District, Changsha, Hunan.</p>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Wuhan Center:</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed">Optics Valley Sci-Tech Hub, Hongshan District, Wuhan, Hubei.</p>
              </div>
              <div className="pt-1">
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 inline-block font-semibold">
                  Airport Reception & Wardens Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/[0.06] bg-[#020305] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Humayl Consultants SMC (Pvt) Limited. All Rights Reserved. SECP Corporate Registration.
          </div>
          <div className="flex items-center justify-center gap-4">
            <Link to="/about-us" className="hover:text-red-400">About Us</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-red-400">Offices & Maps</Link>
            <span>•</span>
            <Link to="/apply" className="hover:text-red-400">Apply Online 2025</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
