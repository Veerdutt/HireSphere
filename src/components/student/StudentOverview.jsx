import { Briefcase, Calendar, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';

export default function StudentOverview({ user, applications, onNavigateTab }) {
  const studentName = user?.name || 'Arjun Mehta';
  const branch = user?.branch || 'Computer Science & Engineering';
  const cgpa = user?.cgpa || '8.5';
  const college = user?.organization || 'Chitkara University';

  const upcomingInterviews = [
    { company: 'Microsoft', role: 'SDE I - System Design', time: 'Tomorrow, 10:00 AM' },
    { company: 'Google', role: 'SWE - Data Structures', time: 'Aug 24, 2:00 PM' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-2">
            Student Portal • {college}
          </span>
          <h2 className="text-2xl font-bold">Welcome back, {studentName}! 👋</h2>
          <p className="text-blue-100 text-sm mt-1">
            {branch} • CGPA: {cgpa} • Ready for placement season 2026
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('jobs')}
          className="self-start md:self-auto flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-blue-50 transition shadow-sm text-sm"
        >
          Explore Campus Drives
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Applications" value={applications.length} icon={Briefcase} color="blue" subtext="Total drives applied" />
        <StatCard label="Shortlisted" value="2" icon={CheckCircle2} color="emerald" subtext="Cleared initial round" />
        <StatCard label="Interviews" value="2" icon={Calendar} color="purple" subtext="Scheduled this month" />
        <StatCard label="Resume Status" value="Active" icon={FileText} color="amber" subtext="Ready for drives" />
      </div>

      {/* Two Column Layout: Upcoming Interviews & Recent Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Interviews */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Upcoming Interviews
            </h3>
            <span className="text-xs text-blue-600 font-medium">2 Scheduled</span>
          </div>
          <div className="space-y-3">
            {upcomingInterviews.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-slate-900">{item.company}</p>
                  <p className="text-xs text-slate-500">{item.role}</p>
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-1 rounded-lg">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Recent Applications
            </h3>
            <button
              onClick={() => onNavigateTab('applications')}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-slate-900">{app.company}</p>
                  <p className="text-xs text-slate-500">{app.role}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
