import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ProfileCard({ profile, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name || !form.city) {
      toast.error("Name and city are required");
      return;
    }

    setSaving(true);
    try {
      const res = await api.put("/auth/me", form);
      onUpdate(res.data.data);
      toast.success("Profile updated 🌱");
      setEditing(false);
    } catch (err) {
      console.error("Profile update failed:", err.response?.data);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-10 p-8 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-zinc-800 rounded-2xl text-white shadow-xl group hover:shadow-green-500/20 transition transform hover:scale-[1.02] relative">
      {editing ? (
        <div className="space-y-6 text-center">
          <input
            type="text"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition text-center"
          />
          <input
            type="text"
            value={form.city || ""}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            placeholder="City"
            className="w-full bg-zinc-800 p-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition text-center"
          />

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setEditing(false)}
              className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                saving
                  ? "bg-green-300 text-black cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-black"
              }`}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <p className="font-semibold text-2xl group-hover:text-green-400 transition">
              {profile?.name || "Unnamed"}
            </p>
            {/* Glowing underline */}
            <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-0.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"></span>
          </div>
          <p className="text-sm text-zinc-400">{profile?.city || "Unknown city"}</p>

          {/* Edit button pinned to top-right */}
          <button
            onClick={() => setEditing(true)}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition"
          >
            ✏ Edit
          </button>
        </div>
      )}
    </div>
  );
}