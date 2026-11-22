import React from 'react';
import { Award, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ScholarshipsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Scholarships in China (2025)</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B0F17] via-[#141B28] to-[#0B0F17] border border-white/10 p-8 sm:p-12 mb-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold mb-4 shadow-lg shadow-amber-950/30">
              <Award className="w-4 h-4 text-amber-400" />
              <span>CSC & Belt-Road Fully-Funded Opportunities</span>
            </div>
            
            <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              SCHOLARSHIPS IN CHINA FOR <br />
              <span className="text-gradient-gold">PAKISTANI STUDENTS (2025)</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              China offers the world's most generous higher education funding packages for Master's and PhD candidates, covering 100% tuition, luxury single-room accommodation, and monthly living allowances up to 3,500 RMB. Learn how to secure genuine funding.
            </p>

            <a
              href="https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20evaluation%20for%20CSC%20Scholarship%202025"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-amber-950/40 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply for CSC / University Scholarship</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Scholarship Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-amber-500/40 transition-all shadow-xl">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-amber-950 text-amber-300 border border-amber-500/30">
              Type A & B
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">CSC Chinese Government Scholarship</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              100% Free Tuition + Free Single Room Hostel + Monthly Stipend: MS (3,000 RMB/mo) | PhD (3,500 RMB/mo).
            </p>
            <span className="text-xs text-amber-400 font-semibold">Postgraduate & PhD</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/40 transition-all shadow-xl">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-red-950 text-red-300 border border-red-500/30">
              B&R Initiative
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">Silk Road Program Scholarships</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Designed specifically for Pakistani students under CPEC for Engineering, Artificial Intelligence, Energy, and Agriculture.
            </p>
            <span className="text-xs text-red-400 font-semibold">BS, MS & PhD</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-emerald-500/40 transition-all shadow-xl">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Institutional
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">Presidential & Dean Grants</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Direct awards by universities (e.g. Zhengzhou, Ningxia, Jiangsu) covering 50% to 100% tuition fees based on admission merit.
            </p>
            <span className="text-xs text-emerald-400 font-semibold">Undergraduate & Masters</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-purple-500/40 transition-all shadow-xl">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-purple-950 text-purple-300 border border-purple-500/30">
              Provincial
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">Provincial Government Awards</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Grants funded by provincial governments (Zhejiang, Jiangsu, Guangdong, Sichuan) offering lump-sum awards up to 30,000 RMB.
            </p>
            <span className="text-xs text-purple-300 font-semibold">All Disciplines</span>
          </div>
        </div>

        {/* Crucial Reality Check: MBBS Scholarships Truth */}
        <div className="p-8 rounded-3xl bg-[#0B0F17] border border-amber-500/40 mb-16 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/70 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 flex-wrap">
                <span>The Honest Truth About MBBS Scholarships (Zero False Marketing)</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">Parent Advisory</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Be extremely wary of agents advertising "100% Fully-Funded Free MBBS for Pakistani Students". The Chinese Government Scholarship Council (CSC) does <strong>not</strong> sponsor undergraduate clinical MBBS programs for fresh high school applicants. 
              </p>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-200">
                <strong className="text-amber-400 block mb-1">What IS Genuine & Verifiable:</strong>
                Top MOE universities award <strong>Annual Academic Merit Scholarships</strong> (ranging from 5,000 to 20,000 RMB/year) to top-performing Pakistani students starting from 2nd year onwards based on academic semester GPA.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
