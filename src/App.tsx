import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Extra imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';

// Pagina's
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ProfileRepair from './components/ProfileRepair';
import ProfilePage from './pages/ProfilePage';
import Landing from './pages/Landing';
import About from './pages/About';
import Candidates from './pages/Candidates';
import CandidateProfile from './pages/CandidateProfile';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import JobApplicationForm from './pages/JobApplication';
import Messages from './pages/Messages';
import CVPreview from './pages/CVPreview';
import CreateJob from './pages/CreateJob';
import EditJob from './pages/EditJob';
import ScheduleMeeting from './pages/ScheduleMeeting';
import Calendar from './pages/Calendar';
import ApplicationDetail from './pages/ApplicationDetail';

// Dashboard componenten
import JobSeekerDashboard from './components/dashboard/JobSeekerDashboard';
import RecruiterDashboard from './components/dashboard/RecruiterDashboard';

// Routes en Layout
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
import Layout from './components/Layout';

// Stijlen
import './styles/globals.css';

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

// Algemeen dashboard dat doorverwijst naar de juiste rol-specifieke dashboard
const Dashboard: React.FC = () => {
  const { userProfile, currentUser } = useAuth();
  
  console.log('Dashboard component rendering met:', { 
    currentUser: currentUser?.uid, 
    userProfile: userProfile?.role,
    displayName: userProfile?.displayName
  });
  
  // Controleer eerst of we een ingelogde gebruiker hebben maar geen profiel
  if (currentUser && !userProfile) {
    console.log('Gebruiker ingelogd maar geen profiel gevonden');
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Probleem met gebruikersprofiel</h1>
        <p className="mb-4">Je bent wel ingelogd, maar je gebruikersprofiel kon niet worden geladen.</p>
        <ProfileRecoveryComponent />
      </div>
    );
  }
  
  // Als er een profiel is, verwijs door naar de juiste pagina
  if (userProfile?.role === 'werkzoekende') {
    console.log('Werkzoekende dashboard wordt geladen');
    return <JobSeekerDashboard user={userProfile} />;
  } else if (userProfile?.role === 'recruiter') {
    console.log('Recruiter dashboard wordt geladen', userProfile);
    return <RecruiterDashboard user={userProfile} />;
  }
  
  // Als er geen profiel is, toon een laadscherm (fallback)
  console.log('Geen profiel gevonden, laadscherm wordt getoond');
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Bezig met laden...</div>
      </div>
    );
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

const App: React.FC = () => {
  console.log("App component rendering");
  
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
    <AuthProvider>
      <MessageProvider>
        <FavoritesProvider>
          <Router basename="/">
            <Routes>
              {/* Openbare routes */}
              <Route path="/" element={<Landing />} />
              
              {/* Publieke routes met PublicRoute bescherming */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Route>
              
              <Route path="/about" element={<About />} />
              
              {/* Vacatures routes */}
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/job/:jobId" element={<JobDetail />} />
              
              {/* Beschermde applicatie routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/job-application/:jobId" element={<JobApplicationForm />} />
              </Route>
              
              {/* Job applicant routes */}
              <Route element={<ProtectedRoute requiredRole="job-seeker" />}>
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
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/application/:id" element={<ApplicationDetail />} />

              {/* Redirect route (voor directe doorverwijzing naar dashboard/login) */}
              <Route path="/redirect" element={<Redirect />} />
              
              {/* Fallback route voor debugging */}
              <Route path="/simple" element={<SimpleDashboard />} />
              
              {/* Beveiligde routes met Layout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<ProtectedContent />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  
                  {/* Profiel routes met onze nieuwe ProfilePage component */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/:type" element={<ProfilePage />} />
                  <Route path="/profile/jobseeker" element={<ProfilePage />} />
                  <Route path="/profile/recruiter" element={<ProfilePage />} />
                  
                  {/* CV Preview pagina */}
                  <Route path="/cv-preview" element={<CVPreview />} />
                  
                  {/* Vacature maken/bewerken pagina - alleen voor recruiters */}
                  <Route element={<ProtectedRoute requiredRole="recruiter" />}>
                    <Route path="/create-job" element={<CreateJob />} />
                    <Route path="/edit-job/:jobId" element={<EditJob />} />
                  </Route>
                </Route>
              </Route>
              
              {/* Redirect onbekende routes naar home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            
            {/* Debug overlay */}
            <AuthDebugger />
          </Router>
        </FavoritesProvider>
      </MessageProvider>
    </AuthProvider>
  );
};

export default App; 