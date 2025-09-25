import { Navigate, Outlet } from 'react-router-dom';
// import { useUser } from '../store/useUser';
// import NyangLoading from '../components/NyangLoading';

export default function PrivateRoute({ children }) {
  // const token = localStorage.getItem('accessToken');
  const token = 1;
  return token ? children : <Navigate to="/login" />;

  // const { user, isLoding } = useUser();

  // if (isLoding) {
  //   return <NyangLoading />;
  // }

  // return user ? children : <Navigate to="/login" />;
}
