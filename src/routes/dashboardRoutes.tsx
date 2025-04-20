import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import Layout from '../components/Layout';

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    <div className="ml-4">Dashboard laden...</div>
  </div>
);

// Lazy loaded dashboard components
const JobSeekerDashboard = lazy(() => import('../components/dashboard/JobSeekerDashboard'));
const RecruiterDashboard = lazy(() => import('../components/dashboard/RecruiterDashboard'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const CVPreview = lazy(() => import('../pages/CVPreview'));
const CreateJob = lazy(() => import('../pages/CreateJob'));
const EditJob = lazy(() => import('../pages/EditJob'));

// Dashboard component
const Dashboard = ({ userProfile, currentUser }: any) => {
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
        {/* Here you would render ProfileRecoveryComponent, but we're keeping it in App.tsx for simplicity */}
        <Navigate to="/profile" replace />
      </div>
    );
  }
  
  // Als er een profiel is, verwijs door naar de juiste pagina
  if (userProfile?.role === 'werkzoekende') {
    console.log('Werkzoekende dashboard wordt geladen');
    return (
      <Suspense fallback={<Loading />}>
        <JobSeekerDashboard user={userProfile} />
      </Suspense>
    );
  } else if (userProfile?.role === 'recruiter') {
    console.log('Recruiter dashboard wordt geladen', userProfile);
    return (
      <Suspense fallback={<Loading />}>
        <RecruiterDashboard user={userProfile} />
      </Suspense>
    );
  }
  
  // Als er geen profiel is, toon een laadscherm (fallback)
  console.log('Geen profiel gevonden, laadscherm wordt getoond');
  return <Loading />;
};

// Protected Content wrapper
const ProtectedContent = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

// Dashboard Routes
const DashboardRoutes = ({ userProfile, currentUser }: any) => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<ProtectedContent />}>
            <Route path="/" element={
              <Dashboard userProfile={userProfile} currentUser={currentUser} />
            } />
            
            {/* Profiel routes */}
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
      </Routes>
    </Suspense>
  );
};

export default DashboardRoutes; 