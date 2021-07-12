import { Navigate } from 'react-router-dom';
import { getIsLoggedIn } from './httpUtils';

export const useAuth = (component) => {
  const isLoggedIn = getIsLoggedIn();
  if (isLoggedIn === 'true') {
    return component;
  }
  return <Navigate to="/login" />;
};
