import React from 'react';
import { UserCheck, FileCheck2, Stamp, PlaneTakeoff, ShieldCheck, ArrowRight } from 'lucide-react';

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
      subtitle: 'Islamabad / Lahore Embassy Submission',
      description: 'Complete guidance on document attestation (IBCC, MOFA), medical fitness screening, and Chinese visa center submission. Full parent pre-departure briefing.',
      icon: Stamp,
      tag: 'Week 3 - 4'
    },
    {
      number: '04',
      title: 'Airport Reception to Dorm Keys',
      subtitle: 'On-Ground Humayl Team in China',
      description: 'Met by our permanent Pakistani representatives at Beijing, Shanghai, or Urumqi airport. Accompanied to your campus, biometric dormitory room handover, Chinese SIM card & Halal food setup.',
      icon: PlaneTakeoff,
      tag: 'Arrival Day'
    }
  ];

  return (
    <div id="process" className="py-20 bg-[#090D14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The CAS Transparent Operational Standard</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            OUR 4-STEP FRICTIONLESS ADMISSION JOURNEY
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every milestone is tracked with complete transparency. You pay fees directly to the university account — never to an unverified individual.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#0F141C] p-6 rounded-2xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Row: Number & Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="brand-font text-3xl font-black text-red-600/60 group-hover:text-red-500 transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                      {step.tag}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-red-400/90 mb-3">{step.subtitle}</div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs font-semibold text-slate-400 group-hover:text-red-400 transition-colors">
                  <span>Guaranteed by Humayl</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
