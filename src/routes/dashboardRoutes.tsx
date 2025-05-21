import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { UserProfile } from '../types/user';
import { User } from 'firebase/auth';
import Layout from '../components/Layout';

// Dashboard Componenten
const RecruiterDashboard = lazy(() => import('../components/dashboard/RecruiterDashboard'));
const JobSeekerDashboard = lazy(() => import('../components/dashboard/JobSeekerDashboard'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const CVPreview = lazy(() => import('../pages/CVPreview'));
const CreateJob = lazy(() => import('../pages/CreateJob'));
const EditJob = lazy(() => import('../pages/EditJob'));
// ApplicationsList en FavoritesPage ontbreken, dus we maken ze tijdelijk als placeholders
const ApplicationsList = () => <div>Applicaties Lijst (Placeholder)</div>;
const FavoritesPage = () => <div>Favorieten Pagina (Placeholder)</div>;

// Loading-component voor Suspense fallback
const DashboardLoading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    <div className="ml-4">Dashboard laden...</div>
  </div>
);

interface DashboardRoutesProps {
  userProfile: UserProfile | null;
  currentUser: User | null;
}

const DashboardRoutes: React.FC<DashboardRoutesProps> = ({ userProfile, currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("============ DASHBOARD ROUTES RENDER ============");
  console.log("DashboardRoutes rendering met userProfile:", userProfile);
  console.log("DashboardRoutes huidige locatie:", location.pathname);
  console.log("DashboardRoutes state data:", location.state);
  
  // Helper functie om consistente rol te krijgen
  const getActualRole = (profile: any): string => {
    console.log("Gebruikersprofiel voor rolbepaling:", JSON.stringify(profile, null, 2));
    
    // KRITIEKE FIX: Check 'userType' direct op root niveau
    // Dit is nodig omdat de werkzoekende account 'userType' maar geen 'role' heeft
    if (profile?.userType) {
      console.log("userType op root niveau gevonden:", profile.userType);
      // Normaliseer userType formaat
      if (profile.userType === 'werkzoekende' || profile.userType === 'jobseeker' || 
          profile.userType === 'Werkzoekende') {
        return 'werkzoekende';
      }
      if (profile.userType === 'recruiter' || profile.userType === 'Recruiter') {
        return 'recruiter';
      }
    }
    
    // Probeer eerst het 'role' veld
    if (profile?.role) {
      console.log("Role veld gevonden:", profile.role);
      // Normaliseer rol formaat
      if (profile.role === 'werkzoekende' || profile.role === 'jobseeker' || 
          profile.role === 'Werkzoekende') {
        return 'werkzoekende';
      }
      if (profile.role === 'recruiter' || profile.role === 'Recruiter') {
        return 'recruiter';
      }
      return profile.role;
    }
    
    // Gebruik anders het 'userType' veld in profile object
    if (profile?.profile?.userType) {
      console.log("userType veld in profile gevonden:", profile.profile.userType);
      // Normaliseer userType formaat
      if (profile.profile.userType === 'werkzoekende' || profile.profile.userType === 'jobseeker' || 
          profile.profile.userType === 'Werkzoekende') {
        return 'werkzoekende';
      }
      if (profile.profile.userType === 'recruiter' || profile.profile.userType === 'Recruiter') {
        return 'recruiter';
      }
      return profile.profile.userType;
    }
    
    // Kijk of er een rol in de route state is meegegeven
    if (location.state && (location.state as any).userRole) {
      console.log("Rol gevonden in route state:", (location.state as any).userRole);
      const stateRole = (location.state as any).userRole;
      if (stateRole === 'werkzoekende' || stateRole === 'jobseeker' || 
          stateRole === 'Werkzoekende') {
        return 'werkzoekende';
      }
      if (stateRole === 'recruiter' || stateRole === 'Recruiter') {
        return 'recruiter';
      }
      return stateRole;
    }
    
    // NOODOPLOSSING: Kijk expliciet naar velden die typisch voor werkzoekenden zijn
    if (profile && (
      typeof profile.detailedCV !== 'undefined' ||
      Array.isArray(profile.werkervaring) ||
      Array.isArray(profile.vaardigheden) ||
      Array.isArray(profile.opleiding)
    )) {
      console.log("Werkzoekende specifieke velden gevonden");
      return 'werkzoekende';
    }
    
    // NOODOPLOSSING: Kijk expliciet naar velden die typisch voor recruiters zijn
    if (profile && (
      profile.companyName || 
      profile.kvkNumber ||
      profile.chamberOfCommerceNumber ||
      profile.companyDescription ||
      (profile.profile && (
        profile.profile.companyName || 
        profile.profile.company || 
        profile.profile.kvkNumber
      ))
    )) {
      console.log("Recruiter specifieke velden gevonden");
      return 'recruiter';
    }
    
    // Standaard terugvallen op werkzoekende
    console.log("Geen rol gevonden, terugvallen op standaard rol 'werkzoekende'");
    return 'werkzoekende';
  };
  
  // Bepaal de rol van de gebruiker voor consistentie
  const userRole = userProfile ? getActualRole(userProfile) : null;
  console.log("Bepaalde gebruikersrol:", userRole);
  
  // Voeg een fallback component toe
  const FallbackDashboard = () => (
    <div className="p-8">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-sm text-yellow-700">
          <strong>Let op:</strong> Er was een probleem met het detecteren van je rol. Kies hieronder het juiste dashboard.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div onClick={() => navigate('/dashboard/werkzoekende')} className="p-6 border rounded-lg cursor-pointer hover:bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Werkzoekende Dashboard</h3>
          <p className="text-gray-600">Voor kandidaten die op zoek zijn naar vacatures</p>
        </div>
        
        <div onClick={() => navigate('/dashboard/recruiter')} className="p-6 border rounded-lg cursor-pointer hover:bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Recruiter Dashboard</h3>
          <p className="text-gray-600">Voor recruiters die vacatures en kandidaten beheren</p>
        </div>
      </div>
    </div>
  );
  
  useEffect(() => {
    console.log("DashboardRoutes useEffect - gemount met gebruiker:", currentUser?.uid);
    console.log("DashboardRoutes useEffect - locatie:", location.pathname);
    console.log("UserProfile data:", userProfile);
    
    // Log detailgegevens uit userProfile als het beschikbaar is
    if (userProfile) {
      console.log("UserProfile role:", userProfile.role || userProfile.userType);
      console.log("UserProfile email:", userProfile.email);
    }
    
    return () => {
      console.log("DashboardRoutes wordt unmounted");
    };
  }, [currentUser, userProfile, location]);
  
  if (!currentUser) {
    console.log("DashboardRoutes: Geen ingelogde gebruiker, redirect naar login");
    return <Navigate to="/login" replace />;
  }

  // Wacht tot het gebruikersprofiel is geladen
  if (!userProfile) {
    console.log("DashboardRoutes: userProfile nog niet geladen, toon laadscherm");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Profiel laden...</div>
      </div>
    );
  }
  
  // Log de rol van de gebruiker voor het renderen van het juiste dashboard
  if (userRole === "recruiter") {
    console.log("Recruiter dashboard wordt gerenderd");
  } else {
    console.log("Werkzoekende dashboard wordt gerenderd");
  }
  
  console.log("=== DashboardRoutes COMPONENT RENDER ===");
  
  return (
    <>
      <Suspense fallback={<DashboardLoading />}>
        {/* Debug informatie direct weergeven bovenaan het dashboard */}
        <div className="bg-blue-50 p-3 border-b border-blue-200 text-xs">
          <h3 className="font-semibold">Dashboard Diagnostics</h3>
          <p>Gedetecteerde rol: {userRole}</p>
          <p>User ID: {currentUser?.uid}</p>
          <p>Timestamp: {new Date().toLocaleTimeString()}</p>
        </div>
        
      <Routes>
          {/* Algemene dashboard index route (redirect naar appropriate dashboard) */}
          <Route index element={
            userRole === "recruiter" 
              ? <RecruiterDashboard user={userProfile} />
              : <JobSeekerDashboard user={userProfile} />
          } />
          
          {/* Fallback routes voor het geval de rol verkeerd wordt gedetecteerd */}
          <Route path="werkzoekende" element={<JobSeekerDashboard user={userProfile} />} />
          <Route path="recruiter" element={<RecruiterDashboard user={userProfile} />} />
          
          {/* Gedeelde beschermde routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="werkzoekende/profile" element={<ProfilePage />} />
            <Route path="recruiter/profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
          </Route>
          
          {/* Specifieke routes voor werkzoekenden */}
          <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
            <Route path="cv-preview" element={<CVPreview />} />
          </Route>
          
          {/* Specifieke routes voor recruiters */}
            <Route element={<ProtectedRoute requiredRole="recruiter" />}>
            <Route path="create-job" element={<CreateJob />} />
            <Route path="edit-job/:jobId" element={<EditJob />} />
            <Route path="applications/:jobId" element={<ApplicationsList />} />
          </Route>
          
          {/* Fallback route binnen dashboard */}
          <Route path="*" element={<FallbackDashboard />} />
      </Routes>
    </Suspense>
    </>
  );
};

export default DashboardRoutes; 