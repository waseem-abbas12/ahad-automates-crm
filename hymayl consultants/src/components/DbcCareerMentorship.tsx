import React from 'react';
import { Stethoscope, Laptop, Users2, Award, BookOpen, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const DbcCareerMentorship: React.FC = () => {
  return (
    <div id="career" className="py-20 bg-[#05070B] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <Compass className="w-3.5 h-3.5 text-red-400" />
            <span>The Mentorship Advantage</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            BEYOND ADMISSION: YOUR LICENSING & CAREER ROADMAP
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Other agencies disappear the moment you board your flight. At Humayl Consultants, we walk with you through every clinical rotation, NLE exam preparation, and hospital house job placement.
          </p>
        </div>

        {/* 3 Major Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: Medical NLE Track */}
          <div className="bg-[#0B0F17] p-8 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-red-950/30">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-6 group-hover:scale-105 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="text-xs font-black tracking-wider uppercase text-red-400 mb-1">
                Medical & Dental Track
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                PM&DC NLE & USMLE Integrated Coaching
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Starting from your 3rd year in China, we provide Pakistani medical licensing syllabus guidance, mock test series, and past paper reviews so you clear your PM&DC NLE on your first attempt.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
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

            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>92% First-Attempt NLE Pass Ratio for Our Alumni</span>
              </span>
            </div>
          </div>

          {/* Pillar 2: 1-on-1 Senior Student Mentor */}
          <div className="bg-[#0B0F17] p-8 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-red-950/30">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-6 group-hover:scale-105 transition-transform">
                <Users2 className="w-6 h-6" />
              </div>
              <div className="text-xs font-black tracking-wider uppercase text-red-400 mb-1">
                On-Ground Peer Network
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                1-on-1 Senior Doctor & Student Mentorship
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Every newly enrolled student is paired with a senior Pakistani 4th/5th-year medical student at their university. They assist with campus orientation, clinical notes sharing, and city navigation.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Personalized campus senior pairing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Exam archives and study guides</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Hostel life adjustment and halal food spots</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-red-400" />
                <span>Active Across 18 Major Chinese University Cities</span>
              </span>
            </div>
          </div>

          {/* Pillar 3: Tech & Engineering Corporate Nexus */}
          <div className="bg-[#0B0F17] p-8 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-red-950/30">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-6 group-hover:scale-105 transition-transform">
                <Laptop className="w-6 h-6" />
              </div>
              <div className="text-xs font-black tracking-wider uppercase text-red-400 mb-1">
                Engineering & Tech Careers
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                CPEC & Global Tech Corporate Placements
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                For our Computer Science, AI, and Engineering scholars, we coordinate internships with Chinese multinationals (Huawei, BYD, CRRC) operating projects both in China and across Pakistan under CPEC.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Corporate tech internship placements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>CPEC priority recruitment recommendation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>High-performance AI & Robotics research labs</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-red-400" />
                <span>Global Alumni Network in 12+ Countries</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
