import React from 'react';
import { Hero } from '../components/Hero';
import { EligibilityCalculator } from '../components/EligibilityCalculator';
import { FourStepProcess } from '../components/FourStepProcess';
import { DbcCareerMentorship } from '../components/DbcCareerMentorship';
import { TrustVault } from '../components/TrustVault';
import { ParentFAQ } from '../components/ParentFAQ';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { ShieldCheck, Stethoscope, Award, Laptop, ArrowRight, CheckCircle2, Sparkles, Building2, MapPin } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const HomePage: React.FC = () => {
  const scrollToCalculator = () => {
    const calc = document.getElementById('calculator');
    if (calc) calc.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Master Hero */}
      <Hero onOpenCalculator={scrollToCalculator} />

      {/* Featured Pathways Strip (4 High-Ticket Portals) */}
      <div className="py-12 bg-[#070A10] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link
              to="/mbbs-in-china"
              className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-red-500/50 transition-all duration-300 group flex items-start gap-4 hover:shadow-ruby-subtle"
            >
              <div className="w-11 h-11 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span>MBBS in China</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-red-400" />
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">43 MOE English Medical Colleges with guaranteed PM&DC NOC.</p>
              </div>
            </Link>

            <Link
              to="/programs"
              className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-red-500/50 transition-all duration-300 group flex items-start gap-4 hover:shadow-ruby-subtle"
            >
              <div className="w-11 h-11 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span>AI, CS & Engineering</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-red-400" />
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">World Top 50 Tech, Robotics & Software degrees taught in English.</p>
              </div>
            </Link>

            <Link
              to="/scholarships"
              className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-amber-500/50 transition-all duration-300 group flex items-start gap-4 hover:shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-950/70 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <span>CSC Scholarships</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-amber-400" />
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">100% Free Tuition + Luxury Dormitory + Monthly Stipend up to 3,500 RMB.</p>
              </div>
            </Link>

            <Link
              to="/life-in-china"
              className="p-5 rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-emerald-500/50 transition-all duration-300 group flex items-start gap-4 hover:shadow-lg"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Halal Food & Safety</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400" />
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Dedicated Muslim canteens & biometric-guarded female student dorms.</p>
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* Interactive 60-Second Eligibility Engine */}
      <EligibilityCalculator />

      {/* Featured Medical Universities Showcase */}
      <div className="py-20 bg-[#05070B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MOE & PM&DC Gazette Prime Selection</span>
              </div>
              <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white">
                FEATURED CHINESE MEDICAL UNIVERSITIES
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Direct authorized admissions with transparent first-year university packages.
              </p>
            </div>

            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B0F17] border border-white/10 hover:border-red-500/40 text-xs font-bold text-white transition-all shadow-md group"
            >
              <span>Explore All 43 Universities</span>
              <ArrowRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UNIVERSITIES.slice(0, 3).map(univ => {
              const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
              return (
                <div 
                  key={univ.id} 
                  className="rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-2xl hover:shadow-red-950/30"
                >
                  <Link to={`/university/${univ.id}`} className="h-48 relative overflow-hidden block">
                    <img 
                      src={univ.image} 
                      alt={univ.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md">
                        {univ.badge || 'Top Choice'}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                        PM&DC Approved
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>{univ.city}, {univ.province}</span>
                    </div>
                  </Link>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium mb-1">{univ.chineseName}</div>
                      <Link
                        to={`/university/${univ.id}`}
                        className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-2 block"
                      >
                        {univ.name}
                      </Link>
                      <p className="text-xs text-slate-400 mb-4">{univ.ranking}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2.5 border-y border-white/[0.06] mb-4">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase block">Instruction</span>
                          <span className="text-white font-semibold">{univ.language}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase block">Intake</span>
                          <span className="text-red-400 font-semibold">{univ.intakeSeason}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-medium">Annual Tuition</span>
                        <span className="text-sm font-black text-white">
                          ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs
                        </span>
                        <span className="text-[10px] text-slate-400 block">≈ ¥{univ.tuitionFeeRMB.toLocaleString()} RMB</span>
                      </div>

                      <Link
                        to={`/university/${univ.id}`}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-red-900/30"
                      >
                        <span>Details & Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* The 4-Step CAS Process */}
      <FourStepProcess />

      {/* The DBC Career Mentorship */}
      <DbcCareerMentorship />

      {/* The Parent Trust Vault */}
      <TrustVault />

      {/* FAQ */}
      <ParentFAQ />
    </div>
  );
};
