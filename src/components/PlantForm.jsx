import React, { useEffect, useState } from "react";
import { fetchSpecies } from "../api/species";

const PlantForm = ({ onSubmit, onCancel, initialData }) => {
  const [speciesList, setSpeciesList] = useState([]);
  const [form, setForm] = useState(initialData || { name: "", species: "", plantedAt: "", notes: "" });

  useEffect(() => {
    const loadSpecies = async () => {
      const data = await fetchSpecies();
      if (data.success) setSpeciesList(data.data);
    };
    loadSpecies();
  }, []);

  // 👇 Sync when initialData changes (important for Edit mode)
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
      className="space-y-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Plant Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
        required
      />

      <select
        name="species"
        value={form.species}
        onChange={(e) => setForm({ ...form, species: e.target.value })}
        className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
        required
      >
        <option value="">Select species</option>
        {speciesList.map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="plantedAt"
        value={form.plantedAt}
        onChange={(e) => setForm({ ...form, plantedAt: e.target.value })}
        className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
        required
      />

      <textarea
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="w-full bg-zinc-800 p-3 rounded-lg outline-none"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-green-500 text-black hover:bg-green-600 transition"
        >
          Save Plant
        </button>
      </div>
    </form>
  );
};

export default PlantForm;