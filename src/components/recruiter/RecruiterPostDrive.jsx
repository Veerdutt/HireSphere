import { useState } from 'react';
import { Briefcase, Send, CheckCircle2 } from 'lucide-react';

export default function RecruiterPostDrive({ onDriveCreated }) {
  const [role, setRole] = useState('');
  const [ctc, setCtc] = useState('₹24 - 32 LPA');
  const [location, setLocation] = useState('Bangalore / Hybrid');
  const [eligibility, setEligibility] = useState('B.Tech CSE/IT, CGPA ≥ 7.5');
  const [deadline, setDeadline] = useState('Sep 15, 2026');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) return;

    const newDrive = {
      id: Date.now(),
      company: 'Amazon Web Services',
      role,
      date: deadline,
      registered: '0 Students',
      status: 'Pending Admin Approval',
      location,
      ctc,
      eligibility,
    };

    if (onDriveCreated) onDriveCreated(newDrive);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setRole('');
      setDescription('');
    }, 2500);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-600" />
          Create New Campus Drive
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Submit drive details for institutional approval and student registrations.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-bold">Campus Drive Created Successfully!</p>
            <p>Your placement drive has been forwarded to the college Placement Cell for scheduling.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Job Role Title *</label>
          <input
            type="text"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Software Development Engineer - Cloud Systems"
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Package / CTC *</label>
            <input
              type="text"
              required
              value={ctc}
              onChange={(e) => setCtc(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Location / Mode *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
            <input
              type="text"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Registration Deadline</label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Job Description & Skill Requirements</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Outline required technical stack, interview stages, and expectations..."
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition"
          >
            <Send className="w-3.5 h-3.5" />
            Publish Campus Drive
          </button>
        </div>
      </form>
    </div>
  );
}
