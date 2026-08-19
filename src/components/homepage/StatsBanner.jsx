import { Building2, TrendingUp, DollarSign, Percent } from 'lucide-react';

export default function StatsBanner() {
  const STATS = [
    {
      value: '100+',
      label: 'Recruiting Partners',
      icon: Building2,
    },
    {
      value: '₹45 LPA',
      label: 'Highest CTC',
      icon: TrendingUp,
    },
    {
      value: '₹8.5 LPA',
      label: 'Average Package',
      icon: DollarSign,
    },
    {
      value: '94%',
      label: 'Placement Rate',
      icon: Percent,
    },
  ];

  return (
    <section id="stats" className="py-10 bg-white border-y border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-4 text-left">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#e8f8f0] text-[#0f8a4f] shrink-0">
                    <Icon size={22} />
                  </span>
                  <div>
                    <h4 className="text-2xl font-extrabold text-[#0f294a] tracking-tight">{stat.value}</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
