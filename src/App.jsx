import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { SignIn } from './components/SignIn';
import { Login } from './pages/Login';
import { PwConfirm } from './pages/PwConfirm';
import { SignUp } from './pages/SignUp';
import MyPage from './components/Mypage/Mypage';
import PrivateRoute from './layout/PrivateRoute';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';
import Admin from './components/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pwconfirm" element={<PwConfirm />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />

      <Route path="/admin" element={<Admin />} />
      <Route path="/loading" element={<LoadingPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
