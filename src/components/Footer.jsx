export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-14 text-left">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img
                src="/logo.png"
                alt="HireSphere Logo"
                className="w-8 h-8 object-contain rounded-lg shadow-sm"
              />
              <span className="text-lg font-bold tracking-tight text-blue-900">HireSphere</span>
            </div>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Empowering students and campus recruiters with automated matching, instant applications, and real-time drive analytics.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-[#0f294a] uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-semibold">
              <li><a href="#active-drives" className="hover:text-blue-600 transition-colors">Active Drives</a></li>
              <li><a href="/explore" className="hover:text-blue-600 transition-colors">Explore Jobs</a></li>
              <li><a href="#stats" className="hover:text-blue-600 transition-colors">Statistics</a></li>
              <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#faq" className="hover:text-blue-600 transition-colors">Help & FAQ</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-bold text-[#0f294a] uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-semibold">
              <li><a href="#features" className="hover:text-blue-600 transition-colors">For Students</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">For Recruiters</a></li>
              <li><a href="#features" className="hover:text-blue-600 transition-colors">Eligibility Matching</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-[#0f294a] uppercase tracking-wider mb-4">Contact Placement Cell</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 font-semibold">
              <li>placements@hiresphere.edu</li>
              <li>+91 (0) 80 2345 6789</li>
              <li>Admin Block, Tech Campus</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-semibold">
          <p>© 2026 HireSphere. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
