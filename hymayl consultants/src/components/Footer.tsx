import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, MessageSquare, ArrowUpRight, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05070B] border-t border-white/10 text-slate-400 text-xs">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden border border-red-500/30 bg-black flex-shrink-0">
                <img src="/logo.png" alt="Humayl Consultants" className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <div className="brand-font text-xl font-bold tracking-wider text-white">HUMAYL</div>
                <div className="text-xs font-semibold tracking-widest text-red-500 uppercase">CONSULTANTS</div>
                <div className="text-[10px] text-slate-400">SMC (PVT) LIMITED</div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Pakistan’s premier PM&DC-recognized overseas educational consultancy. Authorized representative for 43 MOE-listed Chinese medical universities and top C9 engineering academies.
            </p>

            <div className="flex items-center gap-2 pt-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SECP Corporate Registered • PM&DC & MOE Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Study Programs</h4>
            <ul className="space-y-2.5">
              <li><a href="#mbbs" className="hover:text-red-400 transition-colors">MBBS in China (English)</a></li>
              <li><a href="#mbbs" className="hover:text-red-400 transition-colors">Dentistry (BDS in China)</a></li>
              <li><a href="#mbbs" className="hover:text-red-400 transition-colors">AI & Computer Science</a></li>
              <li><a href="#mbbs" className="hover:text-red-400 transition-colors">CSC Full Scholarships</a></li>
              <li><a href="#mbbs" className="hover:text-red-400 transition-colors">March Spring Intake 2025</a></li>
            </ul>
          </div>

          {/* Pakistan Offices */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Pakistan Offices</h4>
            <div className="space-y-3">
              <div>
                <strong className="text-white block mb-0.5">Lahore Head Office:</strong>
                <p className="text-[11px] text-slate-400">Suite 402, Al-Hafeez Heights, Ghalib Rd, Gulberg III, Lahore.</p>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Islamabad Branch:</strong>
                <p className="text-[11px] text-slate-400">Ground Floor, Beverly Centre, Blue Area, Islamabad.</p>
              </div>
              <div className="pt-1 flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-red-400" />
                <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
              </div>
            </div>
          </div>

          {/* China Ground Offices */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">China Ground Offices</h4>
            <div className="space-y-3">
              <div>
                <strong className="text-white block mb-0.5">Changsha Center:</strong>
                <p className="text-[11px] text-slate-400">International Student Liaison Hub, Yuelu District, Changsha, Hunan.</p>
              </div>
              <div>
                <strong className="text-white block mb-0.5">Wuhan Office:</strong>
                <p className="text-[11px] text-slate-400">Optics Valley Sci-Tech Hub, Hongshan District, Wuhan, Hubei.</p>
              </div>
              <div className="pt-1">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Airport Pickup & Wardens Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-white/5 bg-[#030407] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Humayl Consultants SMC (Pvt) Limited. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Direct University Account Transfers Only</span>
            <span>•</span>
            <a href="#trust" className="hover:text-red-400">Payment & Refund Policy</a>
            <span>•</span>
            <a href="#trust" className="hover:text-red-400">Privacy & Terms</a>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Floating WhatsApp Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#07090E]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center justify-between gap-3">
        <a
          href="tel:+923000000000"
          className="flex-1 py-3 bg-[#151C28] border border-white/10 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 text-center"
        >
          <Phone className="w-4 h-4 text-slate-300" />
          <span>Call Helpline</span>
        </a>
        <a
          href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20am%20interested%20in%20China%20Admissions%202025"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 text-center shadow-lg shadow-red-900/40"
        >
          <MessageSquare className="w-4 h-4 text-emerald-300" />
          <span>Chat WhatsApp</span>
        </a>
      </div>
    </footer>
  );
};
