import React from 'react';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, ArrowRight, Sparkles, Building2, Globe2, FileCheck, Stethoscope, Star } from 'lucide-react';
import { Link } from '../context/RouterContext';

interface HeroProps {
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCalculator }) => {
  return (
    <div className="relative overflow-hidden pt-6 pb-16 md:py-24 bg-[#05070B]">
      {/* Background Radial Glow Accents (Faceted Ruby Crimson & Deep Obsidian) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[450px] bg-red-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-24 right-0 w-[350px] h-[350px] bg-rose-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-10 w-[250px] h-[250px] bg-red-950/30 blur-[100px] pointer-events-none" />

      {/* Decorative Grid Lines with Diamond Platinum Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Institutional Credibility Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-500/40 text-red-200 text-[10px] sm:text-xs font-bold mb-6 shadow-ruby-subtle backdrop-blur-md max-w-full">
            <Sparkles className="w-3.5 h-3.5 text-red-400 flex-shrink-0 animate-pulse" />
            <span className="truncate">Authorized Representative of Top Chinese National Universities</span>
            <span className="text-red-500/60 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-slate-200 font-semibold">100% PM&DC & MOE Gazetted</span>
          </div>

          {/* Master Headline (Cinzel Display Font with Platinum and Ruby Contrast) */}
          <h1 className="brand-font text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] mb-5 sm:mb-6">
            YOUR DIRECT, PM&DC-RECOGNIZED GATEWAY TO <br className="hidden sm:inline" />
            <span className="text-gradient-red">CHINA'S ELITE MEDICAL & TECH</span> UNIVERSITIES
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed mb-8 sm:mb-10 max-w-3xl mx-auto px-1">
            Zero middle-man broker fees. Guaranteed <strong className="text-white font-semibold">100% English-medium</strong> medical admissions, direct university <strong className="text-white font-semibold">JW202/DQ visa forms</strong>, and round-the-clock airport-to-dormitory on-ground support across China.
          </p>

          {/* High-Impact CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-7 sm:px-9 py-4 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-red-900/40 transition-all flex items-center justify-center gap-2.5 hover:shadow-ruby-glow group"
            >
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 group-hover:rotate-12 transition-transform" />
              <span>Check Eligibility & Fee (60 Seconds)</span>
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>

            <Link
              to="/mbbs-in-china"
              className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-[#0B0F17]/90 hover:bg-[#111622] text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/10 hover:border-red-500/40 transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 flex-shrink-0" />
              <span>Explore 43 MOE Medical Colleges</span>
            </Link>
          </div>

          {/* Institutional Numbers Banner (Credibility Proof) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12 text-center">
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-lg sm:text-2xl font-black text-white brand-font">43+</div>
              <div className="text-[10px] sm:text-xs text-red-400 font-semibold uppercase tracking-wider">MOE English Colleges</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-lg sm:text-2xl font-black text-white brand-font">100%</div>
              <div className="text-[10px] sm:text-xs text-emerald-400 font-semibold uppercase tracking-wider">Visa Success Ratio</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-lg sm:text-2xl font-black text-white brand-font">2,000+</div>
              <div className="text-[10px] sm:text-xs text-slate-300 font-semibold uppercase tracking-wider">Pakistani Students Placed</div>
            </div>
            <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <div className="text-lg sm:text-2xl font-black text-white brand-font">Rs. 0</div>
              <div className="text-[10px] sm:text-xs text-amber-400 font-semibold uppercase tracking-wider">Hidden Broker Charges</div>
            </div>
          </div>

          {/* Trust Matrix Banner (The 4 Non-Negotiable Pillars) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17]/95 border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 hover:shadow-ruby-subtle group">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">PM&DC Guaranteed</div>
              <div className="text-xs text-slate-400 leading-relaxed">Listed under official PM&DC approved foreign medical colleges directory for direct NOC.</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17]/95 border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 hover:shadow-ruby-subtle group">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">100% English Medium</div>
              <div className="text-xs text-slate-400 leading-relaxed">Official MOE gazette universities; full curriculum and examinations conducted in English.</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17]/95 border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 hover:shadow-ruby-subtle group">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400 group-hover:scale-105 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">On-Ground in China</div>
              <div className="text-xs text-slate-400 leading-relaxed">Offices in Changsha & Wuhan for airport pickup, halal meals & biometric dorm setup.</div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17]/95 border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 hover:shadow-ruby-subtle group">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center mb-3 text-red-400 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-white font-bold text-sm mb-1">Direct Bank Remittance</div>
              <div className="text-xs text-slate-400 leading-relaxed">Transparent university fees paid directly into university official corporate bank accounts.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
