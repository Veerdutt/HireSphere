import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Explore from './pages/Explore.jsx';
import Footer from './components/Footer.jsx';
import SignInModal from './components/SignInModal.jsx';
import DashboardView from './components/DashboardView.jsx';

function AppContent() {
  const { view } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      {view === 'dashboard' ? (
        <DashboardView />
      ) : (
        <>
          <div>
            <Navbar />
            {view === 'explore' ? <Explore /> : <Home />}
          </div>
          <Footer />
        </>
      )}
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
