import { Target, Zap, ShieldCheck, Users, CheckCircle2, ArrowRight, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function About() {
  const { openSignIn, user, setView } = useAuth();

  const PILLARS = [
    {
      icon: Target,
      title: 'Smart Eligibility',
      desc: 'Only see jobs that match your branch, CGPA, and skills so you never waste time applying.',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: Zap,
      title: 'Easy 1-Click Apply',
      desc: 'Apply in one click, attach your PDF resume, and follow your application status step by step.',
      color: 'text-[#0f8a4f]',
      bg: 'bg-[#e8f8f0]',
    },
    {
      icon: ShieldCheck,
      title: 'Verified Profiles',
      desc: 'Student marks and branch details are verified by the college, giving recruiters trusted info.',
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      icon: Users,
      title: 'All in One Place',
      desc: 'Brings graduating students, company recruiters, and the college placement cell onto one portal.',
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden text-left border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main 2-Column Section */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Simple Story */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Pill */}
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold px-3.5 py-1">
              <Award size={14} className="text-blue-600" />
              ABOUT HIRESPHERE
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f294a] tracking-tight leading-tight">
              Making Campus Placements <span className="text-blue-600">Simple & Organized.</span>
            </h2>

            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              HireSphere is a straightforward campus placement platform designed to connect students, recruiters, and the college placement office in one organized place.
            </p>

            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Instead of tracking drives across messy spreadsheets and chat groups, students can easily apply to verified drives, upload their resumes, and check real-time interview updates.
            </p>

            {/* Checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#e8f8f0] text-[#0f8a4f] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={13} />
                </span>
                <span className="text-xs font-bold text-[#0f294a]">Verified student marks and branch details</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#e8f8f0] text-[#0f8a4f] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={13} />
                </span>
                <span className="text-xs font-bold text-[#0f294a]">Direct PDF resume upload and 1-click apply</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#e8f8f0] text-[#0f8a4f] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={13} />
                </span>
                <span className="text-xs font-bold text-[#0f294a]">Clear application status from applied to shortlisted</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (user) setView('dashboard');
                  else openSignIn('demo');
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white text-xs font-bold px-6 py-3.5 shadow-md shadow-blue-500/10 cursor-pointer"
              >
                <span>{user ? 'Open Dashboard' : 'Try Demo Logins'}</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>

          {/* Right Column: 4 Simple Pillar Cards Grid */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4">
            {PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div 
                  key={pillar.title}
                  className="bg-[#f8fafc] border border-slate-100 hover:border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-sm flex flex-col justify-start text-left"
                >
                  <span className={`flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${pillar.bg} ${pillar.color}`}>
                    <Icon size={20} />
                  </span>
                  <h3 className="text-sm font-bold text-[#0f294a] mb-2">{pillar.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
