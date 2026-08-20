import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  // Simple state for user and login modal
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('hiresphere_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInDefaultTab, setSignInDefaultTab] = useState('demo');

  // Compatibility helper for setView
  const setView = (target) => {
    if (target === 'landing' || target === 'home') {
      navigate('/');
    } else if (target === 'explore') {
      navigate('/explore');
    } else if (target === 'dashboard') {
      navigate('/dashboard');
    } else {
      navigate(target);
    }
  };

  // Log in user and navigate to dashboard
  const login = (userData) => {
    localStorage.setItem('hiresphere_user', JSON.stringify(userData));
    setUser(userData);
    setIsSignInOpen(false);
    navigate('/dashboard');
  };

  // Log out user and navigate to home
  const logout = () => {
    localStorage.removeItem('hiresphere_user');
    setUser(null);
    navigate('/');
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
