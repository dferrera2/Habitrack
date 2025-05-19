import React, { useState } from 'react';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    // Lógica para registrar al usuario (esto podría ser una llamada al backend)
    console.log('Usuario registrado correctamente');
    // Una vez registrado, podrías redirigir al usuario a la página de login
    // navigate('/login');
  };

  return (
    <div className="bg-verde-claro h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-verde-oscuro text-2xl font-bold mb-6">Crear cuenta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-verde-oscuro focus:outline-none w-full mb-4"
          placeholder="Nombre completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-verde-oscuro focus:outline-none w-full mb-4"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-verde-oscuro focus:outline-none w-full mb-4"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="p-3 rounded-lg border-2 border-gray-300 focus:border-verde-oscuro focus:outline-none w-full mb-6"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="bg-verde-oscuro text-white py-2 px-6 rounded-lg hover:bg-verde-medio transition duration-300 w-full">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default Register;

