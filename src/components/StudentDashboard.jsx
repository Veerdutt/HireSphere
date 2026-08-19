import { useState } from 'react';
import {
  LayoutGrid, Briefcase, FileText, CheckCircle2,
  LogOut, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_JOBS, INITIAL_STUDENT_APPLICATIONS } from '../data/mockData';

import StudentOverview from './student/StudentOverview';
import StudentApplications from './student/StudentApplications';
import StudentJobs from './student/StudentJobs';
import StudentResume from './student/StudentResume';

export default function StudentDashboard() {
  const { user, logout, setView } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Simple local state for applied jobs and application list
  const [applications, setApplications] = useState(INITIAL_STUDENT_APPLICATIONS);
  const [appliedJobIds, setAppliedJobIds] = useState([1]); // Default applied to first job

  // Apply handler
  const handleApplySuccess = (job) => {
    setAppliedJobIds((prev) => [...prev, job.id]);
    const newApp = {
      id: Date.now(),
      company: job.company,
      role: job.role,
      appliedDate: 'Just now',
      status: 'Applied',
      nextStep: 'Application Screening',
      salary: job.salary,
      logoLetter: job.logoLetter || job.company[0],
      logoBg: job.logoBg || 'bg-blue-50 text-blue-600',
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'applications', label: 'My Applications', icon: CheckCircle2, badge: applications.length },
    { id: 'jobs', label: 'Campus Drives', icon: Briefcase },
    { id: 'resume', label: 'Institutional Resume', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-slate-100">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">
              H
            </div>
            <div>
              <span className="font-black text-base text-slate-900 tracking-tight">HireSphere</span>
              <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-wider">Student Portal</span>
            </div>
          </div>

          {/* Student Profile Quick View */}
          <div className="my-5 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {user?.name ? user.name[0] : 'S'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Student User'}</p>
              <p className="text-[11px] text-slate-500 truncate">{user?.branch || 'CSE Batch 2026'}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 space-y-1">
          <button
            onClick={() => setView('landing')}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            <Globe className="w-4 h-4" />
            <span>Public Site</span>
          </button>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' && (
          <StudentOverview
            user={user}
            applications={applications}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'applications' && (
          <StudentApplications applications={applications} />
        )}

        {activeTab === 'jobs' && (
          <StudentJobs
            jobs={INITIAL_JOBS}
            appliedJobIds={appliedJobIds}
            onApplySuccess={handleApplySuccess}
          />
        )}

        {activeTab === 'resume' && (
          <StudentResume user={user} />
        )}
      </main>
    </div>
  );
}
