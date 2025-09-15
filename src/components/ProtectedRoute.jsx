import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Aquí decides si el usuario está autenticado o no
  const token = localStorage.getItem("token");

  // Si no hay token, redirige a login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si sí hay token, renderiza la ruta hija
  return children;
}
