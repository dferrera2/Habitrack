import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from '../components/Navbar';

export default function NewHabit() {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('diario');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      console.error("No hay usuario autenticado");
      return;
    }

    try {
      await addDoc(collection(db, 'habits'), {
        name,
        frequency,
        completed: false,
        userId: user.uid,
        createdAt: new Date(),
      });

      navigate('/dashboard');
    } catch (err) {
      console.error("Error al guardar hábito:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-md mx-auto bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Crear nuevo hábito</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del hábito"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded-md"
          />
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-3 border rounded-md"
          >
            <option value="diario">Diario</option>
            <option value="semanal">Semanal</option>
          </select>
          <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
            Guardar hábito
          </button>
        </form>
      </div>
    </div>
  );
}
