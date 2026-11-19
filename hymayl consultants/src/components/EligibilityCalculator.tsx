import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { Calculator, Check, ArrowRight, ShieldCheck, MessageSquare } from 'lucide-react';

export const EligibilityCalculator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'MBBS' | 'BDS' | 'TECH_ENGINEERING' | 'SCHOLARSHIP_POSTGRAD'>('MBBS');
  const [marksPercentage, setMarksPercentage] = useState<string>('70-79');
  const [budgetTier, setBudgetTier] = useState<string>('any');
  const [mdcatStatus, setMdcatStatus] = useState<string>('passed');

  // Filter matching universities
  const matchingUniversities = UNIVERSITIES.filter(univ => {
    if (univ.category !== selectedCategory) return false;
    if (budgetTier === 'low' && univ.tuitionFeeRMB > 30000) return false;
    if (budgetTier === 'scholarship' && univ.tuitionFeeRMB > 0) return false;
    return true;
  });

  const getEligibilityVerdict = () => {
    if (selectedCategory === 'MBBS') {
      if (marksPercentage === 'below-60') {
        return {
          status: 'Conditional / Pre-Med Foundation',
          color: 'text-amber-400',
          bg: 'bg-amber-950/40 border-amber-500/30',
          detail: 'PM&DC requires minimum 60% in FSc Pre-Medical for foreign NOC eligibility. You may qualify for foundation or bilingual tracks.'
        };
      }
      return {
        status: 'Guaranteed Direct Admission Eligible',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40 border-emerald-500/30',
        detail: 'You meet the 100% criteria for MOE-approved English-medium MBBS universities with PM&DC NOC entitlement.'
      };
    }
    return {
      status: 'High Merit / Scholarship Candidate',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-500/30',
      detail: 'Your academic profile qualifies for Chinese University / CSC Presidential scholarship consideration.'
    };
  };

  const verdict = getEligibilityVerdict();

  const handleWhatsAppExport = (univName?: string) => {
    const target = univName || matchingUniversities[0]?.name || 'China Universities';
    const message = encodeURIComponent(
      `Assalam-o-Alaikum Humayl Consultants Team,\n\nI evaluated my profile on your website:\n• Program: ${selectedCategory}\n• FSc Marks: ${marksPercentage}%\n• MDCAT: ${mdcatStatus}\n• University: ${target}\n\nPlease share official fee structure, seat availability and JW202 visa processing requirements.`
    );
    window.open(`https://wa.me/923000000000?text=${message}`, '_blank');
  };

  return (
    <div id="calculator" className="py-12 sm:py-16 bg-[#090D14] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-400 text-[10px] sm:text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive 60-Second Evaluation</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3">
            INSTANT ADMISSION & FEE CALCULATOR
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Find out precisely which MOE-gazetted Chinese medical and engineering universities match your budget and FSc marks. Zero guesswork.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Form Panel */}
          <div className="lg:col-span-5 bg-[#0F141C] p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Your Academic Profile</span>
              <span className="text-[10px] sm:text-xs font-semibold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-500/30">Step 1 of 3</span>
            </h3>

            {/* Field Selection */}
            <div className="mb-4 sm:mb-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                Desired Study Program
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
                    className={`p-2.5 sm:p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      selectedCategory === item.id
                        ? 'border-red-500 bg-red-950/60 text-white shadow-md shadow-red-900/30'
                        : 'border-white/5 bg-[#141B26] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-sm">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* FSc / Intermediate Percentage */}
            <div className="mb-4 sm:mb-5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                FSc / A-Level Marks Percentage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: '80-plus', label: '80% and Above' },
                  { id: '70-79', label: '70% - 79%' },
                  { id: '60-69', label: '60% - 69%' },
                  { id: 'below-60', label: 'Below 60%' },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMarksPercentage(item.id)}
                    className={`py-2 px-1 rounded-lg border text-center text-xs font-bold transition-all ${
                      marksPercentage === item.id
                        ? 'border-red-500 bg-red-600 text-white'
                        : 'border-white/5 bg-[#141B26] text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* MDCAT Status (If MBBS/BDS) */}
            {(selectedCategory === 'MBBS' || selectedCategory === 'BDS') && (
              <div className="mb-4 sm:mb-5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                  MDCAT Examination Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'passed', label: 'Passed (55%+)' },
                    { id: 'appearing', label: 'Appearing 2025' },
                    { id: 'exempt', label: 'Foreign / A-Level' },
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMdcatStatus(item.id)}
                      className={`py-2 px-2 rounded-lg border text-center text-xs font-semibold transition-all ${
                        mdcatStatus === item.id
                          ? 'border-red-500 bg-red-950/60 text-white'
                          : 'border-white/5 bg-[#141B26] text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Budget Range */}
            <div className="mb-5 sm:mb-6">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-2">
                Target Annual Tuition Budget
              </label>
              <select
                value={budgetTier}
                onChange={e => setBudgetTier(e.target.value)}
                className="w-full bg-[#141B26] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
              >
                <option value="any">Any Budget (Show All MOE Listed)</option>
                <option value="low">Under 12 - 14 Lakh PKR/yr (Economical)</option>
                <option value="scholarship">100% Fully Funded Scholarship Only</option>
              </select>
            </div>

            <button
              onClick={() => handleWhatsAppExport()}
              className="w-full py-3 sm:py-3.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-300" />
              <span>Discuss Eligibility on WhatsApp</span>
            </button>
          </div>

          {/* Right Results Panel */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Instant Verdict Banner */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${verdict.bg} flex items-start gap-3 sm:gap-4`}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Humayl Advisory Eligibility Verdict
                </div>
                <div className={`text-sm sm:text-base font-extrabold ${verdict.color} mb-1 flex items-center gap-1.5`}>
                  <span>{verdict.status}</span>
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {verdict.detail}
                </p>
              </div>
            </div>

            {/* University Matches Count Header */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
              <span>{matchingUniversities.length} Top Chinese Universities Matched</span>
              <span className="text-slate-500 text-[11px]">1 RMB ≈ 39.5 PKR</span>
            </div>

            {/* Cards of Matched Universities */}
            <div className="space-y-3">
              {matchingUniversities.slice(0, 3).map(univ => {
                const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);

                return (
                  <div
                    key={univ.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {univ.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-500/30">
                            {univ.badge}
                          </span>
                        )}
                        {univ.moeListed && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            MOE Listed
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">{univ.city}, {univ.province}</span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-red-400 transition-colors leading-snug truncate">
                        {univ.name}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{univ.ranking}</p>

                      <div className="flex items-center gap-3 text-xs pt-1">
                        <span className="text-slate-300">
                          Intake: <strong className="text-white">{univ.intakeSeason}</strong>
                        </span>
                        <span className="text-red-400 font-medium">
                          {univ.seatsRemaining} Seats Left
                        </span>
                      </div>
                    </div>

                    {/* Fee Summary Box */}
                    <div className="bg-[#141B26] p-3 rounded-xl border border-white/5 text-left sm:text-right flex-shrink-0 w-full sm:w-auto">
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Annual Tuition Fee
                      </div>
                      <div className="text-base sm:text-lg font-black text-white">
                        ¥{univ.tuitionFeeRMB.toLocaleString()}{' '}
                        <span className="text-xs font-normal text-slate-400">RMB</span>
                      </div>
                      <div className="text-xs font-bold text-red-400">
                        ≈ ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs / yr
                      </div>

                      <button
                        onClick={() => handleWhatsAppExport(univ.name)}
                        className="mt-2 w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Apply on WhatsApp</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
