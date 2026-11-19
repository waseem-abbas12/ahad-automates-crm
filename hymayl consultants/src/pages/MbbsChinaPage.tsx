import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { ShieldCheck, Stethoscope, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Clock, Building2, HelpCircle } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const MbbsChinaPage: React.FC = () => {
  const [currency, setCurrency] = useState<'PKR' | 'RMB'>('PKR');
  const mbbsUniversities = UNIVERSITIES.filter(u => u.category === 'MBBS' || u.category === 'BDS');

  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">MBBS in China (English Medium)</span>
        </div>

        {/* Hero Banner for MBBS */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0F141C] via-[#161D2B] to-[#0F141C] border border-white/10 p-8 sm:p-12 mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Official 2025 Gazette Directory • PM&DC & MOE Recognized</span>
            </div>
            
            <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
              STUDY MBBS IN CHINA <br />
              <span className="text-gradient-red">100% ENGLISH MEDIUM</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              China has become the #1 global destination for Pakistani medical scholars. With 43 MOE-gazetted English medium medical colleges, state-of-the-art 5,000+ bed tertiary hospitals, and direct PM&DC NOC eligibility, your path to becoming a licensed doctor is secure, transparent, and affordable.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20MBBS%20in%20China%202025"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-red-900/40 transition-all"
              >
                <span>Apply for March/Fall 2025 Intake</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/admission-process"
                className="px-6 py-3.5 bg-[#141B26] hover:bg-[#1C2535] text-slate-200 border border-white/10 rounded-xl text-xs sm:text-sm font-semibold transition-all"
              >
                View PM&DC NOC Requirements
              </Link>
            </div>
          </div>
        </div>

        {/* Crucial Regulatory Alert: MOE Listed vs Non-MOE Listed */}
        <div className="rounded-2xl bg-[#0F141C] border border-amber-500/30 p-6 sm:p-8 mb-16 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>The Truth: MOE Listed (English Medium) vs Non-MOE Listed (Bilingual)</span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40">Must Read</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Many Pakistani students fall prey to unauthorized sub-agents who enroll them in <strong>Non-MOE Listed</strong> Chinese-medium universities under false promises. In Non-MOE universities, theoretical exams and clinical classes are conducted in Chinese, creating severe distress.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
                  <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> MOE Listed Universities (Humayl Focus)
                  </div>
                  <p className="text-slate-300">
                    Official 43 universities approved by Ministry of Education China to teach international medical scholars in 100% English. Eligible for PM&DC NOC and global exams (USMLE, PLAB).
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30 text-xs">
                  <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Non-MOE Listed Universities (Warning)
                  </div>
                  <p className="text-slate-300">
                    Domestic Chinese-medium colleges. Often advertised with very low fees, but require heavy Chinese fluency and face complications with PM&DC recognition.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5+1 MBBS Curriculum Structure */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="brand-font text-2xl sm:text-3xl font-bold text-white mb-2">
              THE 5+1 YEARS MBBS CURRICULUM
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Structured according to the International WFME (World Federation for Medical Education) standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                year: 'Year 1',
                title: 'Pre-Clinical & Medical Chinese',
                courses: 'Human Anatomy, Histology, Embryology, Medical Terminology, Conversational HSK-3 Chinese.'
              },
              {
                year: 'Year 2',
                title: 'Basic Medical Sciences',
                courses: 'Physiology, Biochemistry, Molecular Biology, Medical Genetics, Pathology, HSK-4 Proficiency.'
              },
              {
                year: 'Year 3',
                title: 'Para-Clinical & Diagnostics',
                courses: 'Pharmacology, Medical Microbiology, Immunology, Physical Diagnostics, Radiology, Forensics.'
              },
              {
                year: 'Year 4',
                title: 'Clinical Disciplines',
                courses: 'Internal Medicine, General Surgery, Obstetrics & Gynecology, Pediatrics, Ophthalmology, ENT.'
              },
              {
                year: 'Year 5',
                title: 'Advanced Clinical Specialties',
                courses: 'Dermatology, Neurology, Psychiatry, Emergency Medicine, Anesthesiology, Oncology, Orthopedics.'
              },
              {
                year: 'Year 6',
                title: 'Tertiary Hospital Internship',
                courses: '52-week rotational internship in university-affiliated Grade-A tertiary hospital, or in Pakistan (subject to PM&DC NOC).'
              },
            ].map((yr, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30">
                  {yr.year}
                </span>
                <h4 className="text-sm font-bold text-white mt-3 mb-2">{yr.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{yr.courses}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MOE Medical Universities Directory */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="brand-font text-2xl sm:text-3xl font-bold text-white">
                TOP MOE APPROVED MEDICAL UNIVERSITIES
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verified English-medium colleges with direct Humayl admission representation.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#0F141C] p-1.5 rounded-xl border border-white/10">
              <span className="text-xs text-slate-400 px-2 font-medium">Currency:</span>
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'PKR' ? 'bg-red-600 text-white' : 'text-slate-400'
                }`}
              >
                PKR (₨)
              </button>
              <button
                onClick={() => setCurrency('RMB')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  currency === 'RMB' ? 'bg-red-600 text-white' : 'text-slate-400'
                }`}
              >
                RMB (¥)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mbbsUniversities.map(univ => {
              const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
              const hostelPKR = Math.round(univ.hostelFeeRMB * RMB_TO_PKR_RATE);

              return (
                <div key={univ.id} className="rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img src={univ.image} alt={univ.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-[#0F141C]/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                          MOE English Listed
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="text-[11px] text-slate-400 mb-1">{univ.city}, {univ.province}</div>
                      <h3 className="text-base font-bold text-white mb-2">{univ.name}</h3>
                      <p className="text-xs text-slate-400 mb-4">{univ.ranking}</p>

                      <div className="space-y-1.5 text-xs text-slate-300 border-t border-white/5 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Hospital Beds:</span>
                          <span className="font-semibold text-white">{univ.hospitalBeds?.toLocaleString()}+ Beds</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Intake Season:</span>
                          <span className="font-semibold text-red-400">{univ.intakeSeason}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Seats Open:</span>
                          <span className="font-semibold text-emerald-400">{univ.seatsRemaining} Seats</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <div className="bg-[#141B26] p-3 rounded-xl border border-white/5 mb-3 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Annual Tuition:</span>
                      <span className="text-sm font-extrabold text-white">
                        {currency === 'PKR' ? `₨ ${(tuitionPKR / 100000).toFixed(2)} Lakhs` : `¥${univ.tuitionFeeRMB.toLocaleString()} RMB`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/university/${univ.id}`}
                        className="flex-1 py-2 text-center bg-[#1E2638] hover:bg-[#28334A] text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Details
                      </Link>
                      <a
                        href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20to%20apply%20for%20MBBS%20at%20${encodeURIComponent(univ.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 text-center bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
