import React, { useState } from 'react';
import { UNIVERSITIES, RMB_TO_PKR_RATE } from '../data/universities';
import { Search, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ProgramsDirectoryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [currency, setCurrency] = useState<'PKR' | 'RMB'>('PKR');

  const filtered = UNIVERSITIES.filter(u => {
    if (activeCategory !== 'ALL' && u.category !== activeCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.province.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">All Programs & Chinese Universities</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="brand-font text-3xl sm:text-4xl font-extrabold text-white mb-3">
            CHINESE UNIVERSITY PROGRAM DIRECTORY (2025)
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Browse accredited Medical, Dental, Artificial Intelligence, Engineering, and Fully-Funded Post-Graduate Scholarship opportunities across China.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#0F141C] p-4 rounded-2xl border border-white/10 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'ALL', label: 'All Programs' },
              { id: 'MBBS', label: 'MBBS (English)' },
              { id: 'BDS', label: 'BDS Dentistry' },
              { id: 'TECH_ENGINEERING', label: 'AI, CS & Eng' },
              { id: 'SCHOLARSHIP_POSTGRAD', label: 'CSC Scholarships' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? 'bg-red-600 text-white'
                    : 'bg-[#141B26] text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search university or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#141B26] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#141B26] p-1 rounded-xl border border-white/10 flex-shrink-0">
              <button
                onClick={() => setCurrency('PKR')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${currency === 'PKR' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
              >
                PKR
              </button>
              <button
                onClick={() => setCurrency('RMB')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${currency === 'RMB' ? 'bg-red-600 text-white' : 'text-slate-400'}`}
              >
                RMB
              </button>
            </div>
          </div>
        </div>

        {/* Universities List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(univ => {
            const tuitionPKR = Math.round(univ.tuitionFeeRMB * RMB_TO_PKR_RATE);
            return (
              <div key={univ.id} className="rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/40 transition-all flex flex-col justify-between overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {univ.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30">
                        {univ.badge}
                      </span>
                    )}
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" /> {univ.city}, {univ.province}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">{univ.name}</h3>
                  <div className="text-xs text-slate-400 mb-4">{univ.ranking}</div>

                  <ul className="space-y-1.5 text-xs text-slate-300 mb-6">
                    {univ.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 pt-0 border-t border-white/5">
                  <div className="flex items-center justify-between mb-4 pt-3">
                    <span className="text-xs text-slate-400">Annual Tuition:</span>
                    <span className="text-base font-extrabold text-white">
                      {currency === 'PKR' ? `₨ ${(tuitionPKR / 100000).toFixed(2)} Lakhs` : `¥${univ.tuitionFeeRMB.toLocaleString()} RMB`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/university/${univ.id}`}
                      className="flex-1 py-2.5 text-center bg-[#141B26] hover:bg-[#1E2638] text-white text-xs font-semibold rounded-xl transition-colors border border-white/5"
                    >
                      View Details
                    </Link>
                    <a
                      href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20to%20apply%20for%20${encodeURIComponent(univ.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-red-900/30"
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
  );
};
