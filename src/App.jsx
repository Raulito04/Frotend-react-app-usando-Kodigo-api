import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Navbar from "./components/Navbar";


import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";


function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Ruta protegida */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback a Home si no existe la ruta */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  // Si tienes AuthProvider:
  // return (
  //   <AuthProvider>
  //     <BrowserRouter>
  //       <AppRoutes />
  //     </BrowserRouter>
  //   </AuthProvider>
  // );

  
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
