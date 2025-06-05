
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png"; // Logo importado

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [editData, setEditData] = useState({ name: "", frequency: "" });
  const [filter, setFilter] = useState("todos");
  const [sortOrder, setSortOrder] = useState("az");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const q = collection(db, "habits");
        const snapshot = await getDocs(q);
        const userHabits = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              ...data,
              completed: data.completed || false,
              id: doc.id,
            };
          })
          .filter((habit) => habit.userId === auth.currentUser.uid);
        setHabits(userHabits);
      } catch (error) {
        console.error("Error al obtener hábitos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHabits();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "habits", id));
      setHabits(habits.filter((habit) => habit.id !== id));
    } catch (error) {
      console.error("Error al eliminar el hábito:", error);
    }
  };

  const handleEdit = (habit) => {
    setEditingHabitId(habit.id);
    setEditData({ name: habit.name, frequency: habit.frequency });
  };

  const handleEditSubmit = async () => {
    try {
      const habitRef = doc(db, "habits", editingHabitId);
      await updateDoc(habitRef, {
        name: editData.name,
        frequency: editData.frequency,
      });
      setHabits(
        habits.map((h) =>
          h.id === editingHabitId ? { ...h, ...editData } : h
        )
      );
      setEditingHabitId(null);
    } catch (error) {
      console.error("Error al editar el hábito:", error);
    }
  };

  const toggleCompleted = async (habit) => {
    try {
      const habitRef = doc(db, "habits", habit.id);
      await updateDoc(habitRef, { completed: !habit.completed });

      setHabits(
        habits.map((h) =>
          h.id === habit.id ? { ...h, completed: !h.completed } : h
        )
      );
    } catch (error) {
      console.error("Error al marcar completado:", error);
    }
  };

  const getVisibleHabits = () => {
    let filtered = [...habits];

    if (filter === "diario") {
      filtered = filtered.filter((h) => h.frequency === "diario");
    } else if (filter === "semanal") {
      filtered = filtered.filter((h) => h.frequency === "semanal");
    }

    if (sortOrder === "az") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "za") {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOrder === "frecuencia") {
      const order = { diario: 1, semanal: 2 };
      filtered.sort((a, b) => order[a.frequency] - order[b.frequency]);
    }

    return filtered;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      {/* Logo de HabiTrack */}
      <img src={logo} alt="Logo de HabiTrack" className="w-64 mx-auto mt-12 mb-12" />
      <div className="p-4 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Tus hábitos</h1>

        <div className="flex flex-wrap gap-3 mb-6">
          <select
            className="border p-1 rounded text-black dark:text-white dark:bg-gray-800"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="diario">Solo diarios</option>
            <option value="semanal">Solo semanales</option>
          </select>

          <select
            className="border p-1 rounded text-black dark:text-white dark:bg-gray-800"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="az">Orden A-Z</option>
            <option value="za">Orden Z-A</option>
            <option value="frecuencia">Por frecuencia</option>
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300 animate-pulse">
            Cargando hábitos...
          </p>
        ) : (
          getVisibleHabits().map((habit) =>
            editingHabitId === habit.id ? (
              <div key={habit.id} className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded shadow">
                <input
                  className="border mr-2 p-1 rounded text-black"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
                <select
                  className="border mr-2 p-1 rounded"
                  value={editData.frequency}
                  onChange={(e) =>
                    setEditData({ ...editData, frequency: e.target.value })
                  }
                >
                  <option value="diario">Diario</option>
                  <option value="semanal">Semanal</option>
                </select>
                <button
                  onClick={handleEditSubmit}
                  className="bg-green-600 text-white px-3 py-1 rounded-xl shadow hover:bg-green-700 transition"
                >
                  Guardar
                </button>
              </div>
            ) : (
              <div
                key={habit.id}
                className="flex items-center justify-between mb-2 border-b pb-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => toggleCompleted(habit)}
                    className="w-5 h-5 accent-green-600"
                  />
                  <span
                    className={
                      habit.completed ? "line-through text-gray-500" : ""
                    }
                  >
                    <strong>{habit.name}</strong> – {habit.frequency}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(habit)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-xl shadow hover:bg-blue-700 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(habit.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-xl shadow hover:bg-red-700 transition"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
