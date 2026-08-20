import { useState } from 'react';
import {
  FileText, Download, CheckCircle2, ShieldCheck,
  UploadCloud, RefreshCw, Check
} from 'lucide-react';

export default function StudentResume({ user }) {
  const studentName = user?.name || 'Arjun Mehta';
  const defaultFileName = `${studentName.replace(/\s+/g, '_')}_Resume_2026.pdf`;

  // Simple state for current active resume
  const [resumeData, setResumeData] = useState({
    name: defaultFileName,
    size: '1.2 MB',
    uploadedAt: 'Verified for 2026 batch',
    skills: ['React.js', 'Node.js', 'Python', 'PostgreSQL', 'System Design', 'DSA', 'AWS Basics', 'TailwindCSS'],
    isDefault: true,
  });

  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileUpload = (file) => {
    if (!file) return;

    const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    setResumeData({
      name: file.name,
      size: `${fileSizeInMB} MB`,
      uploadedAt: 'Uploaded just now',
      skills: ['React.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'System Design', 'Docker', 'DSA'],
      isDefault: false,
    });

    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleResetToDefault = () => {
    setResumeData({
      name: defaultFileName,
      size: '1.2 MB',
      uploadedAt: 'Verified for 2026 batch',
      skills: ['React.js', 'Node.js', 'Python', 'PostgreSQL', 'System Design', 'DSA', 'AWS Basics', 'TailwindCSS'],
      isDefault: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 inline-block mb-2">
            {resumeData.isDefault ? 'Institutional Verified' : 'Custom Uploaded'}
          </span>
          <h2 className="text-lg font-bold text-slate-900">Student Resume & Documents</h2>
          <p className="text-xs text-slate-500">
            Upload and manage your official PDF resume for on-campus drives and recruiter applications
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {!resumeData.isDefault && (
            <button
              onClick={handleResetToDefault}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Default
            </button>
          )}

          <button
            onClick={() => alert(`Downloading ${resumeData.name}...`)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow transition"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Upload Dropzone Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-1">Upload New Resume</h3>
        <p className="text-xs text-slate-500 mb-4">
          Upload an updated PDF or DOCX resume to attach to all your campus drive applications.
        </p>

        {uploadSuccess && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Resume uploaded and updated successfully!</span>
          </div>
        )}

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition ${isDragging
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/50 hover:bg-slate-50'
            }`}
        >
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleInputChange}
            className="hidden"
          />
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-sm">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-slate-900">
            Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">PDF or DOCX (Max 5MB)</p>
        </label>
      </div>

      {/* Active Resume Information */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{resumeData.name}</h3>
              <p className="text-xs text-slate-500">{resumeData.size} • {resumeData.uploadedAt}</p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            Active Resume
          </span>
        </div>

        {/* Technical Skills */}
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">Key Skills on Profile</h4>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, idx) => (
              <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-lg border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Verification Status */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">Institutional Clearances</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Academic Records & CGPA verified by Placement Cell</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Approved for 2026 On-Campus Hiring Season</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
