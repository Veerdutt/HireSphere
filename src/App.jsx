import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Explore from './components/Explore.jsx';
import Footer from './components/Footer.jsx';
import SignInModal from './components/SignInModal.jsx';

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

function AppContent() {
  const { view } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <div>
        <Navbar />
        {view === 'explore' ? <Explore /> : <Home />}
      </div>
      <Footer />
      <SignInModal />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
