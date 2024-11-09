import { createContext, useContext, useState } from "react";
import baseUrl from "../../config";

const AuthContext = createContext();

// const baseUrl = "http://localhost/dashboard/certificate_generator/";

export const AuthProvider = ({ children }) => {
  //========================================================================================//

  const [authError, setAuthError] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user")) || {};
    return {
      user_email: storedUser.user_email || null,
      user_fullname: storedUser.user_fullname || null,
      role: storedUser.role || null,
    };
  });

  //========================================================================================//
  const login = async (userEmail, userPassword) => {
    const formData = new FormData();
    formData.append("user_email", userEmail);
    formData.append("user_password", userPassword);

    try {
      const loginResponse = await fetch(baseUrl + "auth/login.php", {
        method: "POST",
        body: formData,
      });

      const data = await loginResponse.json();

      if (data.success) {
        const userData = {
          user_email: data.data.user_email,
          user_fullname: data.data.user_fullname,
          role: data.data.user_role,
        };

        setAuthError(null);

        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        return { success: true, message: "Login successful" };
      } else {
        setAuthError(data.message);
        return { success: false, message: data.message };
      }
    } catch (error) {
      setAuthError("Login failed");

      return { success: false, message: "Login failed: " + error.message };
    }
  };

  //========================================================================================//
  const logout = () => {
    sessionStorage.clear();
    setUser({
      user_email: null,
      user_fullname: null,
      role: null,
    });
  };

  console.log(user);
  //========================================================================================//

  return (
    <AuthContext.Provider value={{ login, logout, authError, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
