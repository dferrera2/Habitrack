import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from '../components/Navbar';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Progress() {
  const [completedCount, setCompletedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchHabits = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'habits'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      const habits = snapshot.docs.map(doc => doc.data());

      const total = habits.length;
      const completed = habits.filter(h => h.completed).length;

      setTotalCount(total);
      setCompletedCount(completed);
    };

    fetchHabits();
  }, []);

  const chartData = {
    labels: ['Completados', 'Pendientes'],
    datasets: [
      {
        data: [completedCount, totalCount - completedCount],
        backgroundColor: ['#22c55e', '#d1d5db'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold text-green-600 mb-6">Tu Progreso</h2>
        <div className="w-64 h-64 bg-white p-6 rounded-lg shadow-md">
          <Doughnut data={chartData} />
        </div>
        <div className="mt-4 text-lg text-gray-700">
          {totalCount === 0
            ? 'No tienes hábitos aún.'
            : `${completedCount} de ${totalCount} completados`}
        </div>
      </div>
    </div>
  );
}
