import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    program: 'MBBS',
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
    <div className="py-12 bg-[#07090E] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-red-400">Home</Link>
          <span>/</span>
          <span className="text-white font-semibold">Contact & Office Locations</span>
        </div>

        {/* Hero */}
        <div className="max-w-3xl mb-14">
          <h1 className="brand-font text-3xl sm:text-5xl font-extrabold text-white mb-4">
            VISIT OUR OFFICES OR REACH OUR CHINA DESK
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Our physical counseling offices in Lahore and Islamabad are open Monday through Saturday for parents and students. Walk in or schedule a 1-on-1 counseling session.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Physical Offices */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Lahore Office */}
            <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 uppercase">
                Punjab Head Office
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Lahore Center</h3>
              <p className="text-xs text-slate-300 mb-4">
                Suite 402, 4th Floor, Al-Hafeez Heights, Ghalib Road, Gulberg III, Lahore, Pakistan.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>+92 300 0000000 / +92 42 35780000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
                </div>
              </div>
            </div>

            {/* Islamabad Office */}
            <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/30 uppercase">
                Capital Branch
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Islamabad Office</h3>
              <p className="text-xs text-slate-300 mb-4">
                Ground Floor, Beverly Centre, Jinnah Avenue, Blue Area, Islamabad, Pakistan.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
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

            {/* China Ground Offices */}
            <div className="p-7 rounded-2xl bg-[#0F141C] border border-white/10 hover:border-red-500/30 transition-all">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase">
                China Ground Support
              </span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">Changsha & Wuhan Liaison Offices</h3>
              <p className="text-xs text-slate-300 mb-3">
                International Students Service Center, Yuelu District, Changsha, Hunan, China & Optics Valley, Wuhan, Hubei.
              </p>
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>24/7 Airport Reception, SIM Card & Dorm Allotment Active</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-6 bg-[#0F141C] p-8 rounded-3xl border border-white/10">
            <h3 className="brand-font text-2xl font-bold text-white mb-2">Book a 1-on-1 Counseling Session</h3>
            <p className="text-xs text-slate-300 mb-6">
              Fill out your details to receive an official fee estimate and PM&DC eligibility assessment via WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Muhammad Ahmed"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">City in Pakistan</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lahore, Islamabad, Multan"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Desired Program</label>
                  <select
                    value={formData.program}
                    onChange={e => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value="MBBS">MBBS in China (English)</option>
                    <option value="BDS">BDS Dentistry</option>
                    <option value="AI_CS">BS/MS Artificial Intelligence & CS</option>
                    <option value="Engineering">Engineering Degrees</option>
                    <option value="CSC_Scholarship">CSC Fully Funded MS/PhD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">FSc / A-Level Marks %</label>
                  <input
                    type="text"
                    placeholder="e.g. 74% or Pre-Medical"
                    value={formData.marks}
                    onChange={e => setFormData({ ...formData, marks: e.target.value })}
                    className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Questions / Specific Preferences</label>
                <textarea
                  rows={3}
                  placeholder="Ask about specific university, hostel, or PM&DC NOC..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#141B26] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-300" />
                <span>Submit & Connect on WhatsApp</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
