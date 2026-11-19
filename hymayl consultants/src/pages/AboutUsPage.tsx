import React from 'react';
import { ShieldCheck, Award, Building2, MapPin, Users2, CheckCircle2, FileBadge2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">About Humayl Consultants SMC (Pvt) Ltd</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECP Corporate Registered Educational Advisory</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white mb-4">
            PAKISTAN'S PREMIER CHINA EDUCATION GATEWAY
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Humayl Consultants SMC (Pvt) Limited is an established foreign education advisory firm dedicated exclusively to placing Pakistani students in accredited, English-medium Chinese institutions with direct government authorization.
          </p>
        </div>

        {/* Vision, Mission, Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Our Mission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To dismantle fraudulent broker networks by offering transparent, direct university representation with zero hidden markups and lifetime career guidance for Pakistani doctors and engineers.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Dual-Presence Power</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We operate physical corporate counseling centers in Lahore and Islamabad, paired with permanent Pakistani liaison coordinators on the ground in Changsha, Wuhan, and Beijing.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Institutional Integrity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              100% adherence to PM&DC, HEC, and Chinese Ministry of Education directives. We represent only officially gazetted English-medium programs with verifiable track records.
            </p>
          </div>
        </div>

        {/* Official Authorizations Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F141C] border border-white/10 mb-16">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
              <FileBadge2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="brand-font text-2xl font-bold text-white mb-1">
                Official University Authorizations & MOUs
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Direct recruitment mandate signed by Chinese university chancellors appointing Humayl Consultants SMC (Pvt) Limited.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Shihezi University School of Medicine', type: 'Exclusive Authorized Representative (Pakistan)', city: 'Xinjiang' },
              { name: 'Ningxia Medical University (NXMU)', type: 'Official International Student Recruitment Partner', city: 'Yinchuan' },
              { name: 'Zhengzhou University (ZZU)', type: 'Verified Academic Exchange Liaison', city: 'Henan' },
              { name: 'Jinzhou Medical University (JZMU)', type: 'Direct Admission Partner (March & Fall)', city: 'Liaoning' },
              { name: 'Wenzhou Medical University (WMU)', type: 'Dental & Medical Academic Facilitator', city: 'Zhejiang' },
              { name: 'Xi’an Jiaotong University (XJTU)', type: 'CSC Postgraduate Candidate Screener', city: 'Shaanxi' },
            ].map((auth, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#141B26] border border-white/5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified MOU</span>
                </div>
                <h4 className="text-sm font-bold text-white">{auth.name}</h4>
                <div className="text-[11px] text-red-400/90">{auth.type}</div>
                <div className="text-[10px] text-slate-400">{auth.city}, China</div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Details */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#141B26] to-[#0F141C] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Corporate Verification</h3>
            <p className="text-xs text-slate-300">
              Humayl Consultants is incorporated under the Companies Act 2017 with the Securities and Exchange Commission of Pakistan (SECP).
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link to="/contact" className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all">
              Visit Our Offices
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
