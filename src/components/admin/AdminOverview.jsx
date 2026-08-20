import { ShieldCheck, Building, Users, CheckCircle2, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';

export default function AdminOverview({ user, drives, students, onNavigateTab }) {
  const adminName = user?.name || 'Dr. Arvind Mehta';
  const college = user?.organization || 'Chitkara University';

  const approvedDrives = drives.filter((d) => d.status === 'Approved').length;
  const verifiedStudents = students.filter((s) => s.status === 'Verified').length;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-sm mb-2">
            Placement Cell Office • {college}
          </span>
          <h2 className="text-2xl font-bold">Welcome, {adminName}! 🏛️</h2>
          <p className="text-purple-100 text-sm mt-1">
            Institutional Placement Management & Campus Drive Approval Console
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('drives')}
          className="self-start md:self-auto flex items-center gap-2 bg-white text-purple-800 font-semibold px-4 py-2.5 rounded-xl hover:bg-purple-50 transition shadow-sm text-sm"
        >
          Manage Campus Drives
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Placement Rate" value="86.4%" icon={TrendingUp} color="purple" subtext="2026 Batch to date" />
        <StatCard label="Campus Drives" value={drives.length} icon={Building} color="blue" subtext={`${approvedDrives} Approved & Live`} />
        <StatCard label="Registered Students" value="1,240" icon={Users} color="emerald" subtext={`${verifiedStudents} Verified`} />
        <StatCard label="Highest CTC" value="₹45 LPA" icon={CheckCircle2} color="amber" subtext="Google India (SDE)" />
      </div>

      {/* Two Column Layout: Upcoming Campus Drives & Student Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campus Drives Schedule */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              Scheduled Drives
            </h3>
            <button
              onClick={() => onNavigateTab('drives')}
              className="text-xs text-purple-600 hover:underline font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {drives.slice(0, 3).map((drive) => (
              <div key={drive.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-slate-900">{drive.company} - {drive.role}</p>
                  <p className="text-[11px] text-slate-500">{drive.date} • {drive.ctc}</p>
                </div>
                <StatusBadge status={drive.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Student Eligibility */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Student Academic Status
            </h3>
            <button
              onClick={() => onNavigateTab('students')}
              className="text-xs text-purple-600 hover:underline font-medium"
            >
              Verify List
            </button>
          </div>
          <div className="space-y-3">
            {students.slice(0, 3).map((student) => (
              <div key={student.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-xs text-slate-900">{student.name}</p>
                  <p className="text-[11px] text-slate-500">{student.rollNo} • {student.branch} • CGPA {student.cgpa}</p>
                </div>
                <StatusBadge status={student.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
