import { useState } from 'react';
import {
  LayoutGrid, Users, PlusCircle, LogOut, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_RECRUITER_CANDIDATES, INITIAL_ADMIN_DRIVES } from '../data/mockData';

import RecruiterOverview from './recruiter/RecruiterOverview';
import RecruiterPostDrive from './recruiter/RecruiterPostDrive';
import RecruiterApplicants from './recruiter/RecruiterApplicants';

export default function RecruiterDashboard() {
  const { user, logout, setView } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Simple local states for drives and candidate pipeline
  const [drives, setDrives] = useState(INITIAL_ADMIN_DRIVES);
  const [candidates, setCandidates] = useState(INITIAL_RECRUITER_CANDIDATES);

  const handleUpdateCandidateStatus = (candidateId, newStatus) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c))
    );
  };

  const handleDriveCreated = (newDrive) => {
    setDrives((prev) => [newDrive, ...prev]);
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutGrid },
    { id: 'applicants', label: 'Applicant Pipeline', icon: Users, badge: candidates.length },
    { id: 'post', label: 'Post Campus Drive', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2.5 pb-6 border-b border-slate-100">
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">
              H
            </div>
            <div>
              <span className="font-black text-base text-slate-900 tracking-tight">HireSphere</span>
              <span className="block text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Recruiter Portal</span>
            </div>
          </div>

          {/* Recruiter Profile Card */}
          <div className="my-5 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              {user?.name ? user.name[0] : 'R'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Recruiter'}</p>
              <p className="text-[11px] text-slate-500 truncate">{user?.organization || 'Amazon Web Services'}</p>
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
                      ? 'bg-emerald-600 text-white shadow-sm'
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

        {/* Footer Links */}
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
          <RecruiterOverview
            user={user}
            candidates={candidates}
            drives={drives}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'applicants' && (
          <RecruiterApplicants
            candidates={candidates}
            onUpdateStatus={handleUpdateCandidateStatus}
          />
        )}

        {activeTab === 'post' && (
          <RecruiterPostDrive onDriveCreated={handleDriveCreated} />
        )}
      </main>
    </div>
  );
}
