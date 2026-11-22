import React from 'react';
import { ShieldCheck, UtensilsCrossed, Lock, Award, FileBadge2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const TrustVault: React.FC = () => {
  return (
    <div id="trust" className="py-20 bg-[#070A10] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Absolute Transparency & Parental Peace of Mind</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            THE HUMAYL INSTITUTIONAL TRUST VAULT
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Why over 2,000+ Pakistani parents and students trust Humayl Consultants SMC (Pvt) Limited over independent brokers and commission agents.
          </p>
        </div>

        {/* 4 Trust Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: Official Authorization */}
          <div className="bg-[#0B0F17] p-7 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5 group-hover:scale-105 transition-transform">
              <FileBadge2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Direct University MOUs</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              We hold official signed authorization certificates from chancellors and deans of top Chinese universities. Zero sub-agents.
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Representation
            </span>
          </div>

          {/* Card 2: PM&DC Compliance */}
          <div className="bg-[#0B0F17] p-7 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">PM&DC & WHO Gazetted</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All recommended medical colleges are listed under the official 43 MOE list and recognized by PM&DC, WHO, and ECFMG (USA).
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Degree Recognition
            </span>
          </div>

          {/* Card 3: Halal Living & Mosques */}
          <div className="bg-[#0B0F17] p-7 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">100% Halal Food Assured</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Every partner campus features dedicated Muslim Canteens (清真食堂 - Qingzhen) operated by Hui/Uyghur Muslim chefs, with nearby mosques for Jumu’ah prayers.
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Muslim Canteens on Campus
            </span>
          </div>

          {/* Card 4: Female Student Safety */}
          <div className="bg-[#0B0F17] p-7 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-5 group-hover:scale-105 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Dedicated Girls Hostels</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Complete security protocol: Separate female dormitories with biometric fingerprint access, 24/7 CCTV surveillance, and Pakistani female student coordinators.
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> 24/7 Biometric Security
            </span>
          </div>
        </div>

        {/* SECP Registration & Payment Policy Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0B0F17] via-[#141B28] to-[#0B0F17] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-red-950 text-red-300 border border-red-500/30">
                SECP REGISTERED
              </span>
              <span className="text-xs text-slate-400 font-medium">Corporate Registration SMC (Pvt) Limited</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Official Direct University Fee Payment Policy
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              We never take university tuition or hostel fees into private personal bank accounts. All official university fees are remitted directly via bank telegraphic transfer (TT) into the university’s official Bank of China / ICBC corporate accounts or paid upon arrival during campus registration.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              to="/about-us"
              className="px-6 py-3.5 bg-[#111622] hover:bg-[#161D2C] text-slate-200 hover:text-white border border-white/10 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md"
            >
              <span>Learn About Humayl SMC</span>
              <ArrowRight className="w-4 h-4 text-red-400" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
