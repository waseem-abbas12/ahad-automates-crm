import React from 'react';
import { UtensilsCrossed, Lock, HeartPulse, ShieldCheck, SunSnow, Wallet, Users2, CheckCircle2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const LifeInChinaPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Campus Life, Halal Living & Safety</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Dedicated Parent Peace of Mind Center</span>
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
          
          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Halal Food Assured</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All our partner universities possess dedicated Muslim canteens (清真食堂 - Qingzhen). Prepared strictly according to Islamic dietary laws by Hui and Uyghur Muslim chefs with certified halal mutton, beef, and poultry.
            </p>
            <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> On-Campus Halal Mess Certified
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Female Student Hostels & Security</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Female students reside in separate residential buildings equipped with biometric fingerprint gates, 24/7 CCTV, and female wardens. No unauthorized male entry is permitted at any time.
            </p>
            <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Biometric Guarded Hostels
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <HeartPulse className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Comprehensive Health Insurance</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Every international student is covered under Ping An International Medical Insurance (800 RMB/year). Complete coverage for outpatient, inpatient, and emergency treatments at university teaching hospitals.
            </p>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Full Medical Insurance
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <SunSnow className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Climate & Central Heating</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All dormitories feature government centralized heating (暖气) from November through March, maintaining an indoor temperature of 22°C even during freezing northern winters, plus summer AC.
            </p>
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400" /> 24/7 Heating & AC Included
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Affordable Cost of Living</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Monthly living expenses in Chinese university cities average between 1,000 to 1,500 RMB (₨ 40,000 to ₨ 60,000 PKR), covering 3 daily halal meals, high-speed mobile data, and public transit.
            </p>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Transparent Monthly Budget
            </span>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Pakistani Student Association</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Active Pakistani student unions celebrate Eid-ul-Fitr, Eid-ul-Adha, and Pakistan Day (23rd March) on campus. Senior students organize peer study circles and NLE preparation seminars.
            </p>
            <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Strong Community Support
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
