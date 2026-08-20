import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Explore from './components/Explore.jsx';
import Footer from './components/Footer.jsx';
import SignInModal from './components/SignInModal.jsx';
import DashboardView from './components/DashboardView.jsx';

// Homepage Sections
import Hero from './components/homepage/Hero';
import StatsBanner from './components/homepage/StatsBanner';
import Features from './components/homepage/Features';
import ActiveDrives from './components/homepage/ActiveDrives';
import RecruiterWorkflow from './components/homepage/RecruiterWorkflow';
import About from './components/homepage/About';
import Faq from './components/homepage/Faq';
import RecruiterBanner from './components/homepage/RecruiterBanner';
import Testimonials from './components/homepage/Testimonials';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <StatsBanner />
      <Features />
      <ActiveDrives />
      <RecruiterWorkflow />
      <About />
      <Testimonials />
      <Faq />
      <RecruiterBanner />
    </>
  );
}

// Protected Dashboard route
function ProtectedDashboard() {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <DashboardView />;
}

// Public Layout for Main pages (Navbar + Content + Footer)
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/explore"
          element={
            <PublicLayout>
              <Explore />
            </PublicLayout>
          }
        />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <SignInModal />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
