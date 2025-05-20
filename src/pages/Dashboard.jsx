import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const fetchHabits = async () => {
      const q = query(collection(db, 'habits'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHabits(list);
    };

    fetchHabits();
  }, [user]);

  const toggleHabit = async (id, completed) => {
    await updateDoc(doc(db, 'habits', id), { completed: !completed });
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !completed } : h));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Tus hábitos de hoy</h2>
        {habits.length === 0 ? (
          <p className="text-gray-500">No tienes hábitos aún.</p>
        ) : (
          <ul className="space-y-3">
            {habits.map(habit => (
              <li key={habit.id} className="flex justify-between items-center p-3 border rounded-md bg-white">
                <span className={habit.completed ? 'line-through text-gray-400' : ''}>
                  {habit.name}
                </span>
                <button
                  onClick={() => toggleHabit(habit.id, habit.completed)}
                  className={`px-4 py-2 rounded-md text-white ${habit.completed ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
                >
                  {habit.completed ? 'Desmarcar' : 'Completar'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
