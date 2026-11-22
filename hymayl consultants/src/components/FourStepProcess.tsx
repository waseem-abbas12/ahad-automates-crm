import React from 'react';
import { UserCheck, FileCheck2, Stamp, PlaneTakeoff, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const FourStepProcess: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Free Evaluation & Matching',
      subtitle: 'Profile & Merit Assessment',
      description: 'We audit your FSc Pre-Medical / Pre-Engineering marks and MDCAT score to match with PM&DC-approved and MOE-gazetted universities. Zero false promises.',
      icon: UserCheck,
      tag: 'Day 1 - 2'
    },
    {
      number: '02',
      title: 'Direct University JW202 Form',
      subtitle: 'Official Chinese Admission',
      description: 'Your application is dispatched directly to the university chancellor office. We secure your official Admission Notice and Ministry-issued JW202/DQ Visa form without middle brokers.',
      icon: FileCheck2,
      tag: 'Day 7 - 14'
    },
    {
      number: '03',
      title: 'Express Visa Stamping & Briefing',
      subtitle: 'Embassy Submission',
      description: 'Complete guidance on document attestation (IBCC, MOFA), medical fitness screening, and Chinese visa center submission. Full parent pre-departure briefing.',
      icon: Stamp,
      tag: 'Week 3 - 4'
    },
    {
      number: '04',
      title: 'Airport Reception to Dorm Keys',
      subtitle: 'On-Ground Team in China',
      description: 'Met by our permanent Pakistani representatives at Beijing, Shanghai, or Urumqi airport. Accompanied to your campus, biometric dormitory room handover, Chinese SIM card & Halal food setup.',
      icon: PlaneTakeoff,
      tag: 'Arrival Day'
    }
  ];

  return (
    <div id="process" className="py-20 bg-[#070A10] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>The Transparent Operational Standard</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            OUR 4-STEP FRICTIONLESS ADMISSION JOURNEY
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every milestone is tracked with complete transparency. You pay official fees directly to the university corporate account — never to an unverified individual.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#0B0F17] p-6 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-red-950/30"
              >
                <div>
                  {/* Top Row: Number & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="brand-font text-3xl font-black text-red-600/50 group-hover:text-red-500 transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-500/30">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 leading-snug">
                    {step.title}
                  </h3>
                  <div className="text-[11px] text-red-400 font-semibold mb-3">{step.subtitle}</div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-red-400 transition-colors">
                  <span>Milestone Verified</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
