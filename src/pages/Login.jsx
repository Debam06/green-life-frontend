import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ use axios instance

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false); // ✅ new state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show loading state

    try {
      const res = await api.post("/auth/login", form); // ✅ axios instance
      login(res.data.token);
      toast.success("Login successful 🌿");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false); // reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-8 text-center text-green-400">
          Welcome Back 🌱
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading} // ✅ prevent double submit
            className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg transition font-semibold flex items-center justify-center"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}