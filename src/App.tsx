import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MessageProvider } from './contexts/MessageContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

// Lazy loaded pagina's
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Landing = lazy(() => import('./pages/Landing'));
const About = lazy(() => import('./pages/About'));
const Candidates = lazy(() => import('./pages/Candidates'));
const CandidateProfile = lazy(() => import('./pages/CandidateProfile'));
const Jobs = lazy(() => import('./pages/Jobs'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const JobApplicationForm = lazy(() => import('./pages/JobApplication'));
const Messages = lazy(() => import('./pages/Messages'));
const Conversation = lazy(() => import('./pages/Conversation'));
const ScheduleMeeting = lazy(() => import('./pages/ScheduleMeeting'));
const Calendar = lazy(() => import('./pages/Calendar'));
const ApplicationDetail = lazy(() => import('./pages/ApplicationDetail'));

// Dashboard routes (lazy loaded)
const DashboardRoutes = lazy(() => import('./routes/dashboardRoutes'));

// Kleinere componenten die direct geladen kunnen worden
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
          
          {/* Vacatures routes - alleen toegankelijk voor werkzoekenden */}
          <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/job/:jobId" element={<JobDetail />} />
          </Route>
          
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