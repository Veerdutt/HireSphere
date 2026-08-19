import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: 'How do I get started as a student?',
    answer: 'Simply click the "Login" button in the navbar, choose the Student Demo account (or sign in with your email), and you can instantly check placement drives, upload your resume, and monitor your application status.',
  },
  {
    question: 'What features are available for Training and Placement Officers (TPOs)?',
    answer: 'TPOs get access to a complete management console to verify student profiles, approve pending registrations, view branch placement charts, and schedule new campus drives for visiting companies.',
  },
  {
    question: 'How does the Resume Upload & Verification work?',
    answer: 'Students can upload and update their PDF resumes in the student portal. The file is linked to your campus profile and automatically forwarded to recruiters when you apply for on-campus drives.',
  },
  {
    question: 'Can recruiters schedule hiring events directly?',
    answer: 'Yes! The placement office and administrators can add schedules, dates, job descriptions, and eligibility branch filters to create new placement drives, allowing students to apply instantly.',
  },
  {
    question: 'Is the platform data secure?',
    answer: 'Yes. The system supports administrator-configurable security levels, session logs, and simulated role authorization boundaries to keep student records private and secure.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle bottom-left glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10 text-left">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 mb-4">
            <HelpCircle size={13} className="text-indigo-600 shrink-0" />
            Support Center
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-4 text-sm text-slate-500 font-semibold leading-relaxed">
            Find answers to common questions about using the HireSphere campus placement portal.
          </p>
        </div>

        {/* FAQ Accordion Stack */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border ${isOpen ? 'border-blue-500/30 shadow-md shadow-indigo-500/5' : 'border-slate-200/60 shadow-sm'
                  } overflow-hidden transition-all duration-300`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left font-extrabold text-slate-800 hover:text-blue-600 transition-all duration-300 focus:outline-none cursor-pointer select-none"
                >
                  <span className="text-sm md:text-base tracking-tight">{faq.question}</span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                  />
                </button>

                {/* Expandable Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] border-t border-slate-100 bg-slate-50/50' : 'max-h-0'
                    }`}
                >
                  <p className="p-5 md:p-6 text-slate-500 text-xs md:text-sm font-semibold leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
