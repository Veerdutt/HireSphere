export default function StatusBadge({ status }) {
  const getBadgeStyle = () => {
    switch (status?.toLowerCase()) {
      case 'shortlisted':
      case 'offered':
      case 'approved':
      case 'verified':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'interviewing':
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under review':
      case 'pending':
      case 'pending review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'applied':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}>
      {status || 'Applied'}
    </span>
  );
}
