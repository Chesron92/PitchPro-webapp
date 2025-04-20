import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Extra imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// Lazy loaded pagina's
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const Landing = lazy(() => import('./pages/Landing'));
const About = lazy(() => import('./pages/About'));
const Candidates = lazy(() => import('./pages/Candidates'));
const CandidateProfile = lazy(() => import('./pages/CandidateProfile'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const JobApplicationForm = lazy(() => import('./pages/JobApplication'));
const Messages = lazy(() => import('./pages/Messages'));
const Conversation = lazy(() => import('./pages/Conversation'));
const CVPreview = lazy(() => import('./pages/CVPreview'));
const CreateJob = lazy(() => import('./pages/CreateJob'));
const EditJob = lazy(() => import('./pages/EditJob'));
const ScheduleMeeting = lazy(() => import('./pages/ScheduleMeeting'));
const Calendar = lazy(() => import('./pages/Calendar'));
const ApplicationDetail = lazy(() => import('./pages/ApplicationDetail'));

// Dashboard routes (lazy loaded)
const DashboardRoutes = lazy(() => import('./routes/dashboardRoutes'));

// Kleinere componenten die direct geladen kunnen worden
import ProfileRepair from './components/ProfileRepair';
import Layout from './components/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';

// Stijlen
import './styles/globals.css';

// Placeholder componenten voor ontbrekende pagina's (deze zijn klein genoeg om niet lazy te laden)
const Applications = () => <div className="p-4"><h1 className="text-2xl font-bold">Applications</h1><p>Applications page</p></div>;
const SearchJobs = () => <div className="p-4"><h1 className="text-2xl font-bold">Search Jobs</h1><p>Search jobs page</p></div>;
const Settings = () => <div className="p-4"><h1 className="text-2xl font-bold">Settings</h1><p>Settings page</p></div>;

// Loading component voor Suspense fallback
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    <div className="ml-4">Bezig met laden...</div>
  </div>
);

// Vereenvoudigde dashboard componenten voor debugging
const SimpleDashboard: React.FC = () => {
  console.log("Rendering SimpleDashboard");
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Als je dit kunt zien, werkt de rendering correct.</p>
    </div>
  );
};

// Profiel herstel component
const ProfileRecoveryComponent: React.FC = () => {
  const { currentUser, createOrUpdateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'werkzoekende' | 'recruiter'>('werkzoekende');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  
  const createNewProfile = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError(null);
      
      if (!displayName.trim()) {
        setError('Vul een naam in');
        return;
      }
      
      // Gebruik de createOrUpdateProfile functie van AuthContext
      await createOrUpdateProfile(displayName, selectedRole);
      
      setSuccess(true);
      
      // Wacht 2 seconden en ververs dan de pagina
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error('Fout bij aanmaken profiel:', err);
      setError('Er is een fout opgetreden bij het aanmaken van je profiel. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mt-4">
      <h2 className="text-xl font-medium mb-4">Maak je profiel opnieuw aan</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Profiel succesvol aangemaakt! Pagina wordt vernieuwd...
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Je naam</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Vul je naam in"
          disabled={loading || success}
        />
      </div>
      
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-gray-700">Selecteer je gebruikerstype:</p>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="role"
              value="werkzoekende"
              checked={selectedRole === 'werkzoekende'}
              onChange={() => setSelectedRole('werkzoekende')}
              disabled={loading || success}
            />
            <span className="ml-2">Werkzoekende</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name="role"
              value="recruiter"
              checked={selectedRole === 'recruiter'}
              onChange={() => setSelectedRole('recruiter')}
              disabled={loading || success}
            />
            <span className="ml-2">Recruiter</span>
          </label>
        </div>
      </div>
      
      <button
        onClick={createNewProfile}
        disabled={loading || success}
        className="w-full bg-primary-600 text-white py-2 px-4 rounded hover:bg-primary-700 disabled:opacity-50"
      >
        {loading ? 'Bezig...' : success ? 'Profiel aangemaakt' : 'Profiel aanmaken'}
      </button>
    </div>
  );
};

// Debugger component
const AuthDebugger: React.FC = () => {
  const { loading, currentUser, userProfile, authError } = useAuth();
  
  console.log("AuthDebugger rendering", { loading, currentUser, userProfile, authError });
  
  return (
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-75 text-white p-2 text-xs">
      Loading: {loading ? "Ja" : "Nee"}<br />
      User: {currentUser ? "Aanwezig" : "Geen"}<br />
      Profile: {userProfile ? userProfile.role : "Geen"}<br />
      Error: {authError ? authError.message : "Geen"}
    </div>
  );
};

// Test pagina zonder AuthProvider
const TestPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">Test Pagina</h1>
      <p className="mb-4">Deze pagina laadt zonder Firebase of AuthProvider</p>
      <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Naar login pagina
      </a>
    </div>
  );
};

// Redirect component die controleert op auth status en doorverwijst
const Redirect: React.FC = () => {
  const { currentUser, loading } = useAuth();
  
  console.log("Redirect component rendering", { loading, currentUser });
  
  // Als het nog aan het laden is, toon laadscherm
  if (loading) {
    return <Loading />;
  }
  
  // Na laden: redirect naar dashboard als ingelogd, of naar login als niet ingelogd
  return currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

// ProtectedContent component die de Layout wikkelt om beveiligde routes
const ProtectedContent: React.FC = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// AboutWrapper component zonder authenticatie vereisten maar met toegang tot AuthContext
const AboutWrapper: React.FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <About />
    </Suspense>
  );
};

// De AppContent component (intern, heeft toegang tot AuthContext)
const AppContent: React.FC = () => {
  console.log("AppContent component rendering");
  const { userProfile, currentUser } = useAuth();
  
  // Configureer globale error handler om kritieke fouten af te vangen
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Onafgehandelde fout opgevangen:", event.error);
    };
    
    window.addEventListener('error', handleGlobalError);
    
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);
  
  return (
    <Router basename="/">
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Openbare routes */}
          <Route path="/" element={<Landing />} />
          
          {/* Publieke routes met PublicRoute bescherming */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          
          {/* About route */}
          <Route path="/about" element={<About />} />
          
          {/* Vacatures routes */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job/:jobId" element={<JobDetail />} />
          
          {/* Beschermde applicatie routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/job-application/:jobId" element={<JobApplicationForm />} />
          </Route>
          
          {/* Job applicant routes */}
          <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
            <Route path="/applications" element={<Applications />} />
            <Route path="/search-jobs" element={<SearchJobs />} />
          </Route>

          {/* Recruiter specific routes */}
          <Route element={<ProtectedRoute requiredRole="recruiter" />}>
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/candidate/:id" element={<CandidateProfile />} />
            <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
            <Route path="/schedule-meeting/:id" element={<ScheduleMeeting />} />
          </Route>

          {/* Shared routes (accessible to both job seekers and recruiters) */}
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:conversationId" element={<Conversation />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/application/:id" element={<ApplicationDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/agenda" element={<Calendar />} />

          {/* Redirect route (voor directe doorverwijzing naar dashboard/login) */}
          <Route path="/redirect" element={<Redirect />} />
          
          {/* Fallback route voor debugging */}
          <Route path="/simple" element={<SimpleDashboard />} />
          
          {/* Dashboard routes - nu lazy loaded met separate bundle */}
          <Route path="/dashboard/*" element={
            <Suspense fallback={<Loading />}>
              <DashboardRoutes userProfile={userProfile} currentUser={currentUser} />
            </Suspense>
          } />
          
          {/* Redirect onbekende routes naar home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      
      {/* Debug overlay */}
      <AuthDebugger />
    </Router>
  );
};

// De hoofdcomponent die de providers opzet (extern, heeft GEEN toegang tot AuthContext)
const App: React.FC = () => {
  console.log("App component rendering");
  
  return (
    <AuthProvider>
      <MessageProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App; 