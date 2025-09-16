import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import { SignIn } from './components/SignIn';
import PrivateRoute from '../PrivateRoute';
import { Login } from './pages/Login';
import MyPage from './components/MyPage';
import ErrorPage from './pages/ErrorPage';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
      <Route path="/Mypage" element={<MyPage />} />
      <Route path="/*" element={<ErrorPage />} />
      <Route path="/loading" element={<LoadingPage />} />
    </Routes>
  );
}

export default App;
