import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;