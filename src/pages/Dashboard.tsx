import React, { useState } from 'react';

interface Habit {
  id: number;
  name: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Beber 2 litros de agua', completed: false },
    { id: 2, name: 'Caminar 30 minutos', completed: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const handleAddHabit = () => {
    if (newHabitName.trim() === '') return;

    const newHabit: Habit = {
      id: habits.length + 1,
      name: newHabitName,
      completed: false,
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setShowForm(false);
  };

  const toggleHabitCompleted = (id: number) => {
    const updatedHabits = habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  const handleDeleteHabit = (id: number) => {
    const filteredHabits = habits.filter(habit => habit.id !== id);
    setHabits(filteredHabits);
  };

  const completedCount = habits.filter(habit => habit.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">¡Bienvenido, David!</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Tus hábitos de hoy</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Añadir hábito
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-4 mb-6 rounded-lg shadow">
          <input
            type="text"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            placeholder="Nombre del hábito"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddHabit}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Guardar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Contador de hábitos completados */}
      <p className="text-sm text-gray-600 mb-4">
        {completedCount}/{habits.length} hábitos completados hoy
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className={`bg-white p-4 rounded-lg shadow hover:shadow-md transition ${
              habit.completed ? 'opacity-50' : ''
            }`}
          >
            <h3
              className={`font-semibold text-lg mb-2 ${
                habit.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {habit.name}
            </h3>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                {habit.completed ? 'Completado' : 'Pendiente'}
              </p>
              <button
                onClick={() => toggleHabitCompleted(habit.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  habit.completed
                    ? 'bg-green-400 text-white hover:bg-green-500'
                    : 'bg-blue-400 text-white hover:bg-blue-500'
                }`}
              >
                {habit.completed ? 'Desmarcar' : 'Completar'}
              </button>
              <button
                onClick={() => handleDeleteHabit(habit.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
