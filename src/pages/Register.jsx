import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ use axios instance

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "",   // 👈 added city field
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form); // ✅ axios instance
      toast.success("Registration successful 🌱");
      navigate("/login"); // ✅ redirect to login
    } catch (err) {
      console.error("Register failed:", err.response?.data);
      toast.error(
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center text-white">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-8 text-center text-green-400">
          Create Account 🌿
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

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

          {/* 👇 New City field */}
          <input
            type="text"
            placeholder="City"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg transition font-semibold"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}