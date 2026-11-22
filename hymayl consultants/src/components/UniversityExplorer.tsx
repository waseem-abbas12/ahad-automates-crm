import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { Search, Filter, ShieldCheck, Bed, MapPin, GraduationCap, ArrowUpRight, DollarSign, CheckCircle2, Building2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const UniversityExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'MBBS' | 'BDS' | 'TECH_ENGINEERING' | 'SCHOLARSHIP_POSTGRAD'>('MBBS');
  const [currency, setCurrency] = useState<'PKR' | 'RMB'>('PKR');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUniversities = UNIVERSITIES.filter(univ => {
    if (activeTab !== 'ALL' && univ.category !== activeTab) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        univ.name.toLowerCase().includes(q) ||
        univ.city.toLowerCase().includes(q) ||
        univ.province.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleInquiry = (univName: string) => {
    const message = encodeURIComponent(
      `Assalam-o-Alaikum Humayl Consultants Team,\n\nI want details regarding admission at *${univName}* for the 2025 intake.\nPlease share the complete fee breakdown, PM&DC NOC eligibility, and document submission requirements.`
    );
    window.open(`https://wa.me/923000000000?text=${message}`, '_blank');
  };

  return (
    <div id="mbbs" className="py-20 bg-[#05070B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
              <span>Official MOE China & PM&DC Gazetted List (2025 Intake)</span>
            </div>
            <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white">
              VERIFIED CHINESE UNIVERSITIES & FEES
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Compare 100% English-medium medical colleges and top-ranked engineering faculties. Transparent pricing with zero agent markups.
            </p>
          </div>

          {/* Currency Toggle Switcher */}
          <div className="flex items-center gap-2 bg-[#0B0F17] p-1.5 rounded-2xl border border-white/10 self-start md:self-auto shadow-xl">
            <span className="text-xs font-semibold text-slate-400 px-2">Show Fees in:</span>
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currency === 'PKR'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              PKR (₨)
            </button>
            <button
              onClick={() => setCurrency('RMB')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currency === 'RMB'
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-900/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              RMB (¥)
            </button>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'MBBS', label: 'MBBS in China (English)' },
              { id: 'BDS', label: 'Dentistry (BDS)' },
              { id: 'TECH_ENGINEERING', label: 'AI, CS & Engineering' },
              { id: 'SCHOLARSHIP_POSTGRAD', label: 'CSC Fully-Funded MS/PhD' },
              { id: 'ALL', label: 'All Programs' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  activeTab === tab.id
                    ? 'border-red-500 bg-gradient-to-r from-red-950/80 to-rose-950/60 text-white shadow-lg shadow-red-950/50 ring-1 ring-red-500/50'
                    : 'border-white/[0.08] bg-[#0B0F17] text-slate-300 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[270px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search university or city..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B0F17] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 shadow-inner"
            />
          </div>
        </div>

        {/* University Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map(univ => {
            const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
            const hostelPKR = Math.round(univ.hostelFeeRMB * RMB_TO_PKR_RATE);

            return (
              <div
                key={univ.id}
                className="rounded-2xl sm:rounded-3xl bg-[#0B0F17] border border-white/[0.08] hover:border-red-500/40 transition-all duration-300 flex flex-col overflow-hidden group hover:shadow-2xl hover:shadow-red-950/30"
              >
                {/* Image Banner */}
                <Link to={`/university/${univ.id}`} className="relative h-48 sm:h-52 overflow-hidden bg-slate-900 block">
                  <img
                    src={univ.image}
                    alt={univ.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17] via-[#0B0F17]/40 to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {univ.badge && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md">
                        {univ.badge}
                      </span>
                    )}
                    {univ.moeListed && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                        MOE English Listed
                      </span>
                    )}
                  </div>

                  {/* City Location */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-slate-200 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{univ.city}, {univ.province}</span>
                  </div>
                </Link>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] font-medium text-slate-400 mb-1">{univ.chineseName}</div>
                    <Link
                      to={`/university/${univ.id}`}
                      className="text-lg font-bold text-white group-hover:text-red-400 transition-colors leading-snug mb-2 block"
                    >
                      {univ.name}
                    </Link>
                    <p className="text-xs text-slate-400 mb-4">{univ.ranking}</p>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-white/[0.06] mb-4">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-medium">Instruction</span>
                        <span className="text-white font-semibold">{univ.language}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-medium">Intake</span>
                        <span className="text-red-400 font-semibold">{univ.intakeSeason}</span>
                      </div>
                      {univ.hospitalBeds && (
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-medium">Hospital Beds</span>
                          <span className="text-white font-semibold">{univ.hospitalBeds.toLocaleString()}+ Beds</span>
                        </div>
                      )}
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-medium">Availability</span>
                        <span className="text-emerald-400 font-semibold">{univ.seatsRemaining} Seats Open</span>
                      </div>
                    </div>

                    {/* Key Bullets */}
                    <ul className="space-y-1.5 mb-6 text-xs text-slate-300">
                      {univ.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                        Annual Tuition
                      </div>
                      {currency === 'PKR' ? (
                        <div>
                          <span className="text-base font-extrabold text-white">
                            ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs
                          </span>
                          <span className="text-[10px] text-slate-400 block">≈ ¥{univ.tuitionFeeRMB.toLocaleString()} RMB/yr</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-base font-extrabold text-white">
                            ¥{univ.tuitionFeeRMB.toLocaleString()} RMB
                          </span>
                          <span className="text-[10px] text-slate-400 block">≈ ₨ {(tuitionPKR / 100000).toFixed(2)} Lakhs</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/university/${univ.id}`}
                        className="px-3 py-2 bg-[#111622] hover:bg-[#161D2C] text-slate-200 hover:text-white text-xs font-semibold rounded-xl border border-white/10 transition-colors"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => handleInquiry(univ.name)}
                        className="px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-red-900/30"
                      >
                        <span>Inquire JW202</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
