import React, { useEffect, useState } from "react";
import { fetchCareTasks } from "../api/careTasks";

const CareTasksWidget = () => {
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchCareTasks();
        console.log("CareTasks API response:", data); // ✅ Debug log

        if (data.success) {
          setTasks(data.data.tasks || []);
          setWeather(data.data.weather);
          setCity(data.data.city);
        } else {
          setError(data.message || "Failed to load care tasks");
        }
      } catch (err) {
        console.error("Failed to fetch care tasks:", err);
        setError("Unable to fetch care tasks. Please try again later.");
      }
    };
    loadTasks();
  }, []);

  return (
    <div className="bg-gray-50 rounded-xl p-6 shadow-md font-sans">
      <h2
        className="text-green-700 text-xl mb-4"
        style={{ fontFamily: "Times New Roman, serif" }}
      >
        Daily Care Tasks
      </h2>

      {weather && (
        <p
          className="text-sm text-gray-600 mb-4"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          Weather in {city}: {weather.temp}°C, Rain {weather.rain}mm
        </p>
      )}

      {error && (
        <p
          className="text-red-600 text-sm mb-4"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          {error}
        </p>
      )}

      {tasks.length > 0 ? (
        tasks.map((plant, idx) => (
          <div
            key={idx}
            className="mb-6 p-4 bg-white rounded-lg border-l-4 border-green-700 hover:-translate-y-1 transition-transform"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            <h3 className="text-green-900 text-lg mb-2">
              {plant.plant} ({plant.species})
            </h3>
            <ul className="list-none pl-0">
              {plant.tasks.map((task, i) => (
                <li
                  key={i}
                  className="text-gray-800 text-sm mb-2 leading-relaxed"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        !error && (
          <p
            className="text-gray-600 text-sm"
            style={{ fontFamily: "Times New Roman, serif" }}
          >
            No tasks available for today. Add plants or check back later.
          </p>
        )
      )}
    </div>
  );
};

export default CareTasksWidget;