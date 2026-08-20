import { useState } from 'react';
import { Search, MapPin, DollarSign, Calendar, Check, Send } from 'lucide-react';
import JobApplicationModal from '../common/JobApplicationModal';

export default function StudentJobs({ jobs, appliedJobIds, onApplySuccess }) {
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = jobs.filter((job) =>
    job.role.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Campus Drives & Opportunities</h2>
          <p className="text-xs text-slate-500">Apply to verified drives approved by your college Placement Cell</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search drives, skills, companies..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Jobs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobIds.includes(job.id);

          return (
            <div
              key={job.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center text-sm ${job.logoBg || 'bg-blue-50 text-blue-600'}`}>
                    {job.logoLetter || job.company[0]}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {job.type || 'Full-time'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{job.role}</h3>
                <p className="text-xs text-slate-500 font-medium">{job.company}</p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="font-semibold text-slate-900">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Deadline: {job.deadline}</span>
                  </div>
                </div>

                {job.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                {isApplied ? (
                  <button
                    disabled
                    className="w-full py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl flex items-center justify-center gap-1.5 cursor-default border border-emerald-200"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Applied
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onSubmitSuccess={(job) => {
            onApplySuccess(job);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}
