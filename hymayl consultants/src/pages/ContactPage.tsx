import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Building2, Sparkles } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    program: 'MBBS (English Medium)',
    marks: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Assalam-o-Alaikum Humayl Consultants,\n\nI submitted an inquiry through your website:\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• City: ${formData.city}\n• Program: ${formData.program}\n• Marks %: ${formData.marks}\n• Note: ${formData.message}`
    );
    window.open(`https://wa.me/923000000000?text=${text}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-[#05070B] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Contact & Corporate Locations</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <Building2 className="w-3.5 h-3.5 text-red-400" />
            <span>SECP Registered Corporate Offices</span>
          </div>
          <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white mb-4">
            VISIT OUR OFFICES OR REACH OUR CHINA DESK
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our physical counseling centers in Lahore and Islamabad are open Monday through Saturday for parents and students. Walk in for 1-on-1 counseling with experienced advisors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Physical Offices */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Lahore Office */}
            <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
                Punjab Head Office
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">Lahore Center</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Suite 402, 4th Floor, Al-Hafeez Heights, Ghalib Road, Gulberg III, Lahore, Pakistan.
              </p>
              <div className="space-y-2 text-xs text-slate-300 border-t border-white/[0.06] pt-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>+92 300 0000000 / +92 42 35780000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon - Sat: 9:30 AM - 6:30 PM (Walk-ins Welcome)</span>
                </div>
              </div>
            </div>

            {/* Islamabad Office */}
            <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-red-500/30 transition-all shadow-xl">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-red-950 text-red-300 border border-red-500/30 uppercase tracking-wider">
                Capital Branch
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">Islamabad Office</h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Ground Floor, Beverly Centre, Jinnah Avenue, Blue Area, Islamabad, Pakistan.
              </p>
              <div className="space-y-2 text-xs text-slate-300 border-t border-white/[0.06] pt-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>+92 300 0000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon - Sat: 10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* China Ground Hubs */}
            <div className="p-7 rounded-3xl bg-[#0B0F17] border border-white/10 hover:border-emerald-500/30 transition-all shadow-xl">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider">
                China Ground Support Hubs
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">Changsha & Wuhan Liaison Offices</h3>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                International Students Service Center, Yuelu District, Changsha, Hunan, China & Optics Valley, Wuhan, Hubei.
              </p>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>On-ground airport pickups, biometric room handover, and parent liaison active.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-6 bg-[#0B0F17] p-7 sm:p-9 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Send an Official Inquiry</h3>
            <p className="text-xs text-slate-400 mb-6">
              Our academic counselors reply within 30 minutes during standard business hours.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Inquiry Dispatched Successfully</h4>
                <p className="text-xs text-slate-300">
                  Your details have been connected to our admissions desk on WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bilal Ahmed"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">City in Pakistan</label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Program of Interest</label>
                    <select
                      value={formData.program}
                      onChange={e => setFormData({ ...formData, program: e.target.value })}
                      className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="MBBS (English Medium)">MBBS in China (English)</option>
                      <option value="BDS Dentistry">BDS Dentistry</option>
                      <option value="AI & Computer Science">AI & Computer Science</option>
                      <option value="CSC Fully-Funded Scholarship">CSC MS / PhD Scholarship</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">FSc / A-Level Marks</label>
                    <input
                      type="text"
                      placeholder="e.g. 75%"
                      value={formData.marks}
                      onChange={e => setFormData({ ...formData, marks: e.target.value })}
                      className="w-full bg-[#111622] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Message or Specific University</label>
                  <textarea
                    rows={3}
                    placeholder="Ask about fee structures, hostel accommodation, or visa processing..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#111622] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 hover:shadow-ruby-glow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Lahore Head Office</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
