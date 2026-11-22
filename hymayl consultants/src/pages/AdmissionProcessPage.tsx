import React from 'react';
import { FileCheck, Stamp, PlaneTakeoff, ShieldCheck, UserCheck, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const AdmissionProcessPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Admission Process & Chinese X1 Visa Guide</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
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
              bullets: ['MDCAT status verification', 'Eligibility review for MOE English list', 'Zero initial registration fee']
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
              title: 'Chinese Embassy Visa Application (X1 Student Visa)',
              time: 'Week 4 - 5',
              desc: 'File submission at the Chinese Visa Application Service Center in Islamabad, Lahore, or Karachi with original JW202 form and admission docket. Our team conducts mock visa interview briefings.',
              bullets: ['Complete biometric appointment setup', '100% Visa approval record', 'Parent pre-departure orientation']
            },
            {
              step: 'Step 06',
              title: 'Group Flight Departure & China Airport Reception',
              time: 'Arrival Day',
              desc: 'Travel in group flights with fellow Pakistani scholars. Our permanent Pakistani liaison officers receive students at Beijing, Shanghai, or Urumqi airport with dedicated private university buses.',
              bullets: ['Direct airport reception & luggage transit', 'Biometric hostel room allocation', 'Campus registration & bank account opening']
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black px-3 py-1 rounded-lg bg-red-600 text-white shadow-md">
                    {item.step}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
                </div>
                <span className="text-xs font-bold text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-500/30 self-start sm:self-auto">
                  {item.time}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                {item.bullets.map((b, i) => (
                  <span key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5 bg-[#111622] px-3 py-1 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{b}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0B0F17] via-[#141B28] to-[#0B0F17] border border-white/10 shadow-2xl">
          <h2 className="brand-font text-2xl sm:text-3xl font-extrabold text-white mb-3">
            READY TO START YOUR APPLICATION FOR MARCH OR FALL 2025?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mb-8">
            Admissions in MOE-listed universities are allocated strictly on a first-come, first-served basis. Secure your seat today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/apply"
              className="px-8 py-4 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-xl shadow-red-900/40 hover:shadow-ruby-glow transition-all"
            >
              <span>Apply Online in 60 Seconds</span>
            </Link>
            <a
              href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20start%20my%20visa%20process"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#111622] hover:bg-[#161D2C] text-slate-200 hover:text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/10 transition-all"
            >
              Consult Visa Counselor on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
