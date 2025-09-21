// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ isAuthenticated: false, loading: true });

  useEffect(() => {
    // Check if user is logged in (call backend)
    const checkAuth = async () => {
      try {
        const res = await fetch("/admin/checkAuth", {
          credentials: "include", // ✅ include cookies
        });
        const data = await res.json();

        if (res.ok && data.authenticated) {
          setAuth({ isAuthenticated: true, loading: false });
        } else {
          setAuth({ isAuthenticated: false, loading: false });
        }
      } catch {
        setAuth({ isAuthenticated: false, loading: false });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
