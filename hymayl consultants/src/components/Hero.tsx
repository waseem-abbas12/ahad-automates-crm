import React from 'react';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, ArrowRight, Sparkles, Building2, Globe2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

interface HeroProps {
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-16 md:py-24 bg-[#07090E]">
      {/* Background Radial Glow Accents (Ruby Crimson & Obsidian) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[400px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-0 w-[300px] h-[300px] bg-rose-700/10 blur-[100px] pointer-events-none" />

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Institutional Credibility Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-[10px] sm:text-xs font-semibold mb-6 shadow-inner shadow-red-900/30 backdrop-blur-sm max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
            <span className="truncate">Official Authorized Representative of Top Chinese Universities</span>
            <span className="hidden sm:inline text-red-400/60">•</span>
            <span className="hidden sm:inline text-slate-300">PM&DC / MOE Gazetted</span>
          </div>

          {/* Master Headline (Cinzel Display Font) */}
          <h1 className="brand-font text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-5 sm:mb-6">
            YOUR DIRECT, PM&DC-RECOGNIZED GATEWAY TO <br className="hidden sm:inline" />
            <span className="text-gradient-red">CHINA'S ELITE MEDICAL & TECH</span> UNIVERSITIES
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto px-1">
            Zero middle-man broker fees. Guaranteed <strong className="text-white font-semibold">100% English-medium</strong> medical admissions, direct university <strong className="text-white font-semibold">JW202 visa forms</strong>, and round-the-clock airport-to-dormitory on-ground support across China.
          </p>

          {/* High-Impact CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-red-900/40 transition-all flex items-center justify-center gap-2.5"
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Check Eligibility & Fee (60 Seconds)</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0" />
            </button>

            <Link
              to="/mbbs-in-china"
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 bg-[#0F141C] hover:bg-[#151C28] text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/10 hover:border-red-500/40 transition-all flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
              <span>Explore MOE Medical Colleges</span>
            </Link>
          </div>

          {/* Trust Matrix Banner (The 4 Non-Negotiable Pillars) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F141C]/90 border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">PM&DC Guaranteed</div>
              <div className="text-xs text-slate-400 leading-relaxed">Listed under official PM&DC approved foreign medical colleges directory.</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F141C]/90 border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">100% English Medium</div>
              <div className="text-xs text-slate-400 leading-relaxed">Official MOE gazette universities; no compulsory Chinese classroom medium.</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F141C]/90 border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">On-Ground in China</div>
              <div className="text-xs text-slate-400 leading-relaxed">Offices in Changsha & Wuhan for airport pickup, halal meals & dorm setup.</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F141C]/90 border border-white/5 hover:border-red-500/30 transition-all">
              <div className="w-9 h-9 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">Rs. 0 Hidden Charges</div>
              <div className="text-xs text-slate-400 leading-relaxed">Transparent university fees paid directly into university official bank accounts.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
