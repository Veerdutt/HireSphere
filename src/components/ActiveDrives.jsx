import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, GraduationCap, ArrowRight } from 'lucide-react';

export default function ActiveDrives() {
  const { user, openSignIn, setView } = useAuth();

  const DRIVES = [
    {
      company: 'Microsoft',
      role: 'SDE - 1',
      package: '45 LPA',
      location: 'Bangalore',
      cgpa: '8.0+ CGPA',
      logoLetter: 'M',
      logoColor: 'text-[#f25022] bg-[#f25022]/5',
    },
    {
      company: 'Amazon',
      role: 'Cloud Support Assoc',
      package: '22 LPA',
      location: 'Hyderabad',
      cgpa: '7.5+ CGPA',
      logoLetter: 'A',
      logoColor: 'text-[#ff9900] bg-[#ff9900]/5',
    },
    {
      company: 'Adobe',
      role: 'MTS - 1',
      package: '40 LPA',
      location: 'Noida',
      cgpa: '8.5+ CGPA',
      logoLetter: 'A',
      logoColor: 'text-[#ff0000] bg-[#ff0000]/5',
    },
    {
      company: 'Goldman Sachs',
      role: 'Technology Analyst',
      package: '24 LPA',
      location: 'Bangalore',
      cgpa: '7.0+ CGPA',
      logoLetter: 'G',
      logoColor: 'text-[#006097] bg-[#006097]/5',
    },
  ];

  const handleApplyClick = (e) => {
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
    <section id="active-drives" className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex justify-between items-end mb-10">
          <div className="text-left">
            <h2 className="text-2xl font-extrabold text-[#0f294a]">Featured Active Drives</h2>
            <p className="text-xs text-slate-400 font-semibold mt-1">Top opportunities currently open for application.</p>
          </div>
          <button
            onClick={handleExploreJobsClick}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            View All Drives
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Job Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DRIVES.map((job) => (
            <div
              key={`${job.company}-${job.role}`}
              className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow relative text-left animate-fade-in"
            >
              {/* Top Row: Logo Letter & Status badge */}
              <div className="flex justify-between items-center mb-4">
                <span className={`flex items-center justify-center w-9 h-9 rounded-xl font-black text-base shadow-sm ${job.logoColor}`}>
                  {job.logoLetter}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#e8f8f0] text-[#0f8a4f] text-[9px] font-extrabold px-2 py-0.5">
                  Open
                </span>
              </div>

              {/* Job Title & Company */}
              <h3 className="text-sm font-bold text-[#0f294a] truncate">{job.role}</h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">{job.company}</p>

              {/* Details List */}
              <div className="space-y-2.5 my-5 text-slate-505 text-slate-500 text-[11px] font-semibold">
                <div className="flex items-center gap-2.5">
                  <Briefcase size={13} className="text-slate-400 shrink-0" />
                  <span>{job.package}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin size={13} className="text-slate-400 shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <GraduationCap size={13} className="text-slate-400 shrink-0" />
                  <span>{job.cgpa}</span>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApplyClick}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 transition-colors text-[#0f294a] text-xs font-bold rounded-lg cursor-pointer text-center"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
