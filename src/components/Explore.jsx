import { useState } from 'react';
import { Search, MapPin, DollarSign, Calendar, Send, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { INITIAL_JOBS } from '../data/mockData';
import JobApplicationModal from './common/JobApplicationModal';

const CATEGORIES = ['All', 'Software', 'Data Science', 'Product', 'Design'];

export default function Explore() {
  const { user, openSignIn } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedIds, setAppliedIds] = useState([]);
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);

  const filteredJobs = INITIAL_JOBS.filter((job) => {
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplyClick = (job) => {
    if (!user) {
      openSignIn('demo');
      return;
    }
    setSelectedJobForModal(job);
  };

  const handleApplicationSuccess = (job) => {
    setAppliedIds((prev) => [...prev, job.id]);
    setSelectedJobForModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
          Campus Placements & Drives
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight sm:text-4xl">
          Explore Active Opportunities
        </h1>
        <p className="text-sm text-slate-600 mt-2">
          Discover verified engineering, data, design, and product campus drives from top Tier-1 recruiters.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search role, company, skills..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">No campus drives matching your search criteria.</p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isApplied = appliedIds.includes(job.id);

            return (
              <div
                key={job.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl font-bold flex items-center justify-center text-sm shadow-sm ${job.logoBg}`}>
                      {job.logoLetter}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                      {job.type}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{job.role}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{job.company}</p>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2">{job.description}</p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="font-bold text-slate-900">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Apply by: {job.deadline}</span>
                    </div>
                  </div>

                  {job.tags && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {job.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-medium bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100">
                  {isApplied ? (
                    <button
                      disabled
                      className="w-full py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl flex items-center justify-center gap-2 border border-emerald-200 cursor-default"
                    >
                      <Check className="w-4 h-4" />
                      Applied
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApplyClick(job)}
                      className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      {user ? 'Quick Apply' : 'Sign In to Apply'}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Application Modal */}
      {selectedJobForModal && (
        <JobApplicationModal
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          onSubmitSuccess={handleApplicationSuccess}
        />
      )}
    </div>
  );
}
