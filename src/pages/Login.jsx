import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ axios instance

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      login(res.data.token);
      toast.success("Login successful 🌿");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white bg-[length:200%_200%] animate-gradientShift">
      <div className="flex flex-col items-center text-center animate-fadeInUp w-full max-w-md px-6">
        {/* Title */}
        <h1
          className="text-5xl font-bold text-green-400 mb-4 tracking-wide"
          style={{ fontFamily: "Bell MT, serif" }}
        >
          Green Life<span className="text-sm align-super ml-1">™</span>
        </h1>

        {/* One-liner description */}
        <p className="text-zinc-300 text-lg mb-8">
          Your personal plant care companion
        </p>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 w-full shadow-2xl animate-fadeInUp"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Login
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none mb-4 focus:border-green-400 focus:ring-1 focus:ring-green-400"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none mb-6 focus:border-green-400 focus:ring-1 focus:ring-green-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg transition font-semibold flex items-center justify-center hover:scale-105"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
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