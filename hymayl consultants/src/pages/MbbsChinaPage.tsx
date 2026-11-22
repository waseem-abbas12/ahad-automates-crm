import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { ShieldCheck, Stethoscope, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Clock, Building2, HelpCircle, Sparkles, MapPin, Award } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const MbbsChinaPage: React.FC = () => {
  const [currency, setCurrency] = useState<'PKR' | 'RMB'>('PKR');
  const mbbsUniversities = UNIVERSITIES.filter(u => u.category === 'MBBS' || u.category === 'BDS');

  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">MBBS in China (100% English Medium)</span>
        </div>

        {/* Hero Banner for MBBS */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0B0F17] via-[#141B28] to-[#0B0F17] border border-white/10 p-8 sm:p-12 mb-16 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-300 text-xs font-bold mb-4 shadow-ruby-subtle">
              <ShieldCheck className="w-4 h-4 text-red-400" />
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
                className="px-7 py-4 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-red-900/40 hover:shadow-ruby-glow transition-all"
              >
                <span>Apply for March / Fall 2025 Intake</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/admission-process"
                className="px-6 py-4 bg-[#111622] hover:bg-[#161D2C] text-slate-200 hover:text-white border border-white/10 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-md"
              >
                View PM&DC NOC Requirements
              </Link>
            </div>
          </div>
        </div>

        {/* Crucial Regulatory Alert: MOE Listed vs Non-MOE Listed */}
        <div className="rounded-3xl bg-[#0B0F17] border border-amber-500/30 p-6 sm:p-8 mb-16 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-bold text-white">
                  The Critical Difference: MOE Listed (English Medium) vs Non-MOE Listed (Bilingual)
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-bold">
                  Must Read for Parents
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Many Pakistani students fall prey to unauthorized sub-agents who enroll them in <strong>Non-MOE Listed</strong> Chinese-medium universities under false promises. In Non-MOE universities, theoretical exams and clinical classes are conducted in Chinese, creating severe distress.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
                  <div className="font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> MOE Listed Universities (Humayl Exclusive Focus)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Official 43 universities approved by Ministry of Education China to teach international medical scholars in 100% English. Fully eligible for PM&DC NOC and global exams (USMLE, PLAB).
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/30 text-xs">
                  <div className="font-bold text-red-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Non-MOE Listed Universities (Warning)
                  </div>
                  <p className="text-slate-300 leading-relaxed">
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
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
              Academic Blueprint
            </span>
            <h2 className="brand-font text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-2">
              THE 5+1 YEARS MBBS CURRICULUM
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Structured according to the International WFME (World Federation for Medical Education) standards and PM&DC syllabus requirements.
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
              <div key={i} className="p-6 rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all hover:shadow-lg">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-red-950 text-red-300 border border-red-500/30">
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
              <h2 className="brand-font text-2xl sm:text-3xl font-extrabold text-white">
                TOP MOE APPROVED MEDICAL UNIVERSITIES
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Verified English-medium colleges with direct Humayl admission representation.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#0B0F17] p-1.5 rounded-xl border border-white/10">
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
                <div key={univ.id} className="rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:shadow-2xl hover:shadow-red-950/30">
                  <div>
                    <Link to={`/university/${univ.id}`} className="relative h-48 overflow-hidden block">
                      <img src={univ.image} alt={univ.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/30 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">
                          MOE English Listed
                        </span>
                        {univ.badge && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-red-600 text-white">
                            {univ.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-red-400" />
                        <span>{univ.city}, {univ.province}</span>
                      </div>
                    </Link>

                    <div className="p-6">
                      <div className="text-[11px] text-slate-400 mb-1">{univ.chineseName}</div>
                      <Link to={`/university/${univ.id}`} className="text-base font-bold text-white hover:text-red-400 transition-colors mb-2 block">
                        {univ.name}
                      </Link>
                      <p className="text-xs text-slate-400 mb-4">{univ.ranking}</p>

                      <div className="space-y-2 text-xs text-slate-300 border-t border-white/[0.06] pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Hospital Capacity:</span>
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

                  <div className="p-6 pt-0">
                    <div className="bg-[#111622] p-3 rounded-xl border border-white/5 mb-3 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Annual Tuition:</span>
                      <span className="text-sm font-black text-white">
                        {currency === 'PKR' ? `₨ ${(tuitionPKR / 100000).toFixed(2)} Lakhs` : `¥${univ.tuitionFeeRMB.toLocaleString()} RMB`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/university/${univ.id}`}
                        className="flex-1 py-2.5 text-center bg-[#111622] hover:bg-[#161D2C] text-white text-xs font-semibold rounded-xl transition-colors border border-white/10"
                      >
                        Profile
                      </Link>
                      <a
                        href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20to%20apply%20for%20MBBS%20at%20${encodeURIComponent(univ.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 text-center bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-900/30"
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
