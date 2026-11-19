import React from 'react';
import { Award, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, GraduationCap, DollarSign } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ScholarshipsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Scholarships in China</span>
        </div>

        {/* Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0F141C] via-[#161D2B] to-[#0F141C] border border-white/10 p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4">
              <Award className="w-4 h-4" />
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
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-amber-950/40"
            >
              <span>Apply for CSC / University Scholarship</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 4 Scholarship Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#0F141C] border border-white/10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
              Type A & B
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">CSC Chinese Government Scholarship</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              100% Free Tuition + Free Single Room Hostel + Monthly Stipend: MS (3,000 RMB/mo) | PhD (3,500 RMB/mo).
            </p>
            <span className="text-xs text-amber-400 font-semibold">Postgraduate & PhD</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F141C] border border-white/10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30">
              B&R Initiative
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">Silk Road Program Scholarships</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Designed specifically for Pakistani students under CPEC for Engineering, Artificial Intelligence, Energy, and Agriculture.
            </p>
            <span className="text-xs text-red-400 font-semibold">BS, MS & PhD</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F141C] border border-white/10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
              Institutional
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">Presidential & Dean Grants</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Direct awards by universities (e.g. Zhengzhou, Ningxia, Jiangsu) covering 50% to 100% tuition fees based on admission merit.
            </p>
            <span className="text-xs text-emerald-400 font-semibold">Undergraduate & Masters</span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0F141C] border border-white/10">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
              Provincial
            </span>
            <h3 className="text-base font-bold text-white mt-3 mb-2">Provincial Government Grants</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Awarded by provincial educational departments (Zhejiang, Liaoning, Sichuan) offering 10,000 to 25,000 RMB per academic year.
            </p>
            <span className="text-xs text-blue-400 font-semibold">Annual Performance</span>
          </div>
        </div>

        {/* Warning Section */}
        <div className="p-8 rounded-2xl bg-[#0F141C] border border-red-500/30 mb-16 flex items-start gap-5">
          <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center flex-shrink-0 text-red-400">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              Important Consumer Warning: The "Free MBBS Scholarship" Myth
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Under Chinese Ministry of Education regulations, <strong>undergraduate MBBS does not have a 100% free government scholarship with monthly stipends for fresh foreign students</strong>. Any unauthorized consultant promising "Full Free MBBS with Stipend" is deceiving you. However, top medical students receive merit-based performance scholarships of 5,000 to 15,000 RMB after completing their 1st year.
            </p>
          </div>
        </div>

        {/* Documents Required */}
        <div className="p-8 rounded-2xl bg-[#0F141C] border border-white/10">
          <h3 className="brand-font text-xl font-bold text-white mb-6">
            Required Documents for CSC Scholarship Applications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {[
              'Notarized copies of Highest Degree & Transcripts',
              'Research Proposal or Study Plan (minimum 800 words)',
              'Two Letters of Recommendation from Professors / Associate Professors',
              'Foreigner Physical Examination Form with Blood Test Reports',
              'Valid Passport Copy (with at least 1 year validity)',
              'Non-Criminal Record / Police Clearance Certificate',
              'Professor Acceptance Letter (Humayl team assists in supervisor outreach)',
              'English Proficiency Certificate from previous university',
              'Academic Curriculum Vitae (CV) & Published Papers (if any)',
            ].map((doc, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#141B26] border border-white/5 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-slate-200">{doc}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
