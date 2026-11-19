import React from 'react';
import { FileCheck, Stamp, PlaneTakeoff, ShieldCheck, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const AdmissionProcessPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Admission Process & Chinese X1 Visa Guide</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Complete Procedural Transparency</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white mb-4">
            CHINESE ADMISSION & X1 STUDENT VISA BLUEPRINT
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            From initial document submission in Pakistan to biometric dorm room keys in China — here is the exact step-by-step roadmap managed by Humayl Consultants SMC (Pvt) Limited.
          </p>
        </div>

        {/* Chronological Steps */}
        <div className="space-y-6 mb-16">
          {[
            {
              step: 'Step 01',
              title: 'Free Profile Assessment & University Matching',
              time: 'Day 1 - 2',
              desc: 'Submit scanned copies of your Matric, FSc / A-Level results, and Passport. Our academic board evaluates your merit against official PM&DC criteria and Chinese university admission requirements.',
              bullets: ['MDCAT status verification', 'Eligibility review for MOE English list', 'Zero registration fee']
            },
            {
              step: 'Step 02',
              title: 'Direct University Admission Notice Dispatch',
              time: 'Day 5 - 10',
              desc: 'Your file is submitted directly to the university international dean office. Upon acceptance, the university issues your official Admission Letter.',
              bullets: ['Direct university communication', 'Seat reservation confirmed', 'Admission offer letter issued']
            },
            {
              step: 'Step 03',
              title: 'JW202 / DQ Visa Form Issuance by Ministry in Beijing',
              time: 'Week 2 - 4',
              desc: 'The university registers your admission with the provincial education department and the Ministry of Education in Beijing to generate the official JW202 (or new DQ) Visa Authorization Form.',
              bullets: ['Official governmental visa authorization', 'Legally recognized student identity', 'Required for X1 Visa stamping']
            },
            {
              step: 'Step 04',
              title: 'Document Attestation (IBCC & MOFA)',
              time: 'Week 3 - 4',
              desc: 'Humayl team guides you through authenticating your educational certificates from the Inter Board Committee of Chairmen (IBCC) and the Ministry of Foreign Affairs (MOFA) in Islamabad, Lahore, or Karachi.',
              bullets: ['IBCC attestation assistance', 'MOFA stamp verification', 'Medical fitness tests at designated clinics']
            },
            {
              step: 'Step 05',
              title: 'Chinese Embassy X1 Visa Stamping',
              time: 'Week 4 - 5',
              desc: 'Submission of your physical passport, JW202 form, admission notice, and medical form to the Chinese Visa Application Service Centre (Islamabad or Karachi). Standard processing time is 4 to 7 working days.',
              bullets: ['Biometric fingerprint appointment', 'Express visa tracking', 'Parent travel visa assistance (if accompanying)']
            },
            {
              step: 'Step 06',
              title: 'Pre-Departure Briefing & Currency Exchange',
              time: '1 Week Before Flight',
              desc: 'Comprehensive briefing held at our Lahore or Islamabad office. Guidance on packing, climate adaptation, Chinese SIM cards (eSIM/pre-activated), and telegraphic transfer / UnionPay currency exchange.',
              bullets: ['Group flight booking discounts', 'Parent WhatsApp emergency group', 'Baggage allowance guidance']
            },
            {
              step: 'Step 07',
              title: 'Airport Reception to Dormitory Handover in China',
              time: 'Arrival Day',
              desc: 'You are received by Humayl permanent Pakistani representatives at Beijing Capital, Shanghai Pudong, or Urumqi International Airport. Transported directly to campus, assisted with registration, room allotment, and biometric keys.',
              bullets: ['Airport pickup & private coach transfer', 'Hostel room keys & bedding setup', 'Police registration & local SIM card']
            },
          ].map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="brand-font text-lg font-bold text-red-500">{item.step}:</span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 self-start sm:self-auto">
                  {item.time}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {item.desc}
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                {item.bullets.map((b, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#141B26] to-[#0F141C] border border-red-500/30 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Ready to Start Your Application?</h3>
          <p className="text-xs text-slate-300 mb-6">Our senior counselors in Lahore and Islamabad are ready to evaluate your documents today.</p>
          <Link
            to="/apply"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-red-900/40"
          >
            <span>Start Free Evaluation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
