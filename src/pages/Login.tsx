// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate(); // Para redirigir a otras rutas

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evitar recarga de página

    // Validación simple de campos vacíos
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // Validación de credenciales (esto debería reemplazarse por una API real)
    if (email === 'usuario@example.com' && password === 'contraseña123') {
      setError('');
      navigate('/dashboard'); // Redirige a Dashboard si login es exitoso
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="bg-verde-claro h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-verde-oscuro text-2xl font-bold mb-6">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-verde-oscuro focus:outline-none w-full mb-4"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
        />
        <input
          type="password"
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-verde-oscuro focus:outline-none w-full mb-6"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
        />
        <button className="bg-verde-oscuro text-white py-2 px-6 rounded-lg hover:bg-verde-medio transition duration-300 w-full">
          Iniciar sesión
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-verde-oscuro">
          ¿No tienes una cuenta?{" "}
          <a href="/registro" className="text-verde-medio hover:underline">Regístrate aquí</a>
        </p>
      </div>
    </div>
  );
};

export default Login;