import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

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
    <div id="faq" className="py-20 bg-[#07090E] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Clear Answers, Zero Deception</span>
          </div>
          <h2 className="brand-font text-2xl sm:text-4xl font-extrabold text-white mb-3">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Every critical concern addressed with official PM&DC and Chinese MOE factual verification.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#0F141C] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-white/[0.02]"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center flex-shrink-0 text-red-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need More Assistance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0F141C] border border-white/10 text-center">
          <h4 className="text-base font-bold text-white mb-2">Have a specific question about your marks or visa?</h4>
          <p className="text-xs text-slate-400 mb-4">Our senior educational advisors are available 7 days a week for 1-on-1 parent counseling.</p>
          <a
            href="https://wa.me/923000000000?text=Assalam-o-Alaikum%20Humayl%20Team%2C%20I%20have%20a%20question%20regarding%20China%20admissions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-red-900/30"
          >
            <span>Ask a Senior Counselor on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
