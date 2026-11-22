import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { Calculator, Check, ArrowRight, ShieldCheck, MessageSquare, Sparkles, Building2, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const EligibilityCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'MBBS' | 'BDS' | 'TECH_ENGINEERING' | 'SCHOLARSHIP_POSTGRAD'>('MBBS');
  const [marksPercentage, setMarksPercentage] = useState<string>('70-79');
  const [budgetTier, setBudgetTier] = useState<string>('any');
  const [mdcatStatus, setMdcatStatus] = useState<string>('passed');

  // Dynamic matching algorithms
  const matchingUniversities = UNIVERSITIES.filter(univ => {
    if (univ.category !== selectedCategory) return false;
    const annualPKR = univ.tuitionFeeRMB * RMB_TO_PKR_RATE;
    if (budgetTier === 'low' && annualPKR > 1200000) return false;
    if (budgetTier === 'mid' && (annualPKR < 1200000 || annualPKR > 1600000)) return false;
    if (budgetTier === 'high' && annualPKR < 1600000) return false;
    return true;
  });

  const getEligibilityVerdict = () => {
    if (selectedCategory === 'MBBS') {
      if (marksPercentage === 'below-60') {
        return {
          status: 'Conditional / Pre-Med Foundation',
          badge: 'NOC Review Needed',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40 border-amber-500/40',
          detail: 'PM&DC requires minimum 60% in FSc Pre-Medical for foreign MBBS NOC. You may qualify for bilingual or preparatory foundation tracks in China.'
        };
      }
      return {
        status: 'Guaranteed Direct Admission Eligible',
        badge: '100% PM&DC NOC Entitled',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-500/40',
        detail: 'Your marks fulfill the regulatory criteria for 100% English-medium MOE-approved medical universities with PM&DC green list accreditation.'
      };
    }
    return {
      status: 'High Merit / Scholarship Candidate',
      badge: 'CSC & Provincial Eligible',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-500/40',
      detail: 'Your academic profile qualifies for Chinese University Presidential / Silk Road Belt & Road scholarship consideration.'
    };
  };

  const verdict = getEligibilityVerdict();

  const handleWhatsAppExport = (univName?: string) => {
    const target = univName || matchingUniversities[0]?.name || 'China Universities';
    const message = encodeURIComponent(
      `Assalam-o-Alaikum Humayl Consultants Team,\n\nI evaluated my profile on your website calculator:\n• Program: ${selectedCategory}\n• FSc Marks: ${marksPercentage}%\n• MDCAT Status: ${mdcatStatus}\n• University Preference: ${target}\n\nPlease share official fee structure, seat availability and JW202 visa processing requirements.`
    );
    window.open(`https://wa.me/923000000000?text=${message}`, '_blank');
  };

  return (
    <div id="calculator" className="py-14 sm:py-20 bg-[#070A10] border-y border-white/[0.08] relative">
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-red-600/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-[10px] sm:text-xs font-bold mb-3 shadow-ruby-subtle">
            <Calculator className="w-3.5 h-3.5 text-red-400" />
            <span>Interactive 60-Second Admission Engine</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">
            INSTANT ADMISSION & FEE CALCULATOR
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Find out precisely which MOE-gazetted Chinese medical and engineering universities match your budget and FSc marks. Zero guesswork, 100% transparent.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-5 bg-[#0B0F17] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Your Academic Profile</span>
              </h3>
              <span className="text-[10px] sm:text-xs font-bold text-red-400 bg-red-950/70 px-2.5 py-1 rounded-full border border-red-500/30">
                Step 1 of 3
              </span>
            </div>

            {/* Field Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                1. Desired Study Program
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'MBBS', label: 'MBBS (Medicine)', icon: '🩺' },
                  { id: 'BDS', label: 'BDS (Dentistry)', icon: '🦷' },
                  { id: 'TECH_ENGINEERING', label: 'AI, CS & Eng', icon: '💻' },
                  { id: 'SCHOLARSHIP_POSTGRAD', label: 'CSC MS / PhD', icon: '🎓' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedCategory(item.id as any)}
                    className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                      selectedCategory === item.id
                        ? 'border-red-500 bg-gradient-to-r from-red-950/80 to-rose-950/60 text-white shadow-md shadow-red-900/30 ring-1 ring-red-500/50'
                        : 'border-white/10 bg-[#111622] text-slate-300 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Marks Selection */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                2. FSc / A-Level Marks Percentage
              </label>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  { id: '80+', label: '80%+' },
                  { id: '70-79', label: '70 - 79%' },
                  { id: '60-69', label: '60 - 69%' },
                  { id: 'below-60', label: '< 60%' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMarksPercentage(item.id)}
                    className={`py-2 sm:py-2.5 rounded-xl border text-center text-xs font-bold transition-all ${
                      marksPercentage === item.id
                        ? 'border-red-500 bg-red-600 text-white shadow-md shadow-red-900/40'
                        : 'border-white/10 bg-[#111622] text-slate-300 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MDCAT Status (If Medical) */}
            {selectedCategory === 'MBBS' && (
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  3. MDCAT Examination Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'passed', label: 'Passed 55%+' },
                    { id: 'appearing', label: 'Awaiting 2025' },
                    { id: 'exempt', label: 'Overseas Student' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMdcatStatus(item.id)}
                      className={`p-2 rounded-xl border text-center text-[11px] font-semibold transition-all ${
                        mdcatStatus === item.id
                          ? 'border-red-500 bg-red-950/70 text-red-200'
                          : 'border-white/10 bg-[#111622] text-slate-300 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Annual Budget Filter */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                4. Annual Tuition Budget (PKR)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'any', label: 'All Budgets' },
                  { id: 'low', label: 'Under ₨ 12 Lakhs/yr' },
                  { id: 'mid', label: '₨ 12 - 16 Lakhs/yr' },
                  { id: 'high', label: '₨ 16 Lakhs+/yr' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBudgetTier(item.id)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      budgetTier === item.id
                        ? 'border-red-500 bg-red-950/60 text-white'
                        : 'border-white/10 bg-[#111622] text-slate-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Export Action */}
            <button
              onClick={() => handleWhatsAppExport()}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Official Assessment Voucher on WhatsApp</span>
            </button>
          </div>

          {/* Right Verdict & Matching Colleges Panel */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Regulatory Verdict Box */}
            <div className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border ${verdict.bg} backdrop-blur-xl transition-all shadow-xl`}>
              <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <ShieldCheck className={`w-5 h-5 ${verdict.color} flex-shrink-0`} />
                  <span className={`text-sm sm:text-base font-extrabold ${verdict.color}`}>
                    {verdict.status}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                  {verdict.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {verdict.detail}
              </p>
            </div>

            {/* Matching Universities Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-red-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Universities Matching Your Profile ({matchingUniversities.length})
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">1 RMB ≈ ₨ {RMB_TO_PKR_RATE}</span>
            </div>

            {/* University Cards Grid */}
            <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
              {matchingUniversities.length > 0 ? (
                matchingUniversities.map(univ => {
                  const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
                  const hostelPKR = Math.round(univ.hostelFeeRMB * RMB_TO_PKR_RATE);

                  return (
                    <div
                      key={univ.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#0B0F17] border border-white/10 hover:border-red-500/40 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-xl"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <img
                          src={univ.image}
                          alt={univ.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-white/10 flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-500/30">
                              {univ.badge || 'MOE English Listed'}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-red-400" /> {univ.city}, {univ.province}
                            </span>
                          </div>
                          <Link
                            to={`/university/${univ.id}`}
                            className="text-sm font-bold text-white hover:text-red-400 transition-colors line-clamp-1 block"
                          >
                            {univ.name}
                          </Link>
                          <div className="text-[11px] text-slate-400 truncate mt-0.5">{univ.ranking}</div>
                        </div>
                      </div>

                      {/* Fee & Action */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0 gap-2 flex-shrink-0">
                        <div className="text-left sm:text-right">
                          <div className="text-xs sm:text-sm font-black text-white">
                            ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs<span className="text-[10px] font-normal text-slate-400">/yr</span>
                          </div>
                          <div className="text-[10px] text-slate-400">¥{univ.tuitionFeeRMB.toLocaleString()} RMB tuition</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/university/${univ.id}`}
                            className="px-3 py-1.5 rounded-lg bg-[#111622] hover:bg-[#161D2C] text-[11px] font-bold text-slate-200 border border-white/10 transition-colors"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={() => handleWhatsAppExport(univ.name)}
                            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-[11px] font-bold text-white shadow-md shadow-red-900/30 flex items-center gap-1 transition-all"
                          >
                            <span>Book Seat</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-[#0B0F17] rounded-2xl border border-white/10 text-slate-400 text-xs">
                  No universities found matching your exact filter criteria. Try choosing "All Budgets".
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
