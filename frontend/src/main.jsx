import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";
import Dashboard from "./pages/Dashboard";
import Generate from "./pages/Generate";
import Verify from "./pages/Verify";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";
import CertificateDisplay from "./components/CertificateDisplay/CertificateDisplay.jsx";

import Login from "./pages/Login.jsx";
import Users from "./pages/Users";

import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";

import { AuthProvider } from "./components/Auth/AuthContext.jsx"; // Import AuthProvider

import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Dashboard />} />
      <Route path="generate" element={<Generate />} />
      <Route path="verify" element={<Verify />} />
      <Route path="certificates" element={<Certificates />} />
      <Route
        path="settings"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route path="certificate-display" element={<CertificateDisplay />} />
      <Route path="login" element={<Login />} />
      <Route
        path="users"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Users />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
