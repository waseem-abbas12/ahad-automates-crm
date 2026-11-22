import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { MapPin, CheckCircle2, ArrowLeft, ArrowRight, MessageSquare, Building2, FileText, Check } from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';

export const UniversityDetailPage: React.FC<{ universityId: string }> = ({ universityId }) => {
  const { navigate } = useRouter();
  const [currency, setCurrency] = useState<'PKR' | 'RMB'>('PKR');

  const univ = UNIVERSITIES.find(u => u.id === universityId) || UNIVERSITIES[0];
  const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
  const hostelPKR = Math.round(univ.hostelFeeRMB * RMB_TO_PKR_RATE);

  // Realistic Breakdown Estimation
  const registrationFeeRMB = 800;
  const medicalInsuranceRMB = 800;
  const visaResidentPermitRMB = 800;
  const firstYearTotalRMB = univ.tuitionFeeRMB + univ.hostelFeeRMB + registrationFeeRMB + medicalInsuranceRMB + visaResidentPermitRMB;
  const firstYearTotalPKR = Math.round(firstYearTotalRMB * RMB_TO_PKR_RATE);

  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate('/programs')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-red-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Universities Directory</span>
        </button>

        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#0B0F17] border border-white/10 mb-12 shadow-2xl">
          <div className="h-72 sm:h-96 relative">
            <img src={univ.image} alt={univ.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/60 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  {univ.badge && (
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md">
                      {univ.badge}
                    </span>
                  )}
                  {univ.moeListed && (
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 backdrop-blur-md">
                      MOE English Listed
                    </span>
                  )}
                  <span className="text-xs text-slate-200 flex items-center gap-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-400" /> {univ.city}, {univ.province}, China
                  </span>
                </div>

                <h1 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-1">
                  {univ.name}
                </h1>
                <div className="text-sm font-semibold text-slate-300">{univ.chineseName}</div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20apply%20for%20admission%20at%20${encodeURIComponent(univ.name)}%20for%20the%202025%20intake.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview Card */}
            <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 shadow-xl">
              <h2 className="brand-font text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-red-400" />
                <span>Institutional Overview</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                {univ.name} is one of China’s designated national institutions authorized to recruit international students for medical and technological studies. The university features world-class clinical laboratories, tertiary training hospitals, and an international faculty of seasoned professors.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/[0.08]">
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

              {/* Key Features List */}
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">Campus Distinctions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {univ.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Complete Transparent Fee Breakdown Table */}
            <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                  <h3 className="brand-font text-lg font-bold text-white">Official Transparent Fee Breakdown</h3>
                  <p className="text-xs text-slate-400">100% Direct University Bank Remittance • Zero Agent Inflation</p>
                </div>

                <div className="flex items-center gap-1 bg-[#111622] p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setCurrency('PKR')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${currency === 'PKR' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                  >
                    PKR (₨)
                  </button>
                  <button
                    onClick={() => setCurrency('RMB')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${currency === 'RMB' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
                  >
                    RMB (¥)
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 uppercase font-bold text-[10px]">
                      <th className="py-3 px-2">Fee Category</th>
                      <th className="py-3 px-2">RMB (¥)</th>
                      <th className="py-3 px-2">PKR (Approx. ₨)</th>
                      <th className="py-3 px-2">Frequency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 px-2 font-semibold text-white">Annual Tuition Fee</td>
                      <td className="py-3 px-2 text-red-400 font-bold">¥{univ.tuitionFeeRMB.toLocaleString()}</td>
                      <td className="py-3 px-2 text-white font-bold">₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs</td>
                      <td className="py-3 px-2 text-slate-400">Per Year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-semibold text-white">Hostel Accommodation (2-Person Room)</td>
                      <td className="py-3 px-2 text-slate-300 font-semibold">¥{univ.hostelFeeRMB.toLocaleString()}</td>
                      <td className="py-3 px-2 text-white font-semibold">₨ {(hostelPKR / 100000).toFixed(2)} Lakhs</td>
                      <td className="py-3 px-2 text-slate-400">Per Year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-semibold text-white">Registration & University Admin</td>
                      <td className="py-3 px-2 text-slate-300 font-semibold">¥800</td>
                      <td className="py-3 px-2 text-white font-semibold">₨ 31,600</td>
                      <td className="py-3 px-2 text-slate-400">1st Year Only</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-semibold text-white">Resident Permit & Visa Extension</td>
                      <td className="py-3 px-2 text-slate-300 font-semibold">¥800</td>
                      <td className="py-3 px-2 text-white font-semibold">₨ 31,600</td>
                      <td className="py-3 px-2 text-slate-400">Per Year</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-semibold text-white">International Student Medical Insurance</td>
                      <td className="py-3 px-2 text-slate-300 font-semibold">¥800</td>
                      <td className="py-3 px-2 text-white font-semibold">₨ 31,600</td>
                      <td className="py-3 px-2 text-slate-400">Per Year</td>
                    </tr>
                    <tr className="bg-red-950/20 font-bold text-white">
                      <td className="py-3 px-2 text-red-300">Total Estimated 1st Year Package</td>
                      <td className="py-3 px-2 text-red-400 font-black">¥{firstYearTotalRMB.toLocaleString()}</td>
                      <td className="py-3 px-2 text-emerald-400 font-black">₨ {(firstYearTotalPKR / 100000).toFixed(2)} Lakhs</td>
                      <td className="py-3 px-2 text-red-300">Complete 1st Year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Admission Documents Checklist */}
            <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 shadow-xl">
              <h3 className="brand-font text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-400" />
                <span>Mandatory Documents Required for JW202 Issuance</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Matric / O-Level Certificate & Detailed Marks Sheet',
                  'FSc Pre-Medical (Minimum 60% for PM&DC NOC)',
                  'MDCAT Result Card (Pass Threshold 55%+)',
                  'Valid International Passport (Min. 18 Months Expiry)',
                  'Police Character Clearance Certificate',
                  'Physical Examination Form (Foreigner Medical)',
                  'White Background Passport Size Digital Photographs',
                  'Guardian / Bank Financial Affidavit'
                ].map((doc, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#111622] border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Quick Action & Guidance */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Summary Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#111622] to-[#0B0F17] border border-white/10 shadow-2xl space-y-5 sticky top-28">
              <div className="text-center pb-4 border-b border-white/[0.08]">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Annual Tuition</div>
                <div className="text-2xl font-black text-white">
                  ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs<span className="text-xs font-normal text-slate-400">/yr</span>
                </div>
                <div className="text-xs text-red-400 font-semibold mt-1">¥{univ.tuitionFeeRMB.toLocaleString()} RMB per academic year</div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Intake Session:</span>
                  <span className="font-bold text-white">{univ.intakeSeason}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Classroom Medium:</span>
                  <span className="font-bold text-emerald-400">{univ.language}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Hostel Fee:</span>
                  <span className="font-bold text-white">₨ {(hostelPKR / 100000).toFixed(2)} Lakhs (¥{univ.hostelFeeRMB.toLocaleString()})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Remaining Seats:</span>
                  <span className="font-bold text-red-400">{univ.seatsRemaining} Allocated</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  to="/apply"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs text-center shadow-lg shadow-red-900/40 flex items-center justify-center gap-2 transition-all block"
                >
                  <span>Apply Online Directly</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20want%20to%20reserve%20a%20seat%20for%20admission%20at%20${encodeURIComponent(univ.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 font-bold rounded-xl text-xs text-center flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Reserve Seat via WhatsApp</span>
                </a>
              </div>

              <div className="text-[11px] text-slate-400 text-center leading-relaxed pt-2">
                Questions? Call our Lahore desk at <strong className="text-white">+92 42 35780000</strong>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
