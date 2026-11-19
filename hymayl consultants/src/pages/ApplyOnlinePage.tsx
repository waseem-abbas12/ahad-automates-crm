import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, ArrowRight, UploadCloud } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ApplyOnlinePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guardian: '',
    whatsapp: '',
    city: '',
    program: 'MBBS (English Medium)',
    fscMarks: '',
    matricMarks: '',
    mdcat: 'Passed 55%+',
    preferredUniv: 'Shihezi University',
    intake: 'March 2025 (Spring)',
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = 'HC-' + Math.floor(100000 + Math.random() * 900000);
    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Humayl Admissions Committee,\n\nI submitted an Official Online Application on your website:\n• Application Ref: ${refId}\n• Applicant: ${formData.name}\n• Guardian: ${formData.guardian}\n• WhatsApp: ${formData.whatsapp}\n• City: ${formData.city}\n• Program: ${formData.program}\n• Preferred University: ${formData.preferredUniv}\n• Intake: ${formData.intake}\n• FSc Marks: ${formData.fscMarks}\n• Matric Marks: ${formData.matricMarks}\n• MDCAT Status: ${formData.mdcat}\n\nPlease issue my Provisional Admission Assessment & Fee Voucher.`
    );
    window.open(`https://wa.me/923000000000?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Online Application Portal 2025</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official University Application Desk</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-4xl font-extrabold text-white mb-2">
            OFFICIAL ADMISSION APPLICATION
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Submit your details for free document verification and seat reservation in accredited Chinese universities.
          </p>
        </div>

        {/* Application Card */}
        <div className="bg-[#0F141C] p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleApply} className="space-y-6">
            
            {/* Step 1: Personal Info */}
            <div>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/5">
                1. Student & Guardian Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name (as on Passport/CNIC)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Fatima Zahra"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Father / Guardian Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Zahid"
                    value={formData.guardian}
                    onChange={e => setFormData({ ...formData, guardian: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">City in Pakistan</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore / Rawalpindi"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Academic Profile */}
            <div>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/5">
                2. Academic Records
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">FSc / A-Level Marks or %</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 840/1100 or 76%"
                    value={formData.fscMarks}
                    onChange={e => setFormData({ ...formData, fscMarks: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Matric / O-Level %</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 88%"
                    value={formData.matricMarks}
                    onChange={e => setFormData({ ...formData, matricMarks: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">MDCAT Status</label>
                  <select
                    value={formData.mdcat}
                    onChange={e => setFormData({ ...formData, mdcat: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Passed 55%+">Passed (55%+)</option>
                    <option value="Awaiting Result">Awaiting Result / Appearing 2025</option>
                    <option value="Not Applicable">Non-Medical / Foreign Quota</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: University Preferences */}
            <div>
              <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/5">
                3. Program & University Choices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Program</label>
                  <select
                    value={formData.program}
                    onChange={e => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="MBBS (English Medium)">MBBS (English Medium)</option>
                    <option value="BDS Dentistry">BDS (Dentistry)</option>
                    <option value="BS AI / Computer Science">BS AI / Computer Science</option>
                    <option value="Engineering">Engineering Programs</option>
                    <option value="CSC Scholarship Postgrad">CSC Fully Funded MS/PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred University</label>
                  <select
                    value={formData.preferredUniv}
                    onChange={e => setFormData({ ...formData, preferredUniv: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="Shihezi University">Shihezi University (MOE)</option>
                    <option value="Ningxia Medical University">Ningxia Medical University (NXMU)</option>
                    <option value="Zhengzhou University">Zhengzhou University (ZZU)</option>
                    <option value="Jinzhou Medical University">Jinzhou Medical University</option>
                    <option value="Wenzhou Medical University">Wenzhou Medical University</option>
                    <option value="Zhejiang University">Zhejiang University</option>
                    <option value="Harbin Institute of Tech">Harbin Institute of Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Intake Session</label>
                  <select
                    value={formData.intake}
                    onChange={e => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="March 2025 (Spring)">March 2025 (Spring Intake)</option>
                    <option value="September 2025 (Fall)">September 2025 (Fall Intake)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submission Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-900/40 transition-all"
              >
                <span>Submit Application to Admissions Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-3">
                Zero application processing fee. Document evaluation is completely complimentary.
              </p>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
