import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-hot-toast";
import api from "../api/axios"; // ✅ centralized axios instance
import CareTasksWidget from "../components/CareTasksWidget";
import PlantForm from "../components/PlantForm";
import ProfileCard from "../components/ProfileCard";

export default function Dashboard() {
  const { token, logout } = useAuth();

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showCare, setShowCare] = useState(false);

  const [form, setForm] = useState({
    name: "",
    species: "",
    plantedAt: "",
    notes: "",
  });

  // 🌤 Weather state
  const [showWeather, setShowWeather] = useState(false);
  const [weather, setWeather] = useState(null);

  // 👤 Profile state
  const [profile, setProfile] = useState(null);

  // Sidebar toggle for mobile
  const [isOpen, setIsOpen] = useState(false);

  // Fetch plants + profile
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plantsRes, profileRes] = await Promise.all([
          api.get("/plants"),
          api.get("/auth/me"),
        ]);

        const normalizedPlants = plantsRes.data.data.map((p) => ({
          id: p.id,
          name: p.name,
          species: p.species,
          plantedAt: p.plantedAt || "",
          notes: p.notes || "",
        }));

        setPlants(normalizedPlants);
        setProfile(profileRes.data.data);
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchData();
  }, [token]);

  // Fetch weather
  const fetchWeather = async () => {
    try {
      const res = await api.get("/weather");
      setWeather(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch weather");
    }
  };

  // Open Edit
  const openEdit = (plant) => {
    setEditingId(plant.id);
    setShowAdd(true);
    setForm({
      name: plant.name,
      species: plant.species,
      plantedAt: plant.plantedAt
        ? new Date(plant.plantedAt).toISOString().split("T")[0]
        : "",
      notes: plant.notes,
    });
  };

  // Add or Edit plant
  const handleSubmit = async (formData) => {
    try {
      if (editingId) {
        const res = await api.put(`/plants/${editingId}`, formData);
        const updatedPlant = {
          id: res.data.data.id,
          name: res.data.data.name,
          species: res.data.data.species,
          plantedAt: res.data.data.plantedAt || "",
          notes: res.data.data.notes || "",
        };
        setPlants((prev) =>
          prev.map((p) => (p.id === editingId ? updatedPlant : p))
        );
        toast.success("Plant updated successfully");
        setEditingId(null);
      } else {
        const res = await api.post("/plants", formData);
        const newPlant = {
          id: res.data.data.id,
          name: res.data.data.name,
          species: res.data.data.species,
          plantedAt: res.data.data.plantedAt || "",
          notes: res.data.data.notes || "",
        };
        setPlants((prev) => [...prev, newPlant]);
        toast.success("Plant added successfully");
      }

      setShowAdd(false);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        toast.error(err.response.data.errors[0].msg);
      } else {
        toast.error(err.response?.data?.message || "Failed to save plant");
      }
    }
  };

  // Delete plant
  const deletePlant = async (id) => {
    try {
      await api.delete(`/plants/${id}`);
      setPlants((prev) => prev.filter((p) => p.id !== id));
      toast.success("Plant deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete plant");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex">
      {/* Mobile toggle button */}
      <button
        className="md:hidden p-4 text-green-400 fixed top-2 left-2 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:flex w-64 bg-zinc-950 border-r border-zinc-800 p-6 flex-col justify-between transition-transform duration-300 z-40`}
      >
        <div>
          <h1
            className="text-3xl font-bold text-green-400 mb-10 tracking-wide"
            style={{ fontFamily: "Bell MT, serif" }}
          >
            Green Life
            <span className="text-sm align-super ml-1">™</span>
          </h1>
          <nav className="space-y-4">
            <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-500/10 hover:text-green-400 transition">
              Dashboard
            </button>

            <button
              onClick={() => setShowCare(true)}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-green-500/10 hover:text-green-400 transition"
            >
              Daily Care
            </button>
            <button
              onClick={() => {
                setShowWeather(true);
                fetchWeather();
              }}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-500/10 hover:text-blue-400 transition"
            >
              Weather
            </button>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-400 transition"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* 👤 ProfileCard at bottom */}
        {profile && (
          <ProfileCard
            profile={profile}
            onUpdate={(updated) => setProfile(updated)}
          />
        )}
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 relative overflow-x-auto">
        <h2 className="text-3xl font-semibold mb-8">My Plants 🌿</h2>

        {/* Floating + Button */}
        <button
          onClick={() => {
            setEditingId(null);
            setForm({ name: "", species: "", plantedAt: "", notes: "" });
            setShowAdd(true);
          }}
          className="fixed bottom-10 right-10 w-14 h-14 rounded-full bg-green-500 text-black text-3xl flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-green-500/40 transition-all"
        >
          +
        </button>

        {/* Add / Edit Card */}
        {showAdd && (
          <div className="absolute top-20 right-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-96 shadow-2xl z-50">
            <h3 className="text-xl font-semibold mb-4 text-green-400">
              {editingId ? "Edit Plant 🌿" : "Add New Plant 🌱"}
            </h3>

            <PlantForm
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowAdd(false);
                setEditingId(null);
              }}
              initialData={
                editingId
                  ? {
                      ...plants.find((p) => p.id === editingId),
                      plantedAt: plants.find((p) => p.id === editingId)?.plantedAt
                        ? new Date(plants.find((p) => p.id === editingId).plantedAt)
                            .toISOString()
                            .split("T")[0]
                        : "",
                    }
                  : { name: "", species: "", plantedAt: "", notes: "" }
              }
            />
          </div>
        )}

                {/* 🌱 Daily Care Widget */}
        {showCare && (
          <div className="absolute top-20 right-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-[28rem] shadow-2xl z-50">
            <h3 className="text-xl font-semibold mb-4 text-green-400">🌱 Daily Care</h3>
            <CareTasksWidget />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowCare(false)}
                className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* 🌤 Weather Widget */}
        {showWeather && weather && (
          <div className="absolute top-20 right-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-80 shadow-2xl z-50">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">🌤 Weather</h3>
            <div className="flex items-center gap-4">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="Weather icon"
              />
              <div>
                <p className="text-lg font-semibold">{weather.city}</p>
                <p className="text-green-400">
                  {weather.temp}°C — {weather.description}
                </p>
                <p className="text-zinc-400 text-sm">
                  Humidity: {weather.humidity}%
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowWeather(false)}
                className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Plants Grid */}
        {loading ? (
          <p className="text-zinc-400">Loading plants...</p>
        ) : plants.length === 0 ? (
          <p className="text-zinc-400">No plants yet 🌱</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <div
                key={plant.id}
                className="group relative bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-lg hover:scale-105 hover:shadow-green-500/20 transition"
              >
                <h3 className="text-xl font-bold text-green-400">{plant.name}</h3>
                <p className="text-zinc-400">{plant.species}</p>
                {plant.plantedAt && (
                  <p className="text-zinc-500 text-sm mt-1">
                    🌱{" "}
                    {new Date(plant.plantedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
                {plant.notes && (
                  <p className="text-zinc-500 text-sm mt-2">{plant.notes}</p>
                )}

                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(plant)}
                    className="bg-blue-500/10 text-blue-400 text-xs px-3 py-1 rounded-full hover:scale-110 transition"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => deletePlant(plant.id)}
                    className="bg-red-500/10 text-red-400 text-xs px-3 py-1 rounded-full hover:scale-110 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}