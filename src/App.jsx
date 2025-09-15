import './App.css'
import { Routes, Route} from 'react-router-dom';
import MainPage from './MainPage';
import { SignIn } from './components/SignIn';
import PrivateRoute from '../PrivateRoute';


function App() {

  return (
    <Routes>
      <Route path="/login" element={<SignIn/>} />
      <Route path="/main" element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>} />
    </Routes>
  )
}

export default App;
