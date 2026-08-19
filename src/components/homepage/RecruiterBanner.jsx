import { useState } from 'react';
import { 
  Building, GraduationCap, ArrowRight, CheckCircle2, 
  Sparkles, Rocket
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function RecruiterBanner() {
  const { user, openSignIn, setView } = useAuth();
  const [activeRoleTab, setActiveRoleTab] = useState('recruiter'); // 'recruiter' | 'student'

  const handleCtaClick = (roleType) => {
    if (user) {
      setView('dashboard');
    } else {
      if (roleType === 'recruiter') {
        openSignIn('demo');
      } else {
        openSignIn('demo');
      }
    }
  };

  return (
    <section className="py-16 bg-[#f8fafc] text-left">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Card Container */}
        <div className="bg-[#0f294a] rounded-[32px] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

          <div className="relative z-10 space-y-8">
            
            {/* Top Toggle Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold mb-2">
                  <Sparkles size={13} />
                  JOIN THE HIRESPHERE NETWORK
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  Ready to Transform Your Campus Placements?
                </h2>
              </div>

              {/* Role Switcher Pill Tabs */}
              <div className="bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/60 flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setActiveRoleTab('recruiter')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeRoleTab === 'recruiter'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building size={14} />
                  For Employers
                </button>

                <button
                  onClick={() => setActiveRoleTab('student')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    activeRoleTab === 'student'
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap size={14} />
                  For Students
                </button>
              </div>
            </div>

            {/* Dynamic Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Details (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {activeRoleTab === 'recruiter' ? (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                      Hire Top Engineering & Business Graduates with <span className="text-blue-400">Zero Operational Friction.</span>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                      Publish your batch drives directly to placement officers, filter candidates by verified CGPA & engineering branch, and schedule interviews seamlessly.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">1-Click Batch Drive Configuration</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">Pre-verified Transcripts & Scores</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">Exportable CSV & Resume ZIPs</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">Integrated Assessment Suites</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleCtaClick('recruiter')}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer group"
                      >
                        <Rocket size={15} />
                        Launch a Campus Drive
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setView('explore');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold px-5 py-3.5 rounded-xl transition-colors border border-slate-700 cursor-pointer"
                      >
                        Explore Active Drives
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                      Land Your Dream Tech & Corporate Career with <span className="text-blue-400">1-Click Applications.</span>
                    </h3>
                    <p className="text-xs md:text-sm text-slate-300 font-medium leading-relaxed max-w-xl">
                      Access verified campus placement opportunities, track interview milestones in real-time, and submit official verified resumes directly to tier-1 companies.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">Smart Eligibility & CGPA Match</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">1-Click Verified Master CV</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">Live Interview Timeline Tracker</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={13} />
                        </span>
                        <span className="text-xs font-bold text-slate-200">Instant Offer Letter Access</span>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleCtaClick('student')}
                        className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer group"
                      >
                        <GraduationCap size={16} />
                        Open Student Portal
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          setView('explore');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-bold px-5 py-3.5 rounded-xl transition-colors border border-slate-700 cursor-pointer"
                      >
                        Browse 50+ Open Roles
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Right Interactive Simulation Card (5 cols) */}
              <div className="lg:col-span-5">
                {activeRoleTab === 'recruiter' ? (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in text-left">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                          G
                        </span>
                        <div>
                          <p className="font-extrabold text-xs text-white">Google India</p>
                          <p className="text-[10px] text-slate-400">Software Engineer (SDE-1)</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        Drive Active
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-400">Total Applicants</p>
                        <p className="text-base font-black text-white mt-0.5">520</p>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] text-slate-400">Shortlisted</p>
                        <p className="text-base font-black text-blue-400 mt-0.5">156</p>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-900/20 border border-blue-700/30 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-semibold text-[11px]">Next: Technical Assessment</span>
                      <span className="text-blue-400 font-bold text-[11px]">Today, 2:00 PM</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 animate-fade-in text-left">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                          S
                        </span>
                        <div>
                          <p className="font-extrabold text-xs text-white">Stripe India</p>
                          <p className="text-[10px] text-slate-400">Backend Infrastructure • ₹36 LPA</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded-full border border-blue-500/30">
                        98% Match
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700/50 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-300 font-medium">
                        <span>Eligibility Gate</span>
                        <span className="text-emerald-400 font-bold">Passed (8.5 CGPA) ✓</span>
                      </div>
                      <div className="flex justify-between text-slate-300 font-medium">
                        <span>Verified Resume Status</span>
                        <span className="text-blue-400 font-bold">Uploaded & Approved</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-900/20 border border-emerald-700/30 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-semibold text-[11px]">Round 2 Technical Interview</span>
                      <span className="text-emerald-400 font-bold text-[11px]">Oct 24, 10:30 AM</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
