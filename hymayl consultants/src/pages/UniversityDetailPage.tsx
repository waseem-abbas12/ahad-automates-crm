import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { MapPin, ShieldCheck, CheckCircle2, Bed, ArrowLeft, ArrowRight, MessageSquare, Building2, HelpCircle } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';

export const UniversityDetailPage: React.FC<{ universityId: string }> = ({ universityId }) => {
  const { navigate } = useRouter();
  const [currency, setCurrency] = useState<'PKR' | 'RMB'>('PKR');

  const univ = UNIVERSITIES.find(u => u.id === universityId) || UNIVERSITIES[0];
  const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
  const hostelPKR = Math.round(univ.hostelFeeRMB * RMB_TO_PKR_RATE);

  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/programs')}
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-red-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Universities</span>
        </button>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0F141C] border border-white/10 mb-12">
          <div className="h-72 sm:h-96 relative">
            <img src={univ.image} alt={univ.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F141C] via-[#0F141C]/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {univ.badge && (
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-red-600 text-white shadow-md">
                      {univ.badge}
                    </span>
                  )}
                  {univ.moeListed && (
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                      MOE English Listed
                    </span>
                  )}
                  <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> {univ.city}, {univ.province}, China
                  </span>
                </div>

                <h1 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-1">
                  {univ.name}
                </h1>
                <div className="text-sm font-semibold text-slate-300">{univ.chineseName}</div>
              </div>

              <a
                href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20admission%20at%20${encodeURIComponent(univ.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Apply via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10">
              <h2 className="brand-font text-xl font-bold text-white mb-4">
                Institutional Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {univ.name} is one of China’s designated national institutions authorized to recruit international students for medical and technological studies. The university features world-class clinical laboratories, tertiary training hospitals, and an international faculty of seasoned professors.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Instruction</span>
                  <span className="text-xs font-bold text-white">{univ.language}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Intake</span>
                  <span className="text-xs font-bold text-red-400">{univ.intakeSeason}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Hospital Capacity</span>
                  <span className="text-xs font-bold text-white">{univ.hospitalBeds ? `${univ.hospitalBeds.toLocaleString()}+ Beds` : 'National Labs'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Available Seats</span>
                  <span className="text-xs font-bold text-emerald-400">{univ.seatsRemaining} Remaining</span>
                </div>
              </div>
            </div>

            {/* Key Advantages */}
            <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10">
              <h3 className="brand-font text-xl font-bold text-white mb-4">
                Key Campus Features for Pakistani Students
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {univ.features.map((feat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#141B26] border border-white/5 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Fee Structure Breakdown */}
            <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="brand-font text-xl font-bold text-white">Official Transparent Fee Breakdown</h3>
                  <p className="text-xs text-slate-400 mt-1">Paid directly to the university account without markups.</p>
                </div>

                <div className="flex items-center gap-1 bg-[#141B26] p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setCurrency('PKR')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${currency === 'PKR' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                  >
                    PKR
                  </button>
                  <button
                    onClick={() => setCurrency('RMB')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${currency === 'RMB' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                  >
                    RMB
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#141B26] flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Annual Tuition Fee:</span>
                  <span className="font-bold text-white text-sm">
                    {currency === 'PKR' ? `₨ ${(tuitionPKR / 100000).toFixed(2)} Lakhs / yr` : `¥${univ.tuitionFeeRMB.toLocaleString()} RMB / yr`}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#141B26] flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Hostel Accommodation (2-Person Room, AC, Heated, Wi-Fi):</span>
                  <span className="font-bold text-white text-sm">
                    {currency === 'PKR' ? `₨ ${(hostelPKR / 100000).toFixed(2)} Lakhs / yr` : `¥${univ.hostelFeeRMB.toLocaleString()} RMB / yr`}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#141B26] flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Medical Insurance (Annual Comprehensive):</span>
                  <span className="font-bold text-white text-sm">
                    {currency === 'PKR' ? `₨ 31,600 / yr` : `¥800 RMB / yr`}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#141B26] flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">Residence Permit / Visa Extension (Annual):</span>
                  <span className="font-bold text-white text-sm">
                    {currency === 'PKR' ? `₨ 15,800 / yr` : `¥400 RMB / yr`}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Apply Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#141B26] to-[#0F141C] border border-red-500/30 shadow-2xl">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 uppercase">
                Official Representative
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-2">
                Apply for {univ.name}
              </h3>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Submit your FSc & Matric copies for a free eligibility evaluation and immediate seat reservation.
              </p>

              <div className="space-y-3 mb-6">
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Official JW202 Processing</span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Airport Reception in China Included</span>
                </div>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>PM&DC NOC Documentation Support</span>
                </div>
              </div>

              <Link
                to="/apply"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all block text-center"
              >
                <span>Fill Online Application</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Helpline Box */}
            <div className="p-6 rounded-2xl bg-[#0F141C] border border-white/10 text-center">
              <h4 className="text-sm font-bold text-white mb-1">Direct University Counselor</h4>
              <p className="text-xs text-slate-400 mb-4">Talk to our Lahore / Islamabad China desk directly.</p>
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <MessageSquare className="w-4 h-4" />
                <span>+92 300 0000000 (WhatsApp)</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
