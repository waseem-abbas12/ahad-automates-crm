import React from 'react';
import { ShieldCheck, Award, Building2, MapPin, Users2, CheckCircle2, FileBadge2, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const AboutUsPage: React.FC = () => {
  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">About Humayl Consultants SMC (Pvt) Ltd</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
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
          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Our Mission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To dismantle fraudulent broker networks by offering transparent, direct university representation with zero hidden markups and lifetime career guidance for Pakistani doctors and engineers.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Dual-Presence Power</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We operate physical corporate counseling centers in Lahore and Islamabad, paired with permanent Pakistani liaison coordinators on the ground in Changsha, Wuhan, and Beijing.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
            <div className="w-11 h-11 rounded-xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Institutional Integrity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              100% adherence to PM&DC, HEC, and Chinese Ministry of Education directives. We represent only officially gazetted English-medium programs with verifiable track records.
            </p>
          </div>
        </div>

        {/* Official Authorizations Section */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0B0F17] border border-white/10 mb-16 shadow-2xl">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-red-950/70 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0">
              <FileBadge2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
                Direct Representation
              </span>
              <h2 className="brand-font text-2xl font-bold text-white mt-1">
                Official Chinese University Authorization Certificates
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero third-party brokers. Parents can inspect physical authorization certificates signed by university presidents in our Lahore office.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                univ: 'Shihezi University School of Medicine',
                status: 'Direct Authorized Admissions Partner',
                intake: 'Spring & Fall 2025'
              },
              {
                univ: 'Ningxia Medical University (NXMU)',
                status: 'Exclusive Pakistan Liaison Representative',
                intake: 'March / Sept 2025'
              },
              {
                univ: 'Zhengzhou University (ZZU)',
                status: 'Authorized International Desk',
                intake: 'September 2025'
              },
              {
                univ: 'Jinzhou Medical University (JZMU)',
                status: 'Official Regional Coordinator',
                intake: 'March 2025 Open'
              }
            ].map((auth, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#111622] border border-white/5 space-y-2">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified Partner
                </span>
                <h4 className="text-xs font-bold text-white">{auth.univ}</h4>
                <div className="text-[11px] text-slate-400">{auth.status}</div>
                <div className="text-[10px] text-red-400 font-semibold">{auth.intake}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Want to see our official accreditation and legal certificates in person?
            </div>
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-900/30"
            >
              <span>Schedule Office Visit in Lahore</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
