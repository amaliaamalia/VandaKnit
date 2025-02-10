import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getRoleFromToken } from '../utils/tokenUtils';

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { token } = useAuth();
  const userRole = getRoleFromToken(token);

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;