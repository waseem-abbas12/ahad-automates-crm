import React from 'react';
import { UtensilsCrossed, Lock, HeartPulse, Building2, ShieldCheck, SunSnow, Wallet, Users2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const LifeInChinaPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Campus Life, Halal Living & Safety</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Parent Reassurance Center</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white mb-4">
            SAFETY, HALAL LIVING & CAMPUS LIFE IN CHINA
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            As a Pakistani parent, sending your child abroad is a monumental emotional decision. Here is how Chinese university campuses provide an environment of safety, dignity, and cultural accommodation for Pakistani sons and daughters.
          </p>
        </div>

        {/* 6 Core Life Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Halal Food Assured</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All our partner universities possess dedicated Muslim canteens (清真食堂 - Qingzhen). Prepared strictly according to Islamic dietary laws by Hui and Uyghur Muslim chefs with certified halal mutton, beef, and poultry.
            </p>
            <span className="text-xs text-red-400 font-semibold">On-Campus Halal Mess</span>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Female Student Hostels & Security</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Female students reside in separate residential buildings equipped with biometric fingerprint gates, 24/7 CCTV, and female wardens. No unauthorized male entry is permitted at any time.
            </p>
            <span className="text-xs text-red-400 font-semibold">Biometric Guarded Hostels</span>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Comprehensive Health Insurance</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Every student is covered under China’s national international student health insurance (Ping An), guaranteeing free or heavily subsidized treatment at university tertiary hospitals for any illness or medical emergency.
            </p>
            <span className="text-xs text-red-400 font-semibold">24/7 Medical Care</span>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Grand Mosques & Prayer Life</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Chinese cities with international universities have active historic Muslim communities and beautiful mosques. Students easily attend Friday Jumu’ah prayers and celebrate Eid gatherings with local and international Muslim scholars.
            </p>
            <span className="text-xs text-red-400 font-semibold">Friday Prayers & Eid</span>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cashless Banking & Family Remittance</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Upon arrival, our Humayl team assists students in opening bank accounts at the Industrial and Commercial Bank of China (ICBC). Parents can send pocket money legally through official banking telegraphic transfer (TT).
            </p>
            <span className="text-xs text-red-400 font-semibold">Alipay & WeChat Setup</span>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Pakistani Student Associations (PSA)</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Senior Pakistani students run established associations on every campus, organizing welcoming dinners for freshers, study groups, cricket tournaments, and Independence Day celebrations under Pakistani Embassy supervision.
            </p>
            <span className="text-xs text-red-400 font-semibold">Active Pakistani Community</span>
          </div>

        </div>

        {/* Parent Hotline Banner */}
        <div className="p-8 rounded-3xl bg-[#0F141C] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Want to speak to a Pakistani parent whose child is currently studying in China?
            </h3>
            <p className="text-xs text-slate-300">
              We connect prospective parents directly with parents in Lahore, Islamabad, Multan, and Karachi for firsthand reassurance.
            </p>
          </div>
          <a
            href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20am%20a%20parent%20and%20want%20to%20discuss%20campus%20safety%20and%20halal%20facilities"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex-shrink-0 shadow-lg shadow-red-900/30"
          >
            Request Parent Counseling Call
          </a>
        </div>

      </div>
    </div>
  );
};
