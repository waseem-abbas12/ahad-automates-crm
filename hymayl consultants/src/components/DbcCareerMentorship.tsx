import React from 'react';
import { Stethoscope, Laptop, Users2, Award, BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

export const DbcCareerMentorship: React.FC = () => {
  return (
    <div id="career" className="py-20 bg-[#07090E] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>The DreambigCareer (DBC) Mentorship Advantage</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            BEYOND ADMISSION: YOUR LICENSING & CAREER ROADMAP
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Other agencies disappear the moment you board your flight. At Humayl Consultants, we walk with you through every clinical rotation, NLE exam preparation, and hospital house job placement.
          </p>
        </div>

        {/* 3 Major Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Medical NLE Track */}
          <div className="bg-[#0F141C] p-7 rounded-2xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold tracking-wider uppercase text-red-400 mb-1">
                Medical & Dental Track
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                PM&DC NLE & USMLE Integrated Coaching
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Starting from your 3rd year in China, we provide Pakistani medical licensing syllabus guidance, mock test series, and past paper reviews so you clear your PM&DC NLE on your first attempt.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>PM&DC NLE Step 1 & 2 syllabus mapping</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Grade-A Tertiary Hospital clinical internship</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>USMLE Step 1 & PLAB roadmap guidance</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <span className="text-[11px] font-semibold text-slate-400">
                92% First-Attempt NLE Pass Ratio for Our Alumni
              </span>
            </div>
          </div>

          {/* Pillar 2: 1-on-1 Senior Student Mentor */}
          <div className="bg-[#0F141C] p-7 rounded-2xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Users2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold tracking-wider uppercase text-red-400 mb-1">
                Peer Mentorship Network
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                1-on-1 Alumni & Senior Matching
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Before you even depart from Pakistan, we link you with senior Pakistani students and practicing doctors from your exact university for campus tips, academic notes, and cultural orientation.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Senior Pakistani doctor guidance network</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>HSK-4 Chinese medical vocabulary notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Hostel survival & Halal grocery coordination</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <span className="text-[11px] font-semibold text-slate-400">
                Over 500+ Active Mentors Across 25 Chinese Cities
              </span>
            </div>
          </div>

          {/* Pillar 3: AI & Tech Career Track */}
          <div className="bg-[#0F141C] p-7 rounded-2xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="text-xs font-extrabold tracking-wider uppercase text-red-400 mb-1">
                Tech & Corporate Hub
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Shenzhen & Hangzhou Tech Placements
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                For our Computer Science, AI, and Engineering students, China offers unmatched industrial internships. Our advisory bridges you with multinational tech companies in Hangzhou and Shenzhen.
              </p>

              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Internship pathways in Alibaba & Huawei corridors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Dual-track job prospects in China, UAE & Pakistan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Post-graduate CSC Research fellowship access</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <span className="text-[11px] font-semibold text-slate-400">
                High-Demand Global Tech Credentials
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
