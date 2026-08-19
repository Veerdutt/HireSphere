import { useState, useEffect } from 'react';
import {
  GraduationCap, Sparkles, User, Shield, X, Mail, Lock, LogIn,
  UserPlus, Building, BookOpen, Eye, EyeOff, CheckCircle2,
  AlertCircle, ArrowRight, Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignInModal() {
  const { isSignInOpen, closeSignIn, login, signInDefaultTab } = useAuth();
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'signin' | 'signup'

  useEffect(() => {
    if (isSignInOpen && signInDefaultTab) {
      setActiveTab(signInDefaultTab);
    }
  }, [isSignInOpen, signInDefaultTab]);

  // Sign In Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // Sign Up Form states
  const [signUpRole, setSignUpRole] = useState('Student'); // 'Student' | 'TPO' | 'Admin'
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);

  // Role specific fields
  const [signUpOrganization, setSignUpOrganization] = useState(''); // College or Company
  const [signUpBranch, setSignUpBranch] = useState('Computer Science & Engineering');
  const [signUpCgpa, setSignUpCgpa] = useState('8.5');
  const [signUpRollNo, setSignUpRollNo] = useState('');
  const [signUpDesignation, setSignUpDesignation] = useState('Technical Recruiter');

  if (!isSignInOpen) return null;

  const demoAccounts = [
    {
      name: 'Arjun Mehta',
      role: 'Student',
      email: 'arjun.student@hiresphere.edu',
      avatarColor: 'bg-blue-600',
      icon: GraduationCap,
      themeColor: 'border-blue-100 bg-blue-50/10 hover:bg-blue-50/40 hover:border-blue-300 text-blue-600',
      tagline: 'Student Dashboard • 8.5 CGPA (CSE)',
    },
    {
      name: 'Pranit Kalra',
      role: 'TPO',
      email: 'pranit.kalra@globalrecruiting.com',
      avatarColor: 'bg-emerald-600',
      icon: Building,
      themeColor: 'border-emerald-100 bg-emerald-50/10 hover:bg-emerald-50/40 hover:border-emerald-300 text-emerald-600',
      tagline: 'Recruiter Dashboard • Global Talent Hiring',
    },
    {
      name: 'Dr. Arvind Mehta',
      role: 'Admin',
      email: 'arvind.mehta@hiresphere.edu',
      avatarColor: 'bg-purple-600',
      icon: Shield,
      themeColor: 'border-purple-100 bg-purple-50/10 hover:bg-purple-50/40 hover:border-purple-300 text-purple-600',
      tagline: 'Placement Cell Officer • Institutional Approvals',
    },
  ];

  const handleDemoLogin = (account) => {
    login({
      name: account.name,
      role: account.role,
      email: account.email,
      avatarColor: account.avatarColor,
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    if (!email.trim() || !password) {
      setError('Please fill in your email address and password');
      return;
    }

    // Check registered accounts in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('hiresphere_registered_users') || '[]');
    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (matchedUser) {
      if (matchedUser.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }
      login(matchedUser);
      return;
    }

    // Check demo accounts
    const matchedDemo = demoAccounts.find(
      (d) => d.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (matchedDemo) {
      handleDemoLogin(matchedDemo);
      return;
    }

    // Dynamic fallback login if custom email provided
    const isRecruiter = email.toLowerCase().includes('recruiter') || email.toLowerCase().includes('hr') || email.toLowerCase().includes('company');
    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('tpo') || email.toLowerCase().includes('officer');
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    let resolvedRole = 'Student';
    let resolvedAvatar = 'bg-blue-600';
    if (isAdmin) {
      resolvedRole = 'Admin';
      resolvedAvatar = 'bg-purple-600';
    } else if (isRecruiter) {
      resolvedRole = 'TPO';
      resolvedAvatar = 'bg-emerald-600';
    }

    login({
      name: formattedName,
      role: resolvedRole,
      email: email.trim(),
      avatarColor: resolvedAvatar,
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessNotice('');

    if (!signUpName.trim() || !signUpEmail.trim() || !signUpPassword) {
      setError('Please complete all required fields');
      return;
    }

    if (!signUpEmail.includes('@') || !signUpEmail.includes('.')) {
      setError('Please provide a valid email address');
      return;
    }

    if (signUpPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    // Register user profile
    const registeredUsers = JSON.parse(localStorage.getItem('hiresphere_registered_users') || '[]');
    const alreadyExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === signUpEmail.trim().toLowerCase()
    );

    if (alreadyExists) {
      setError('An account with this email address already exists. Please Sign In.');
      return;
    }

    let avatarColor = 'bg-blue-600';
    if (signUpRole === 'TPO') avatarColor = 'bg-emerald-600';
    if (signUpRole === 'Admin') avatarColor = 'bg-purple-600';

    const newUserProfile = {
      name: signUpName.trim(),
      role: signUpRole,
      email: signUpEmail.trim(),
      password: signUpPassword,
      organization: signUpOrganization.trim() || (signUpRole === 'Student' ? 'National Institute of Technology' : 'TechCorp Global'),
      branch: signUpBranch,
      cgpa: signUpCgpa,
      rollNo: signUpRollNo || '2024CSE109',
      designation: signUpDesignation,
      avatarColor: avatarColor,
      createdAt: new Date().toISOString(),
    };

    registeredUsers.push(newUserProfile);
    localStorage.setItem('hiresphere_registered_users', JSON.stringify(registeredUsers));

    // Auto-login newly registered user
    login(newUserProfile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-left">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={closeSignIn}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-[520px] bg-white rounded-[32px] shadow-2xl p-8 md:p-10 z-10 transition-transform duration-300 animate-scale-up border border-gray-100 max-h-[92vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={closeSignIn}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <img
            src="/logo.png"
            alt="HireSphere Logo"
            className="w-12 h-12 object-contain rounded-2xl shrink-0 shadow-md shadow-blue-500/10"
          />
          <div>
            <h3 className="text-xl font-extrabold text-[#0f294a] leading-tight">HireSphere Portal</h3>
            <p className="text-xs text-slate-400 font-semibold mt-0.5">
              Unified gateway for students, recruiters, and placement officers
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="bg-gray-100/80 p-1.5 rounded-2xl flex gap-1.5 mb-6">
          <button
            onClick={() => { setActiveTab('demo'); setError(''); setSuccessNotice(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'demo'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <Sparkles size={14} />
            Quick Demo
          </button>
          <button
            onClick={() => { setActiveTab('signin'); setError(''); setSuccessNotice(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'signin'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <LogIn size={14} />
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('signup'); setError(''); setSuccessNotice(''); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'signup'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
              }`}
          >
            <UserPlus size={14} />
            Sign Up
          </button>
        </div>

        {/* 1. Quick Demo Tab */}
        {activeTab === 'demo' && (
          <div className="space-y-4">
            <p className="text-center text-[11px] text-slate-400 font-bold uppercase tracking-wider">
              Experience the platform with pre-configured verified accounts
            </p>

            <div className="flex flex-col gap-3">
              {demoAccounts.map((account) => {
                const IconComponent = account.icon;
                return (
                  <button
                    key={account.name}
                    onClick={() => handleDemoLogin(account)}
                    className={`w-full flex items-center justify-between p-4 border rounded-2xl transition-all duration-200 group text-left cursor-pointer ${account.themeColor}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <p className="font-extrabold text-xs text-slate-900 group-hover:text-black">
                          {account.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">{account.tagline}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Enter <ArrowRight size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Sign In Tab */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs font-semibold">
            {error && (
              <div className="p-3.5 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-200 flex items-center gap-2 animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successNotice && (
              <div className="p-3.5 bg-[#e8f8f0] text-[#0f8a4f] rounded-2xl text-xs font-bold border border-emerald-200 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                Email Address *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@hiresphere.edu or company.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                Password *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-xs font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold py-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500/20 border-slate-300 w-4 h-4 cursor-pointer"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => alert('Password reset link sent to your registered email.')}
                className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer font-bold"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn size={15} />
              Sign In to HireSphere
            </button>

            <p className="text-center text-xs text-slate-500 pt-2 font-medium">
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setError(''); setSuccessNotice(''); }}
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors cursor-pointer"
              >
                Create new account
              </button>
            </p>
          </form>
        )}

        {/* 3. Fully Functional Sign Up Tab */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignUpSubmit} className="space-y-4 text-xs font-semibold">
            {error && (
              <div className="p-3.5 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-200 flex items-center gap-2 animate-fade-in">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 3-Role Toggle Selection */}
            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                Select Account Role *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSignUpRole('Student')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${signUpRole === 'Student'
                    ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <GraduationCap size={16} />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSignUpRole('TPO')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${signUpRole === 'TPO'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Building size={16} />
                  <span>Recruiter</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSignUpRole('Admin')}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${signUpRole === 'Admin'
                    ? 'border-purple-600 bg-purple-50 text-purple-600 shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <Shield size={16} />
                  <span>Placement Officer</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                Full Name *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <User size={16} />
                </span>
                <input
                  type="text"
                  required
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  placeholder={
                    signUpRole === 'Student'
                      ? 'e.g. Arjun Mehta'
                      : signUpRole === 'TPO'
                        ? 'e.g. Pranit Kalra'
                        : 'e.g. Dr. Arvind Mehta'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-xs font-medium"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                Official Email Address *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  required
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  placeholder={
                    signUpRole === 'Student'
                      ? 'arjun.student@hiresphere.edu'
                      : signUpRole === 'TPO'
                        ? 'recruiter@company.com'
                        : 'tpo.officer@university.edu'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-800 text-xs font-medium"
                />
              </div>
            </div>

            {/* Role Specific Fields */}
            {signUpRole === 'Student' && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Engineering Branch
                  </label>
                  <select
                    value={signUpBranch}
                    onChange={(e) => setSignUpBranch(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="Computer Science & Engineering">CSE</option>
                    <option value="Information Technology">IT</option>
                    <option value="Electronics & Communication">ECE</option>
                    <option value="Electrical Engineering">EEE</option>
                    <option value="Mechanical Engineering">ME</option>
                    <option value="Civil Engineering">CE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Current CGPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="5.0"
                    max="10.0"
                    value={signUpCgpa}
                    onChange={(e) => setSignUpCgpa(e.target.value)}
                    placeholder="8.50"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            {signUpRole === 'TPO' && (
              <div className="grid grid-cols-2 gap-3 animate-fade-in">
                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={signUpOrganization}
                    onChange={(e) => setSignUpOrganization(e.target.value)}
                    placeholder="e.g. Google / Microsoft"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={signUpDesignation}
                    onChange={(e) => setSignUpDesignation(e.target.value)}
                    placeholder="e.g. Talent Acquisition"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            )}

            {signUpRole === 'Admin' && (
              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  University / College Name *
                </label>
                <input
                  type="text"
                  required
                  value={signUpOrganization}
                  onChange={(e) => setSignUpOrganization(e.target.value)}
                  placeholder="e.g. National Institute of Technology"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            )}

            {/* Passwords */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  Create Password *
                </label>
                <div className="relative">
                  <input
                    type={showSignUpPassword ? 'text' : 'password'}
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Min 6 chars"
                    className="w-full pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                    className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showSignUpPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider text-[10px] mb-1.5">
                  Confirm Password *
                </label>
                <input
                  type={showSignUpPassword ? 'text' : 'password'}
                  required
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  placeholder="Re-enter"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all duration-200 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <UserPlus size={15} />
              Complete Registration & Access Dashboard
            </button>

            <p className="text-center text-xs text-slate-500 pt-1 font-medium">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setError(''); setSuccessNotice(''); }}
                className="text-blue-600 font-bold hover:text-blue-700 transition-colors cursor-pointer"
              >
                Sign In here
              </button>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}
