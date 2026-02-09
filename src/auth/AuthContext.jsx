import { createContext, useContext, useState } from "react";
import api from "../api/axios"; // ✅ axios instance

// Explicitly export AuthContext so it's available if needed
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = async () => {
    try {
      await api.post("/logout"); // ✅ notify backend to blacklist token
    } catch (err) {
      console.error("Logout API failed:", err.response?.data?.message || err.message);
    }
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ useAuth hook now works reliably
export const useAuth = () => useContext(AuthContext);