import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { Login } from './pages/Login';
import { PwConfirm } from './pages/PwConfirm';
import { SignUp } from './pages/SignUp';
import PrivateRoute from './layout/PrivateRoute';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';
// import Admin from './components/Admin';
import { useUser } from './store/useUser';
import { useEffect } from 'react';

function App() {
  const { getUser } = useUser();

  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pwconfirm" element={<PwConfirm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />

      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
