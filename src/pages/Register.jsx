import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios"; // ✅ axios instance

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "", // 👈 added city field
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black text-white bg-[length:200%_200%] animate-gradientShift">
      <div className="flex flex-col items-center text-center animate-fadeInUp w-full max-w-md px-6">
        {/* Title */}
        <h1
          className="text-5xl font-bold text-green-400 mb-4 tracking-wide"
          style={{ fontFamily: "Bell MT, serif" }}
        >
          Green Life <span className="text-sm align-super ml-1">™</span>
        </h1>

        {/* Refined tagline */}
        <p className="text-zinc-300 text-lg mb-8">
          Keep track of your homegrown plants and receive personalized care
          recommendations tailored to your location and daily weather insights 🌿
        </p>

        {/* Register form */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 w-full shadow-2xl animate-fadeInUp"
        >
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none mb-4 focus:border-green-400 focus:ring-1 focus:ring-green-400"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

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
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none mb-4 focus:border-green-400 focus:ring-1 focus:ring-green-400"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="City"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none mb-6 focus:border-green-400 focus:ring-1 focus:ring-green-400"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg transition font-semibold hover:scale-105"
          >
            Register
          </button>
        </form>

        {/* Login link */}
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