import { useState } from 'react';
import { X, CheckCircle2, FileText, Upload, Send, Check } from 'lucide-react';

export default function JobApplicationModal({ job, onClose, onSubmitSuccess }) {
  const [coverNote, setCoverNote] = useState('I am passionate about software engineering and my skills match this role.');
  const [github, setGithub] = useState('https://github.com/my-profile');
  const [resumeType, setResumeType] = useState('institutional'); // 'institutional' | 'custom'
  const [customFileName, setCustomFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleCustomFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCustomFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      if (onSubmitSuccess) onSubmitSuccess(job);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Campus Drive Application</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">{job.role}</h3>
            <p className="text-xs text-slate-500">{job.company} • {job.location || 'Pan India'}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
            <p className="text-sm text-slate-500 mt-1">
              Your profile and {resumeType === 'custom' && customFileName ? customFileName : 'institutional resume'} have been forwarded to {job.company}'s placement drive team.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Compensation & Eligibility Info */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-3 text-xs text-blue-900 space-y-1">
              <p><span className="font-semibold">Package / Stipend:</span> {job.salary}</p>
              {job.eligibility && <p><span className="font-semibold">Eligibility:</span> {job.eligibility}</p>}
            </div>

            {/* Resume Selection */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Resume Attachment</label>
                <div className="flex items-center gap-2 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setResumeType('institutional')}
                    className={`px-2 py-0.5 rounded font-semibold transition ${resumeType === 'institutional'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    Institutional Master
                  </button>
                  <button
                    type="button"
                    onClick={() => setResumeType('custom')}
                    className={`px-2 py-0.5 rounded font-semibold transition ${resumeType === 'custom'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    Upload Custom
                  </button>
                </div>
              </div>

              {resumeType === 'institutional' ? (
                <div className="flex items-center justify-between p-3 border border-slate-200 rounded-xl bg-slate-50 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Verified_Institutional_Resume.pdf</span>
                  </div>
                  <span className="text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Verified
                  </span>
                </div>
              ) : (
                <label className="flex items-center justify-center p-3 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-xl bg-slate-50 cursor-pointer text-xs transition">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleCustomFileChange}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 text-slate-600">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>{customFileName ? customFileName : 'Click to select custom PDF/DOCX'}</span>
                  </div>
                </label>
              )}
            </div>

            {/* Links */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Portfolio URL</label>
              <input
                type="url"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Cover Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Note to Recruiter</label>
              <textarea
                rows="3"
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Briefly state your relevant projects or tech stack..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow transition"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
