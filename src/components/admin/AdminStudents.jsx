import { useState } from 'react';
import { Search } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function AdminStudents({ students, onToggleVerification }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                          s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
                          s.branch.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || s.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Student Academic & Eligibility Verification</h2>
          <p className="text-xs text-slate-500">Validate student CGPA, backlogs, and drive clearance before campus interviews</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'Verified', 'Pending Review'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                filter === tab
                  ? 'bg-purple-600 text-white shadow-sm'
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
          placeholder="Search student by name, roll number, or branch..."
          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Roll Number</th>
              <th className="py-3 px-4">Branch & CGPA</th>
              <th className="py-3 px-4">Backlogs</th>
              <th className="py-3 px-4">Offers Received</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-slate-400">
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{student.name}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">{student.rollNo}</td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {student.branch} • <span className="font-bold text-slate-900">{student.cgpa}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {student.backlogs === 0 ? (
                      <span className="text-emerald-600 font-semibold">0 (Clear)</span>
                    ) : (
                      <span className="text-rose-600 font-semibold">{student.backlogs} Active</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{student.offers}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={student.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onToggleVerification(student.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                        student.status === 'Verified'
                          ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {student.status === 'Verified' ? 'Revoke' : 'Verify'}
                    </button>
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
