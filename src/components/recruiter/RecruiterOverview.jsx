import { Users, CheckCircle2, Calendar, ArrowRight, Briefcase } from 'lucide-react';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';

export default function RecruiterOverview({ user, candidates, drives, onNavigateTab }) {
  const recruiterName = user?.name || 'John Doe';
  const company = user?.organization || 'Amazon Web Services';

  const shortlistedCount = candidates.filter((c) => c.status === 'Shortlisted').length;
  const interviewingCount = candidates.filter((c) => c.status === 'Interviewing').length;

  return (
    <div className="space-y-6">
      {/* Recruiter Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-2">
            Campus Recruiter Portal • {company}
          </span>
          <h2 className="text-2xl font-bold">Welcome, {recruiterName}! 🚀</h2>
          <p className="text-emerald-100 text-sm mt-1">
            Manage your campus hiring drives, shortlist verified talent, and schedule interviews.
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('post')}
          className="self-start md:self-auto flex items-center gap-2 bg-white text-emerald-800 font-semibold px-4 py-2.5 rounded-xl hover:bg-emerald-50 transition shadow-sm text-sm"
        >
          Post New Campus Drive
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Applicants" value={candidates.length} icon={Users} color="emerald" subtext="Across all active drives" />
        <StatCard label="Shortlisted" value={shortlistedCount} icon={CheckCircle2} color="blue" subtext="Ready for technical round" />
        <StatCard label="Interviewing" value={interviewingCount} icon={Calendar} color="purple" subtext="Live interview rounds" />
        <StatCard label="Active Drives" value={drives.length} icon={Briefcase} color="amber" subtext="Campus hiring slots" />
      </div>

      {/* Two Column Section: Active Drives & Recent Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Campus Drives */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Active Campus Drives
            </h3>
            <button
              onClick={() => onNavigateTab('post')}
              className="text-xs text-emerald-600 hover:underline font-medium"
            >
              + Create
            </button>
          </div>
          <div className="space-y-3">
            {drives.map((drive) => (
              <div key={drive.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-slate-900">{drive.role}</p>
                  <p className="text-[11px] text-slate-500">{drive.date} • {drive.location}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">{drive.ctc}</span>
                  <p className="text-[10px] text-emerald-600 font-semibold">{drive.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Recent Applicants
            </h3>
            <button
              onClick={() => onNavigateTab('applicants')}
              className="text-xs text-emerald-600 hover:underline font-medium"
            >
              View Pipeline
            </button>
          </div>
          <div className="space-y-3">
            {candidates.slice(0, 3).map((candidate) => (
              <div key={candidate.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-slate-900">{candidate.name}</p>
                  <p className="text-[11px] text-slate-500">{candidate.branch} • CGPA: {candidate.cgpa}</p>
                </div>
                <StatusBadge status={candidate.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
