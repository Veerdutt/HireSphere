import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Simple state for user, view, and login modal
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hiresphere_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [view, setView] = useState('landing'); // 'landing' | 'explore' | 'dashboard'
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInDefaultTab, setSignInDefaultTab] = useState('demo');

  // Keep view in sync when user logs in or out
  useEffect(() => {
    if (user) {
      setView('dashboard');
    } else {
      setView((prev) => (prev === 'dashboard' ? 'landing' : prev));
    }
  }, [user]);

  // Log in user
  const login = (userData) => {
    localStorage.setItem('hiresphere_user', JSON.stringify(userData));
    setUser(userData);
    setView('dashboard');
    setIsSignInOpen(false);
  };

  // Log out user
  const logout = () => {
    localStorage.removeItem('hiresphere_user');
    setUser(null);
    setView('landing');
  };

  // Modal controls
  const openSignIn = (defaultTab = 'demo') => {
    setSignInDefaultTab(defaultTab);
    setIsSignInOpen(true);
  };

  const closeSignIn = () => {
    setIsSignInOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        view,
        setView,
        isSignInOpen,
        signInDefaultTab,
        login,
        logout,
        openSignIn,
        closeSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
