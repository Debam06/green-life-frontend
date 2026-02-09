import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ Catch-all 404 route */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-black text-red-400 text-2xl">
            Page not found 🚫
          </div>
        }
      />
    </Routes>
  );
}

export default App;