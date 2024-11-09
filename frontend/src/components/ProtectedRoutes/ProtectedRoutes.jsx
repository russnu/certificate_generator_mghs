import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user.role || !allowedRoles.includes(user.role)) {

    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoutes;