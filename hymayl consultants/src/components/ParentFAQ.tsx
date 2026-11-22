import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from '../context/RouterContext';

export const ParentFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is MBBS in China genuinely taught in 100% English medium?',
      a: 'Yes. China’s Ministry of Education (MOE) officially designates 43 to 45 accredited medical universities authorized to teach foreign students in 100% English medium. All clinical lectures, textbooks, and examinations are in English. However, students study conversational Chinese (HSK-4) during their first and second years to communicate fluently with Chinese patients during 5th-year hospital rotations.'
    },
    {
      q: 'What is the critical difference between MOE Listed and Non-MOE Listed universities?',
      a: 'MOE Listed universities are formally permitted by the Chinese Government and PM&DC to teach MBBS in English medium. Non-MOE Listed universities are primarily Chinese-medium colleges that teach international students bilingually. At Humayl Consultants, we strictly prioritize MOE English-medium universities so you face zero hurdles during your PM&DC NOC issuance.'
    },
    {
      q: 'What are PM&DC’s exact rules for issuing an NOC to study MBBS in China?',
      a: 'Under the latest PM&DC Foreign Medical Regulations, Pakistani applicants must: (1) Have at least 60% marks in FSc Pre-Medical (or equivalent Biology/Chemistry/Physics), (2) Pass the MDCAT examination with the minimum qualifying threshold, and (3) Secure admission in a recognized university. Humayl Consultants handles the entire NOC documentation pathway.'
    },
    {
      q: 'What is the absolute truth about MBBS Scholarships in China?',
      a: 'Beware of fraudulent agents who promise "100% Free MBBS with Monthly Stipend" for fresh high school graduates. The Chinese Government Scholarship (CSC) does NOT offer 100% free MBBS for undergraduate medicine. However, prestigious universities offer generous Provincial and University Performance Scholarships (ranging from 5,000 RMB to 20,000 RMB/year) awarded based on semester GPA.'
    },
    {
      q: 'How does Humayl Consultants ensure Halal Food and safety for female students?',
      a: 'All our partner universities possess dedicated Muslim canteens (Qingzhen) certified by local Islamic associations. Female students are housed in separate, biometric-controlled hostels with 24/7 security guards and strict curfew protocols. Our Pakistani female coordinators in China personally oversee hostel room allotment.'
    },
    {
      q: 'How are university tuition and hostel fees paid?',
      a: 'With Humayl Consultants, you enjoy 100% financial security. You never pay university tuition fees into private accounts. Fees are paid either directly via official bank Telegraphic Transfer (TT) into the university’s official Bank of China account, or paid in RMB cash / UnionPay card upon arrival during campus registration.'
    },
    {
      q: 'What is the difference between the March Spring Intake and September Fall Intake?',
      a: 'September is the primary national intake with all 43 MOE universities open. March (Spring Intake) is an accelerated session offered by select top institutions (such as Jinzhou Medical University) designed for students who want to save 6 months of academic delay rather than waiting for next autumn.'
    }
  ];

  return (
    <div id="faq" className="py-20 bg-[#05070B] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-bold mb-3 shadow-ruby-subtle">
            <HelpCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Clear Answers, Zero Deception</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Every critical parental concern addressed with official PM&DC and Chinese MOE factual verification.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-[#0B0F17] border border-white/10 overflow-hidden transition-all duration-300 hover:border-red-500/30 shadow-lg"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform ${
                    isOpen ? 'bg-red-600 text-white rotate-180 shadow-md' : 'bg-[#111622] text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.06] bg-[#080B11]/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions */}
        <div className="text-center mt-12 p-6 rounded-2xl bg-[#0B0F17] border border-white/10">
          <p className="text-xs text-slate-300 mb-3">
            Have a specific concern regarding your child's eligibility or visa documentation?
          </p>
          <a
            href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20have%20a%20question%20regarding%20admission"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
          >
            <span>Ask our Senior Counselor on WhatsApp (+92 300 0000000)</span>
            <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
          </a>
        </div>

      </div>
    </div>
  );
};
