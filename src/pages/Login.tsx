// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    if (email === 'usuario@example.com' && password === 'contraseña123') {
      setError('');
      navigate('/dashboard');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
