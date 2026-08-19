import { useState } from 'react';
import { Search } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function StudentApplications({ applications }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.company.toLowerCase().includes(search.toLowerCase()) ||
                          app.role.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || app.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Application Tracking</h2>
          <p className="text-xs text-slate-500">Monitor all your campus drive applications in real-time</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Shortlisted', 'Interviewing', 'Under Review'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by company or role..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
              <th className="py-3 px-4">Company & Role</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Applied Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Next Step</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400">
                  No applications found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{app.company}</div>
                    <div className="text-slate-500 text-[11px]">{app.role}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{app.salary || 'Competitive'}</td>
                  <td className="py-3.5 px-4 text-slate-500">{app.appliedDate || 'Recent'}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{app.nextStep || 'In Review'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
