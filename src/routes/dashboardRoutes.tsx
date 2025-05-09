import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
  console.log("DashboardRoutes rendering with userProfile:", userProfile?.role);
  
  if (!userProfile || !currentUser) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <Suspense fallback={<DashboardLoading />}>
        <Routes>
          {/* Algemene dashboard index route (redirect naar home) */}
          <Route index element={userProfile.role === "recruiter" ? 
            <RecruiterDashboard user={userProfile} /> : 
            <JobSeekerDashboard user={userProfile} />} />
          
          {/* Gedeelde beschermde routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="profile" element={<ProfilePage />} />
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
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default DashboardRoutes; 