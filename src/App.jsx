import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import { SignIn } from "./components/SignIn";
import PrivateRoute from "../PrivateRoute";
import { Login } from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
