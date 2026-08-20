import { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Home as HomeIcon, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Active Drives', target: 'active-drives', isRoute: false },
  { label: 'Explore Jobs', target: '/explore', isRoute: true },
  { label: 'For Recruiters', target: 'for-recruiters', isRoute: false },
  { label: 'Stats', target: 'stats', isRoute: false },
  { label: 'About', target: 'about', isRoute: false },
  { label: 'Help', target: 'faq', isRoute: false },
];

export default function Navbar() {
  const { user, openSignIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const handleSectionLinkClick = (e, targetId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#' + targetId);
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const offset = 90;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 150);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 md:px-6 w-full text-left">
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl px-6 h-16 md:h-18 flex items-center justify-between shadow-lg shadow-slate-100/40">
        
        {/* Logo Branding */}
        <Link 
          to="/"
          className="flex items-center gap-2.5 cursor-pointer text-left focus:outline-none group"
        >
          <img
            src="/logo.png"
            alt="HireSphere Logo"
            className="w-9 h-9 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
          />
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-tight text-slate-800 group-hover:text-[#5551ff] transition-colors">
              HireSphere
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            if (link.isRoute) {
              return (
                <NavLink
                  key={link.label}
                  to={link.target}
                  className={({ isActive }) =>
                    `text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#5551ff] font-bold'
                        : 'text-slate-500 hover:text-[#5551ff]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              );
            }

            return (
              <a
                key={link.label}
                href={`/#${link.target}`}
                onClick={(e) => handleSectionLinkClick(e, link.target)}
                className="text-xs font-semibold transition-colors cursor-pointer text-slate-500 hover:text-[#5551ff]"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA & User Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            /* Authenticated Dropdown Menu */
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 pr-3 hover:bg-slate-50 rounded-full transition-all border border-slate-100 hover:border-slate-200 cursor-pointer focus:outline-none"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-black shadow-inner select-none ${user.avatarColor || 'bg-gradient-to-tr from-[#5551ff] to-[#6366f1]'}`}>
                  {getInitials(user.name)}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-slate-800">{user.name}</span>
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md mt-0.5 max-w-max leading-none ${
                    user.role === 'Student' ? 'text-blue-600 bg-blue-50/80' : 
                    user.role === 'TPO' ? 'text-emerald-600 bg-emerald-50/80' : 
                    'text-purple-600 bg-purple-50/80'
                  }`}>
                    {user.role}
                  </span>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-100 shadow-xl py-2 z-20 animate-scale-up">
                    <div className="px-4 py-3 border-b border-slate-50 text-left select-none">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate mt-0.5">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-semibold text-slate-700 hover:text-[#5551ff] flex items-center gap-2.5 transition-colors focus:outline-none cursor-pointer"
                    >
                      <LayoutDashboard size={16} />
                      View Dashboard
                    </Link>
                    
                    <div className="border-t border-slate-50 my-1"></div>

                    <button
                      onClick={() => { logout(); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm font-semibold text-red-600 flex items-center gap-2.5 transition-colors focus:outline-none cursor-pointer"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Anonymous Login Button */
            <button
              onClick={() => openSignIn('demo')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5551ff] to-[#6366f1] hover:from-[#433ee5] hover:to-[#5551ff] transition-all text-white text-xs font-semibold px-5 py-2.5 shadow-md shadow-indigo-500/10 hover:shadow-lg focus:outline-none cursor-pointer duration-300 hover:-translate-y-0.5"
            >
              Login
            </button>
          )}
        </div>

      </div>
    </header>
  );
}