import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
export default function RoleRoute({
  role,
  children
}) {
  const {
    user,
    loading
  } = useAuthStore();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;
  return <>{children}</>;
}
