import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Clock } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function RecruiterApplicants({ candidates, onUpdateStatus }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredCandidates = candidates.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.role.toLowerCase().includes(search.toLowerCase()) ||
                          c.branch.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || c.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Applicant Pipeline & Screening</h2>
          <p className="text-xs text-slate-500">Review verified student profiles, check match scores, and update candidate stages</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Applied', 'Shortlisted', 'Interviewing', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                filter === tab
                  ? 'bg-emerald-600 text-white shadow-sm'
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
          placeholder="Search student by name, branch, or role..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      {/* Candidates List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
              <th className="py-3 px-4">Student Profile</th>
              <th className="py-3 px-4">Applied Role</th>
              <th className="py-3 px-4">Candidate Skills</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-400">
                  No applicants found matching your filter.
                </td>
              </tr>
            ) : (
              filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{candidate.name}</div>
                    <div className="text-slate-500 text-[11px]">
                      {candidate.branch} • CGPA: <span className="font-bold text-slate-700">{candidate.cgpa}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {candidate.role}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {candidate.skills?.map((s, i) => (
                        <span key={i} className="bg-slate-100 text-slate-700 font-medium px-2 py-0.5 rounded text-[10px] border border-slate-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={candidate.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateStatus(candidate.id, 'Shortlisted')}
                        title="Shortlist"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(candidate.id, 'Interviewing')}
                        title="Schedule Interview"
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition border border-blue-200"
                      >
                        <Clock className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateStatus(candidate.id, 'Rejected')}
                        title="Reject"
                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 transition border border-rose-200"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
