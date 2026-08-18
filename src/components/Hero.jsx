import { Briefcase, ArrowRight, Check, Clock, GraduationCap, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { user, openSignIn, setView } = useAuth();

  const handleCtaClick = (e) => {
    e.preventDefault();
    if (user) {
      setView('dashboard');
    } else {
      openSignIn('demo');
    }
  };

  const handleExploreJobsClick = (e) => {
    e.preventDefault();
    setView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="top" className="relative overflow-hidden bg-white pt-12 md:pt-16 pb-16 text-left">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Grid: Left copy & CTAs, Right single Job Card */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Placement Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f8f0] px-3.5 py-1 text-xs font-bold text-[#0f8a4f] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#0f8a4f] animate-pulse"></span>
              Placement Season 2025-26 Live
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#0f294a] tracking-tight leading-[1.15]">
              Bridge Your Campus to <br className="hidden sm:inline" />
              Top Career <span className="text-blue-600">Opportunities.</span>
            </h1>

            {/* Subheading text */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              HireSphere seamlessly connects graduating students with top-tier recruiters.
              Automated eligibility matching, 1-click applications, and real-time drive tracking.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={handleExploreJobsClick}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all text-white text-xs font-bold px-6 py-3.5 shadow-md shadow-blue-500/10 hover:shadow-lg focus:outline-none cursor-pointer"
              >
                Explore Active Drives
                <ArrowRight size={15} />
              </button>
              
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-all text-[#0f294a] text-xs font-bold px-6 py-3.5 cursor-pointer focus:outline-none"
              >
                For Recruiters
              </button>
            </div>

          </div>

          {/* Right Hero Column: Floating SDE Job Post Card */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            
            {/* Main Job Card Frame */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 md:p-7 shadow-2xl shadow-slate-200/60 w-full max-w-sm relative transition-transform hover:-translate-y-1 duration-300">
              
              {/* Card Header Row */}
              <div className="flex justify-between items-center mb-6">
                <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 font-black text-xl shadow-sm">
                  G
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8f0] text-[#0f8a4f] text-[10px] font-extrabold px-3 py-1">
                  Applications Open
                </span>
              </div>

              {/* Position and Company */}
              <div>
                <h3 className="text-lg font-bold text-[#0f294a]">Software Dev Engineer</h3>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Google India</p>
              </div>

              {/* Detail Items list */}
              <div className="space-y-3.5 my-6 text-slate-500 text-xs font-semibold">
                <div className="flex items-center gap-3">
                  <Briefcase size={15} className="text-slate-400 shrink-0" />
                  <span>28 LPA • Full-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={15} className="text-slate-400 shrink-0" />
                  <span>B.Tech (CSE, IT) • Min 7.5 CGPA</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-slate-400 shrink-0" />
                  <span>Bangalore / Hyderabad</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={15} className="text-slate-400 shrink-0" />
                  <span>Deadline: 28 Feb 2026</span>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-bold">142 Applied</span>
                <button 
                  onClick={handleCtaClick}
                  className="rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors text-white text-xs font-bold px-4 py-2 cursor-pointer"
                >
                  Apply Now
                </button>
              </div>

              {/* Overlapping Eligibility Badge on the Left Side */}
              <div className="absolute left-[-20px] bottom-[75px] bg-[#e8f8f0] border border-[#d1f2e0] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md shadow-slate-100/80 z-20">
                <span className="w-4 h-4 rounded-full bg-[#0f8a4f] flex items-center justify-center text-white shrink-0">
                  <Check size={10} strokeWidth={3} />
                </span>
                <span className="text-[10px] font-extrabold text-[#0f8a4f]">Eligibility Matched</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
