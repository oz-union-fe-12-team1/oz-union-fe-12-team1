import { Navigate } from 'react-router-dom';
import { useUser } from '../store/useUser';
import LoadingView from '../components/LoadingView';

export default function PrivateRoute({ children }) {
  // const token = localStorage.getItem('accessToken');
  // const token = 1;
  // return token ? children : <Navigate to="/login" />;

  const { user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingView />;
  }

  return user ? children : <Navigate to="/" replace />;
}
