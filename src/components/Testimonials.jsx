import { Star, Sparkles } from 'lucide-react';

const TESTIMONIALS = [
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Software Engineer at TechCorp',
    org: 'IIT Delhi',
    quote:
      "HireSphere made my job search incredibly easy. I found my dream job within weeks of using the platform. The interface is intuitive and the opportunities are high-quality.",
  },
  {
    initials: 'DRK',
    name: 'Dr. Rajesh Kumar',
    role: 'TPO at Engineering College',
    org: 'NIT Warangal',
    quote:
      "As a TPO, this platform has revolutionized how we manage campus placements. The admin panel is comprehensive and the company response has been excellent.",
  },
  {
    initials: 'AP',
    name: 'Ankit Patel',
    role: 'Data Analyst at DataSoft Inc',
    org: 'VIT Vellore',
    quote:
      "The real-time notifications and easy application process helped me stay on top of all opportunities. I received multiple offers through this platform.",
  },
  {
    initials: 'MMS',
    name: 'Ms. Meera Singh',
    role: 'Placement Head',
    org: 'BITS Pilani',
    quote:
      "HireSphere has significantly improved our placement statistics. The platform is user-friendly for both students and administrators.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium px-4 py-1.5 mb-6">
            <Sparkles size={15} />
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-gray-600">
            Hear from students, TPOs, and companies who have found success with our
            platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">
                  {t.initials}
                </span>
                <div>
                  <p className="font-bold text-gray-900 leading-tight">{t.name}</p>
                  <p className="text-sm text-gray-600 leading-tight">{t.role}</p>
                  <p className="text-sm text-gray-400 leading-tight">{t.org}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
