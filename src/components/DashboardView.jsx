import { useAuth } from '../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import RecruiterDashboard from './RecruiterDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardView() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <>
      {user.role === 'Student' && <StudentDashboard />}
      {user.role === 'TPO' && <RecruiterDashboard />}
      {user.role === 'Admin' && <AdminDashboard />}
    </>
  );
}
