import { useState } from 'react';
import { 
  Building2, Rocket, ShieldCheck, CheckCircle2, 
  Users, Zap, FileSpreadsheet, Download, 
  Check, Sparkles, Send, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const RECRUITER_STEPS = [
  {
    step: '01',
    title: 'Configure Drive in 2 Minutes',
    desc: 'Define job descriptions, CTC packages, target branches, and minimum CGPA cutoffs using our intuitive multi-step wizard.',
    badge: 'Zero Setup Hassle',
    icon: Rocket,
    iconColor: 'bg-blue-50 text-blue-600',
  },
  {
    step: '02',
    title: 'TPO Institutional Verification',
    desc: 'University placement officers review company profiles, lock interview calendar dates, and broadcast to eligible students.',
    badge: 'Institutional Trust',
    icon: ShieldCheck,
    iconColor: 'bg-emerald-50 text-emerald-600',
  },
  {
    step: '03',
    title: 'Zero-Friction Candidate Screening',
    desc: 'Only students meeting your exact cutoff criteria can apply. Review verified academic scores, GitHub portfolios, and candidate resumes.',
    badge: '100% Verified Data',
    icon: Users,
    iconColor: 'bg-indigo-50 text-indigo-600',
  },
  {
    step: '04',
    title: 'Assess & Roll Out Offers',
    desc: 'Sync HackerEarth/assessment links, track shortlisted interview stages in real-time, and dispatch bulk official offer letters.',
    badge: 'Instant Turnaround',
    icon: Zap,
    iconColor: 'bg-purple-50 text-purple-600',
  },
];

const CORPORATE_PARTNERS = [
  { name: 'Google', category: 'Cloud & Systems', letter: 'G', color: 'bg-blue-50 text-blue-600' },
  { name: 'Microsoft', category: 'Software & AI', letter: 'M', color: 'bg-sky-50 text-sky-600' },
  { name: 'Amazon', category: 'E-Commerce & AWS', letter: 'A', color: 'bg-amber-50 text-amber-600' },
  { name: 'Stripe', category: 'FinTech Infrastructure', letter: 'S', color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Goldman Sachs', category: 'Quantitative Finance', letter: 'GS', color: 'bg-purple-50 text-purple-600' },
  { name: 'Razorpay', category: 'Payments Tech', letter: 'R', color: 'bg-blue-50 text-blue-700' },
  { name: 'Adobe', category: 'Creative Cloud & ML', letter: 'A', color: 'bg-red-50 text-red-600' },
  { name: 'Cisco', category: 'Networking & Security', letter: 'C', color: 'bg-emerald-50 text-emerald-600' },
];

export default function RecruiterWorkflow() {
  const { user, openSignIn, setView } = useAuth();
  const [showBrochureModal, setShowBrochureModal] = useState(false);
  const [brochureSubmitted, setBrochureSubmitted] = useState(false);
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterOrg, setRecruiterOrg] = useState('');

  const handleStartHiring = () => {
    if (user) {
      setView('dashboard');
    } else {
      openSignIn('demo');
    }
  };

  const handleBrochureRequest = (e) => {
    e.preventDefault();
    setBrochureSubmitted(true);
    setTimeout(() => {
      setBrochureSubmitted(false);
      setShowBrochureModal(false);
      setRecruiterEmail('');
      setRecruiterOrg('');
    }, 3000);
  };

  return (
    <section id="for-recruiters" className="py-20 bg-white border-t border-slate-100 text-left">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 mb-3">
            <Building2 size={13} />
            ENTERPRISE CAMPUS RECRUITMENT
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0f294a] tracking-tight mb-4">
            How Industry Leaders Hire on HireSphere
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed">
            Eliminate endless spreadsheet management and unqualified applicants. Experience our end-to-end recruitment pipeline engineered for high-velocity hiring.
          </p>
        </div>

        {/* 1. Corporate Partners Logo Grid */}
        <div className="mb-16 p-6 bg-[#f8fafc] rounded-3xl border border-slate-150">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
            Trusted by Talent Acquisition Teams Across Leading Global Tech Companies
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CORPORATE_PARTNERS.map((partner) => (
              <div 
                key={partner.name}
                className="bg-white rounded-2xl p-3 border border-slate-200/70 shadow-sm flex flex-col items-center justify-center text-center hover:border-blue-300 hover:shadow-md transition-all group cursor-default"
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs mb-1.5 group-hover:scale-105 transition-transform ${partner.color}`}>
                  {partner.letter}
                </span>
                <span className="text-xs font-extrabold text-[#0f294a] leading-tight">{partner.name}</span>
                <span className="text-[9px] text-slate-400 font-semibold truncate w-full mt-0.5">{partner.category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. 4-Step Recruitment Workflow Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {RECRUITER_STEPS.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            return (
              <div 
                key={stepItem.step}
                className="bg-white rounded-3xl p-6 border border-slate-150 shadow-sm hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                      {stepItem.step}
                    </span>
                    <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      {stepItem.badge}
                    </span>
                  </div>

                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${stepItem.iconColor}`}>
                    <Icon size={22} />
                  </span>

                  <h3 className="text-base font-extrabold text-[#0f294a] mb-2 leading-snug">
                    {stepItem.title}
                  </h3>
                  
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {stepItem.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                  <CheckCircle2 size={13} />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Recruiter Bottom CTA Banner & Brochure Action */}
        <div className="bg-gradient-to-br from-[#0f294a] to-[#1e3a8a] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase text-blue-300 bg-blue-900/50 px-2.5 py-0.5 rounded-full border border-blue-400/20">
              <Sparkles size={11} /> 2024 - 2025 Placement Cycle
            </span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight">
              Ready to schedule your campus recruitment drive?
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed">
              Connect directly with 5,000+ verified engineering & MBA students with institutional placement officer support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleStartHiring}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Rocket size={15} />
              Host a Campus Drive
            </button>

            <button
              onClick={() => setShowBrochureModal(true)}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-colors border border-white/15 flex items-center gap-2 cursor-pointer"
            >
              <Download size={14} />
              Placement Brochure
            </button>
          </div>
        </div>

      </div>

      {/* Placement Brochure & Drive Request Modal */}
      {showBrochureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-100 shadow-2xl p-7 relative">
            <button
              onClick={() => setShowBrochureModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <FileSpreadsheet size={20} />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#0f294a]">Placement Brochure & Batch Stats</h3>
                <p className="text-[11px] text-slate-400 font-semibold">Institutional Demographics Report 2024-25</p>
              </div>
            </div>

            {brochureSubmitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2 animate-scale-up">
                <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check size={20} />
                </span>
                <p className="text-xs font-extrabold text-emerald-800">Placement Brochure Sent!</p>
                <p className="text-[11px] text-emerald-600">Check your inbox for the complete batch demographics and past hiring statistics.</p>
              </div>
            ) : (
              <form onSubmit={handleBrochureRequest} className="space-y-3.5 text-xs font-semibold">
                <div>
                  <label className="block text-slate-700 mb-1">Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={recruiterEmail}
                    onChange={(e) => setRecruiterEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google India, Stripe"
                    value={recruiterOrg}
                    onChange={(e) => setRecruiterOrg(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBrochureModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send size={13} />
                    Download Brochure
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
