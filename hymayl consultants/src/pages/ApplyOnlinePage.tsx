import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, ArrowRight, UploadCloud, FileText, Check, Printer, RefreshCw, MessageSquare, Sparkles, Building2 } from 'lucide-react';
import { Link } from '../context/RouterContext';
import { UNIVERSITIES } from '../data/universities';

export const ApplyOnlinePage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    guardian: '',
    whatsapp: '',
    email: '',
    city: '',
    program: 'MBBS (100% English Medium)',
    fscMarks: '820 / 1100 (74.5%)',
    matricMarks: '950 / 1100 (86%)',
    mdcat: 'Passed 55%+',
    preferredUniv: 'Shihezi University School of Medicine',
    intake: 'March 2025 (Spring Accelerated)',
    notes: ''
  });

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.whatsapp || !formData.city) {
        alert('Please fill out student name, WhatsApp number, and city.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = 'HC-' + Math.floor(100000 + Math.random() * 900000);
    setRefId(generatedRef);
    setSubmitted(true);

    const msg = encodeURIComponent(
      `Assalam-o-Alaikum Humayl Admissions Committee,\n\nI submitted an Official Online Application on your website:\n• Application Ref: ${generatedRef}\n• Applicant: ${formData.name}\n• Guardian: ${formData.guardian}\n• WhatsApp: ${formData.whatsapp}\n• City: ${formData.city}\n• Program: ${formData.program}\n• Preferred University: ${formData.preferredUniv}\n• Intake: ${formData.intake}\n• FSc Marks: ${formData.fscMarks}\n• MDCAT Status: ${formData.mdcat}\n\nPlease issue my Provisional Admission Assessment & Fee Voucher.`
    );
    window.open(`https://wa.me/923000000000?text=${msg}`, '_blank');
  };

  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Online Application Portal 2025</span>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
            <span>Official University Direct Application Desk</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-4xl font-extrabold text-white mb-2">
            OFFICIAL ADMISSION APPLICATION
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Submit your details for free document verification and direct seat reservation in accredited Chinese national universities. Zero broker fees.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 max-w-xl mx-auto px-4">
          {[
            { num: 1, label: 'Personal Data' },
            { num: 2, label: 'Academic Scores' },
            { num: 3, label: 'University & Intake' }
          ].map(s => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                currentStep >= s.num
                  ? 'bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-md shadow-red-900/40 ring-2 ring-red-500/30'
                  : 'bg-[#111622] text-slate-400 border border-white/10'
              }`}>
                {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${currentStep >= s.num ? 'text-white' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Application Card */}
        <div className="bg-[#0B0F17] p-5 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          
          {!submitted ? (
            <form onSubmit={handleApply} className="space-y-6">
              
              {/* Step 1: Personal Info */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                      1. Student & Guardian Information
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">Step 1 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Student Full Name (as on Passport/CNIC) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fatima Zahra"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Father / Guardian Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Muhammad Zahid"
                        value={formData.guardian}
                        onChange={e => setFormData({ ...formData, guardian: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Mobile Number (Active) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300-1234567"
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="student@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">City in Pakistan *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Lahore, Faisalabad, Islamabad, Multan, Peshawar"
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-900/40"
                    >
                      <span>Continue to Academic Scores</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Info */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                      2. Academic Qualifications & PM&DC Eligibility
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">Step 2 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">FSc Pre-Medical / Pre-Engineering Marks</label>
                      <input
                        type="text"
                        placeholder="e.g. 780 / 1100 (71%)"
                        value={formData.fscMarks}
                        onChange={e => setFormData({ ...formData, fscMarks: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Matric / O-Level Marks</label>
                      <input
                        type="text"
                        placeholder="e.g. 950 / 1100 (86%)"
                        value={formData.matricMarks}
                        onChange={e => setFormData({ ...formData, matricMarks: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">MDCAT Status</label>
                      <select
                        value={formData.mdcat}
                        onChange={e => setFormData({ ...formData, mdcat: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="Passed 55%+">Passed 55%+ (Eligible for Direct PM&DC NOC)</option>
                        <option value="Awaiting MDCAT 2025">Awaiting MDCAT 2025 / Result Pending</option>
                        <option value="Overseas Student">Overseas Pakistani (Exempt)</option>
                        <option value="Non-Medical Student">Non-Medical (Engineering / Computer Science)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 bg-[#111622] text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-white/10"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-900/40"
                    >
                      <span>Continue to Program Choice</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: University Choice */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                    <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">
                      3. University & Intake Selection
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">Step 3 of 3</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Target University</label>
                      <select
                        value={formData.preferredUniv}
                        onChange={e => setFormData({ ...formData, preferredUniv: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        {UNIVERSITIES.map(u => (
                          <option key={u.id} value={u.name}>
                            {u.name} ({u.city})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Intake Session</label>
                      <select
                        value={formData.intake}
                        onChange={e => setFormData({ ...formData, intake: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 sm:py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                      >
                        <option value="March 2025 (Spring Accelerated)">March 2025 (Spring Accelerated Intake)</option>
                        <option value="September 2025 (Primary National Intake)">September 2025 (Primary National Intake)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Inquiries / Preferences</label>
                      <textarea
                        rows={3}
                        placeholder="Mention any specific scholarship requirements, hostel preferences, or visa questions..."
                        value={formData.notes}
                        onChange={e => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full bg-[#111622] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                    <span>Free Document Verification Guarantee. No initial processing fee required.</span>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 bg-[#111622] text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-white/10"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-red-900/40 hover:shadow-ruby-glow transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application & Open WhatsApp Slip</span>
                    </button>
                  </div>
                </div>
              )}

            </form>
          ) : (
            /* Official Generated Application Voucher */
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-900/30 animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
                  Application Logged Successfully
                </span>
                <h3 className="brand-font text-2xl sm:text-3xl font-extrabold text-white mt-3 mb-1">
                  OFFICIAL ADMISSION DOCKET GENERATED
                </h3>
                <div className="text-xs text-slate-400">
                  Application Tracking Reference: <strong className="text-red-400 font-mono text-sm">{refId}</strong>
                </div>
              </div>

              {/* Summary Docket Slip */}
              <div className="p-6 rounded-2xl bg-[#111622] border border-white/10 max-w-lg mx-auto text-left text-xs space-y-2.5">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Student Name:</span>
                  <span className="font-bold text-white">{formData.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Guardian Name:</span>
                  <span className="font-bold text-white">{formData.guardian}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Target University:</span>
                  <span className="font-bold text-red-400">{formData.preferredUniv}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Academic Intake:</span>
                  <span className="font-bold text-white">{formData.intake}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">PM&DC Verification Status:</span>
                  <span className="font-bold text-emerald-400">Under Fast-Track Review</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={`https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Admissions%2C%20my%20application%20reference%20is%20${refId}.%20Please%20verify%20my%20documents.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Connect with Lahore Admissions Officer</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#111622] hover:bg-[#161D2C] text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-white/10"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
