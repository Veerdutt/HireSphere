import { GraduationCap, Briefcase, ShieldCheck, Check } from 'lucide-react';

export default function Features() {
  const SOLUTIONS = [
    {
      title: 'For Students',
      desc: 'Navigate your career path with intelligent tools designed to maximize your placement chances.',
      icon: GraduationCap,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      hoverBorder: 'hover:border-blue-200',
      points: [
        'Smart Eligibility Check',
        '1-Click Application',
        'Application Tracker'
      ]
    },
    {
      title: 'For Recruiters',
      desc: 'Discover top talent effortlessly with automated screening and seamless interview scheduling.',
      icon: Briefcase,
      iconColor: 'text-[#0f8a4f]',
      iconBg: 'bg-[#e8f8f0]',
      hoverBorder: 'hover:border-emerald-200',
      points: [
        'Auto-Shortlisting',
        'Interview Slot Management',
        'Comprehensive Data Export'
      ]
    },
    {
      title: 'For Placement Cell',
      desc: 'Orchestrate campus hiring with institutional analytics, drive approvals, and compliance reports.',
      icon: ShieldCheck,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      hoverBorder: 'hover:border-indigo-200',
      points: [
        'Drive Approval Workflow',
        'Branch-wise Analytics & CSVs',
        'Student Master Database'
      ]
    }
  ];

  return (
    <section id="features" className="py-20 bg-[#f8fafc] border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-[#0f294a] tracking-tight">Streamlined for Everyone</h2>
          <p className="mt-4 text-sm text-slate-500 leading-relaxed font-semibold">
            A unified ecosystem connecting students, recruiters, and placement officers with precision-engineered tools.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div 
                key={sol.title} 
                className={`bg-white rounded-2xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all duration-300 text-left ${sol.hoverBorder}`}
              >
                <span className={`flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${sol.iconBg} ${sol.iconColor}`}>
                  <Icon size={22} />
                </span>
                <h3 className="text-base font-bold text-[#0f294a] mb-2">{sol.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-6 font-semibold">
                  {sol.desc}
                </p>

                <ul className="space-y-3.5">
                  {sol.points.map((point) => (
                    <li key={point} className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#e8f8f0] text-[#0f8a4f] shrink-0">
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span className="text-xs font-bold text-[#0f294a]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
