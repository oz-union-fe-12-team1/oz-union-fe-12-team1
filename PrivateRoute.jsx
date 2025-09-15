import { Navigate } from "react-router-dom";

export default function PrivateRoute ({ children }) {
  // const token = localStorage.getItem("accessToken");
  const token = 1;
  return token ? children : <Navigate to="/login" />;
}