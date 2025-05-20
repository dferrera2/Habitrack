import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600">HabiTrack</h1>

        <nav className="flex items-center gap-10">
          <Link to="/dashboard" className="text-gray-700 hover:text-green-600 font-medium no-underline">
            Dashboard
          </Link>
          <Link to="/nuevo" className="text-gray-700 hover:text-green-600 font-medium no-underline">
            Nuevo hábito
          </Link>
          <Link to="/progreso" className="text-gray-700 hover:text-green-600 font-medium no-underline">
            Progreso
          </Link>
          <Link to="/perfil" className="text-gray-700 hover:text-green-600 font-medium no-underline">
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-medium border px-3 py-1 rounded"
          >
            Cerrar sesión
          </button>
        </nav>
      </div>
    </header>
  );
}
