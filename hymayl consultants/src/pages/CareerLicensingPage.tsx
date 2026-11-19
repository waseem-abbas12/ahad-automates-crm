import React from 'react';
import { Stethoscope, Award, Laptop, Users2, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const CareerLicensingPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Career Planning, NLE & USMLE Hub</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
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
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F141C] border border-white/10 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 uppercase">
                Pakistani Medical Practice
              </span>
              <h2 className="brand-font text-2xl font-bold text-white mt-1">
                PM&DC NLE Step 1 & Step 2 Preparation
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
            Under Pakistan Medical and Dental Council regulations, all foreign medical graduates must pass the National Licensing Examination (NLE) to obtain a permanent license to practice and secure paid House Job slots in Pakistani teaching hospitals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#141B26] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> NLE Step 1 (Theory Exam)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                200 MCQs covering Basic Medical Sciences & Clinical Disciplines. We provide online test series, Pakistani high-yield question banks, and lecture series from your 3rd year onwards.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141B26] border border-white/5 space-y-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> NLE Step 2 (Clinical OSCE)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Objective Structured Clinical Examination evaluating patient interaction, history taking, procedural skills, and emergency management. Practical bedside coaching guidance during final-year internship.
              </p>
            </div>
          </div>
        </div>

        {/* Global Opportunities (USMLE & PLAB) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          <div className="p-8 rounded-3xl bg-[#0F141C] border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">United States Medical Licensing (USMLE)</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All 43 MOE English-medium Chinese medical universities are recognized by ECFMG (Educational Commission for Foreign Medical Graduates). You are eligible to sit USMLE Step 1, Step 2 CK, and apply for USA medical residency matches.
            </p>
            <span className="text-xs text-blue-400 font-semibold">ECFMG & FAIMER Listed</span>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F141C] border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">United Kingdom PLAB / UKMLA</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              China MBBS degrees are recognized by the British General Medical Council (GMC). Pakistani graduates can take the PLAB 1 & 2 (or UKMLA) to practice as Junior Doctors in the NHS with starting salaries exceeding £35,000/year.
            </p>
            <span className="text-xs text-emerald-400 font-semibold">British GMC Recognized</span>
          </div>

        </div>

        {/* 1-on-1 Alumni Mentorship */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#141B26] to-[#0F141C] border border-red-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              Connect with a Senior Pakistani Doctor Who Graduated from China
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Book a 1-on-1 virtual mentoring session with alumni practicing in Lahore, Islamabad, or the UK to get candid answers about academic rigor, hospital training, and career progression.
            </p>
          </div>

          <a
            href="https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20to%20book%20a%20mentorship%20session%20with%20a%20China%20alumni%20doctor"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex-shrink-0 shadow-lg shadow-red-900/40"
          >
            Book Mentorship Call
          </a>
        </div>

      </div>
    </div>
  );
};
