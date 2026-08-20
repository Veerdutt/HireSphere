import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Plus } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function AdminDrives({ drives, onUpdateDriveStatus, onAddNewDrive }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [ctc, setCtc] = useState('₹28 LPA');
  const [date, setDate] = useState('Sep 10, 2026');
  const [eligibility, setEligibility] = useState('B.Tech CSE/IT, CGPA ≥ 7.5');

  const filteredDrives = drives.filter((d) => {
    const matchesSearch = d.company.toLowerCase().includes(search.toLowerCase()) ||
                          d.role.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || d.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!company || !role) return;
    const newDrive = {
      id: Date.now(),
      company,
      role,
      date,
      registered: 0,
      status: 'Approved',
      location: 'On-Campus',
      ctc,
      eligibility,
    };
    onAddNewDrive(newDrive);
    setShowAddModal(false);
    setCompany('');
    setRole('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Institutional Campus Drives</h2>
          <p className="text-xs text-slate-500">Approve visiting corporate drives and manage campus schedules</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            {['All', 'Approved', 'Pending'].map((tab) => (
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

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs px-3.5 py-1.5 rounded-xl transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Drive
          </button>
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
          className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      {/* Drives Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/50">
              <th className="py-3 px-4">Company & Designation</th>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Drive Date</th>
              <th className="py-3 px-4">Eligibility</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Approval Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDrives.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-8 text-center text-slate-400">
                  No campus drives match the query.
                </td>
              </tr>
            ) : (
              filteredDrives.map((drive) => (
                <tr key={drive.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{drive.company}</div>
                    <div className="text-slate-500 text-[11px]">{drive.role}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{drive.ctc}</td>
                  <td className="py-3.5 px-4 text-slate-600">{drive.date}</td>
                  <td className="py-3.5 px-4 text-slate-500 text-[11px]">{drive.eligibility}</td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={drive.status} />
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => onUpdateDriveStatus(drive.id, 'Approved')}
                        title="Approve Drive"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition border border-emerald-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onUpdateDriveStatus(drive.id, 'Pending')}
                        title="Hold Drive"
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

      {/* Add Drive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Schedule On-Campus Placement Drive</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Cisco Systems"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">CTC Package</label>
                  <input
                    type="text"
                    value={ctc}
                    onChange={(e) => setCtc(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Drive Date</label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow"
                >
                  Confirm & Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
