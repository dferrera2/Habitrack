import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';

export default function Perfil() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Perfil de Usuario</h2>
        {user ? (
          <div className="space-y-3 text-gray-700">
            <p><span className="font-semibold">Correo:</span> {user.email}</p>
            <p><span className="font-semibold">ID de usuario:</span> {user.uid}</p>
            {/* Puedes agregar más datos aquí */}
          </div>
        ) : (
          <p className="text-gray-500">No se ha iniciado sesión.</p>
        )}
      </div>
    </div>
  );
}
