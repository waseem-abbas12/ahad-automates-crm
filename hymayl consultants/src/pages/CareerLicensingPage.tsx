import React from 'react';
import { Stethoscope, Award, Laptop, Users2, CheckCircle2, ArrowRight, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const CareerLicensingPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Career Planning, NLE & USMLE Hub</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <Award className="w-3.5 h-3.5 text-red-400" />
            <span>The DreambigCareer (DBC) Advantage for Pakistani Graduates</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white mb-4">
            POST-GRADUATION LICENSING & CAREER BLUEPRINT
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Earning an MBBS or engineering degree in China is only step one. Humayl Consultants provides integrated coaching for PM&DC NLE, USMLE, and global tech corporate placements.
          </p>
        </div>

        {/* Medical Licensing Track */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0F17] border border-white/10 mb-12 shadow-2xl">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
                Pakistani Medical Practice
              </span>
              <h2 className="brand-font text-2xl font-bold text-white mt-1">
                PM&DC NLE Step 1 & Step 2 Preparation Roadmap
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
            Under Pakistan Medical and Dental Council regulations, all foreign medical graduates must pass the National Licensing Examination (NLE) to obtain a permanent license to practice and secure paid House Job slots in Pakistani teaching hospitals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#111622] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> NLE Step 1 (Theory Exam)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                200 MCQs covering Basic Medical Sciences & Clinical Disciplines. We provide online test series, Pakistani high-yield question banks, and lecture series from your 3rd year onwards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#111622] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> NLE Step 2 (Clinical OSCE)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hands-on clinical skills evaluation. China's massive Grade-A tertiary hospitals (5,000+ beds) provide hands-on clinical patient exposure that prepares you directly to excel in practical exams.
              </p>
            </div>
          </div>
        </div>

        {/* Global Pathways (USMLE & PLAB) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-blue-950 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              United States Residency
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-2">USMLE Step 1 & Step 2 CK</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All 43 MOE Chinese medical colleges are listed in the World Directory of Medical Schools (WDOMS) with valid ECFMG sponsor notes, allowing direct registration for USMLE examinations.
            </p>
            <span className="text-xs text-blue-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Full ECFMG Accreditation
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              United Kingdom Licensing
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-2">UK GMC MLA / PLAB Pathway</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Qualify for General Medical Council (GMC) UK registration through the Medical Licensing Assessment (MLA). Our alumni practice across NHS Trusts in England and Scotland.
            </p>
            <span className="text-xs text-purple-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> GMC Recognized Curriculum
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
