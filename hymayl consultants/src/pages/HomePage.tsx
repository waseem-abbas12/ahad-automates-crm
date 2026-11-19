import React from 'react';
import { Hero } from '../components/Hero';
import { EligibilityCalculator } from '../components/EligibilityCalculator';
import { FourStepProcess } from '../components/FourStepProcess';
import { DbcCareerMentorship } from '../components/DbcCareerMentorship';
import { TrustVault } from '../components/TrustVault';
import { ParentFAQ } from '../components/ParentFAQ';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { ShieldCheck, Stethoscope, Award, Laptop, ArrowRight, CheckCircle2 } from 'lucide-react';
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

      {/* Featured Pathways Strip */}
      <div className="py-12 bg-[#090D14] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              to="/mbbs-in-china"
              className="p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  MBBS in China
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">43 MOE English Medical Colleges with PM&DC NOC.</p>
              </div>
            </Link>

            <Link
              to="/programs"
              className="p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                  AI, CS & Engineering
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">World Top 50 Tech & Robotics degrees in English.</p>
              </div>
            </Link>

            <Link
              to="/scholarships"
              className="p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  CSC Scholarships
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">100% Free Tuition + Single Hostel + 3,500 RMB/mo.</p>
              </div>
            </Link>

            <Link
              to="/life-in-china"
              className="p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all group flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Halal Food & Safety
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Muslim canteens, female-only biometric dorms.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive 60-Second Eligibility Engine */}
      <EligibilityCalculator />

      {/* Featured Medical Universities Teaser */}
      <div className="py-16 bg-[#07090E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30 uppercase tracking-wider">
                MOE & PM&DC Gazette
              </span>
              <h2 className="brand-font text-2xl sm:text-3xl font-extrabold text-white mt-2">
                FEATURED CHINESE MEDICAL UNIVERSITIES
              </h2>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300"
            >
              <span>Explore All 43 Universities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UNIVERSITIES.slice(0, 3).map(univ => {
              const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
              return (
                <div key={univ.id} className="rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between overflow-hidden">
                  <div className="h-44 relative">
                    <img src={univ.image} alt={univ.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-[#0F141C]/30 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                        PM&DC Approved
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1">{univ.city}, {univ.province}</div>
                      <h4 className="text-base font-bold text-white mb-2">{univ.name}</h4>
                      <p className="text-xs text-slate-400 mb-4">{univ.ranking}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Annual Fee</span>
                        <span className="text-sm font-extrabold text-white">
                          ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs
                        </span>
                      </div>

                      <Link
                        to={`/university/${univ.id}`}
                        className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <span>Details</span>
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
