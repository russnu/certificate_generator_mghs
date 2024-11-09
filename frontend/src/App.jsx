import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SettingsProvider } from "./components/GeneralSettings/SettingsContext.jsx";
import { CertificateProvider } from "./components/CertificateDisplay/CertificateContext.jsx";
import { useAuth } from "./components/Auth/AuthContext.jsx";

import "./index.css";

import Header from "./components/Header/Header.jsx";
import SideMenu from "./components/SideMenu/SideMenu.jsx";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const hideHeaderAndSideMenu =
    location.pathname === "/certificate-display" ||
    location.pathname === "/login";

  useEffect(() => {
    if (user?.user_email) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      if (location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [user, location.pathname, navigate]);

  return (
    <>
      <SettingsProvider>
        <CertificateProvider>
          {isAuthenticated && !hideHeaderAndSideMenu && <Header />}
          {isAuthenticated && !hideHeaderAndSideMenu && <SideMenu />}
          <div
            className={
              hideHeaderAndSideMenu ? "no-menu-container" : "main-content"
            }
          >
            <Outlet />
          </div>
        </CertificateProvider>
      </SettingsProvider>
    </>
  );
}

export default App;
