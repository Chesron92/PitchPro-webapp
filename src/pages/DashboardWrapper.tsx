import React, { lazy, Suspense } from 'react';
import { useAuth } from '../contexts/AuthContext';

const RecruiterDashboard = lazy(() => import('../components/dashboard/RecruiterDashboard'));
const JobSeekerDashboard = lazy(() => import('../components/dashboard/JobSeekerDashboard'));

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
    <div className="ml-4">Dashboard laden...</div>
  </div>
);

const DashboardWrapper: React.FC = () => {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <Loading />; // wacht tot profiel geladen
  }

  const roleValue = (userProfile.role || userProfile.userType || '').toLowerCase();
  const isRecruiter = roleValue.includes('recruiter');

  return (
    <Suspense fallback={<Loading />}>
      {isRecruiter ? (
        <RecruiterDashboard user={userProfile} />
      ) : (
        <JobSeekerDashboard user={userProfile} />
      )}
    </Suspense>
  );
};

export default DashboardWrapper; 