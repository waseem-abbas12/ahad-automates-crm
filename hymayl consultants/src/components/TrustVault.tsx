import React from 'react';
import { ShieldCheck, HeartHandshake, UtensilsCrossed, Lock, Award, FileBadge2, CheckCircle2 } from 'lucide-react';

export const TrustVault: React.FC = () => {
  return (
    <div id="trust" className="py-20 bg-[#090D14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Absolute Transparency & Parental Peace of Mind</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            THE HUMAYL INSTITUTIONAL TRUST VAULT
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Why over 2,000+ Pakistani parents and students trust Humayl Consultants SMC (Pvt) Limited over independent brokers and commission agents.
          </p>
        </div>

        {/* 4 Trust Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Card 1: Official Authorization */}
          <div className="bg-[#0F141C] p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <FileBadge2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Direct University MOUs</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              We hold official signed authorization certificates from chancellors and deans of top Chinese universities. Zero sub-agents.
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified Representation
            </span>
          </div>

          {/* Card 2: PM&DC Compliance */}
          <div className="bg-[#0F141C] p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">PM&DC & WHO Gazetted</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              All recommended medical colleges are listed under the official 43-45 MOE list and recognized by PM&DC, WHO, and ECFMG (USA).
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Degree Recognition
            </span>
          </div>

          {/* Card 3: Halal Living & Mosques */}
          <div className="bg-[#0F141C] p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">100% Halal Food Assured</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Every partner campus features dedicated Muslim Canteens (清真食堂 - Qingzhen) operated by Hui/Uyghur Muslim chefs, with nearby mosques for Jumu’ah prayers.
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Muslim Canteens on Campus
            </span>
          </div>

          {/* Card 4: Female Student Safety */}
          <div className="bg-[#0F141C] p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Dedicated Girls Hostels</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Complete security protocol: Separate female dormitories with biometric fingerprint access, 24/7 CCTV surveillance, and Pakistani female student coordinators.
            </p>
            <span className="text-[11px] font-bold text-red-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 24/7 Biometric Security
            </span>
          </div>
        </div>

        {/* SECP Registration & Payment Policy Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0F141C] via-[#141B26] to-[#0F141C] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-500/30">
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
            <a
              href="https://wa.me/923000000000?text=Assalam-o-Alaikum%2C%20I%20want%20to%20review%20official%20university%20authorization%20letters"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-900/30 block text-center"
            >
              Verify Authorization Letters
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
